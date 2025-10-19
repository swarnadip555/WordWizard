import React, { useState } from 'react';
import { getTextOperations } from '../data/textUtils';
import DialogBox from '../components/DialogBox';

const TextForm = (props) => {
  const [text, setText] = useState('');
  const [dialogBoxOpen, setDialogBoxOpen] = useState(false);

  const handleChange = (e) => {
    setText(e.target.value);
  }

  const textOperations = getTextOperations(text, setText, setDialogBoxOpen, props);

  const buttonStyle = {
    color: props.theme === 'light' ? 'black' : "white",
    backgroundColor: props.theme === 'light' ? "#faffa3" : `${props.colorTheme}`,
    filter: props.theme === 'light' ? 'none' : 'brightness(240%)',
    fontWeight: props.theme === 'light' ? 400 : 300,
    boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.15)',
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
      </div>

      <div className='info container my-4'>
        <h2>Summary of the Text</h2>
        <p>{text.split(/\s+/).filter((element) => element.length !== 0).length} words and {text.length} characters</p>
        <p>{(0.008 * text.split(' ').filter((element) => element.length !== 0).length).toFixed(2)} minutes to read</p>

        {/* Display Top 3 Words only if available */}
        {topWords.length > 0 && (
          <p>
            Top Words: {topWords.map(([word, count], index) => (
              <span key={index}>
                {word} ({count}){index < topWords.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        )}

        <h2 className='my-2'>Preview of the Text</h2>
        <p>{text.length > 0 ? text : "Nothing to preview!"}</p>
      </div>
      {dialogBoxOpen && (
        <DialogBox
          question="Are you sure you want to clear the text?"
          setDialogBoxOpen={setDialogBoxOpen}
          setText={setText}
          showAlert={props.showAlert}
        />
      )}
    </section>
  )
}

export default TextForm;
