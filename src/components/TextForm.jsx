import React, { useState } from 'react';
import { getTextOperations } from '../data/textUtils';
import Card from './Card';

const TextForm = (props) => {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  }

  const textOperations = getTextOperations(text, setText, props);

  const buttonStyle = {
    color: props.theme === 'light' ? 'black' : "white",
    backgroundColor: props.theme === 'light' ? "#faffa3" : `${props.colorTheme}`,
    filter: props.theme === 'light' ? 'none' : 'brightness(240%)',
    fontWeight: props.theme === 'light' ? 400 : 300,
    boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.15)',
  }

  // -------------------------------
  // Remove punctuation function
  // -------------------------------
  const removePunctuation = () => {
    // Regex removes all standard punctuation characters
    const newText = text.replace(/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/g, "");
    setText(newText);
    props.showAlert("Punctuation removed!", "success");
  }
  // Function to get top 3 words
  const getTopWords = (text) => {
    const words = text
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "") // remove punctuation
      .split(/\s+/)
      .filter(word => word.length > 0);

    const freq = {};
    words.forEach(word => {
      freq[word] = (freq[word] || 0) + 1;
    });

    const sortedWords = Object.entries(freq).sort((a, b) => b[1] - a[1]);
    return sortedWords.slice(0, 3); // top 3
  };

  // Store top words in a variable to avoid redundant calls
  const topWords = getTopWords(text);

  //Basics Statistics
  const wordCount = text.split(/\s+/).filter((element) => element.length !== 0).length;
  const charCount = text.length;
  const readingTime = (0.008 * wordCount).toFixed(2);

  return (
    <section data-aos="fade-up" style={{ color: props.theme === 'light' ? 'black' : "white" }}>
      <div className="container">
        <div className="my-3">
          <h1 className="mb-3">{props.heading}</h1>
          <textarea 
            className="form-control" 
            rows="10" 
            value={text} 
            onChange={handleChange} 
            style={{ 
              color: props.theme === 'light' ? 'black' : "white", 
              backgroundColor: props.theme === 'light' ? 'white' : "#313131", 
              border: props.theme === 'light' ? "2px solid black" : "1px solid grey" 
            }}
          ></textarea>
        </div>

        {/* Existing text operation buttons */}
        {textOperations.map((operation, index) => (
          <button 
            key={index} 
            disabled={text.length === 0} 
            className='btn mx-2 my-1' 
            onClick={operation.func} 
            style={buttonStyle}
          >
            {operation.label}
          </button>
        ))}

        {/* Remove Punctuation button */}
        <button 
          disabled={text.length === 0} 
          className='btn mx-2 my-1' 
          onClick={removePunctuation} 
          style={buttonStyle}
        >
          Remove Punctuation
        </button>
      </div>

      <div className='info container my-4'>
        {/* Preview Card */}
        <Card title = "Preview of the Text" theme={props.theme}>
        <p className='preview-text'>{text.length > 0 ? text : "Nothing to preview!"}</p>
        </Card>

        {/* Summary Card */}
        <Card title = "Summary of the Text" theme={props.theme}>
          <p><b>Words:</b> {wordCount}  <b>Characters:</b> {charCount}</p>
          <p><b>Minutes to read:</b> {readingTime} </p>

          {/* Display Top 3 Words only if available */}
          {topWords.length > 0 && (
            <p>
                <b>Top Words:</b> {topWords.map(([word, count], index) => (
                <span key={index}>
                  {word} ({count}){index < topWords.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          )}
        </Card>
      </div>
    </section>
  )
}

export default TextForm;

