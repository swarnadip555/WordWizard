import React, { useState } from 'react';

const TextForm = (props) => {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  }

  const handleUpClick = () => {
    setText(text.toUpperCase());
    props.showAlert("Converted to uppercase", "success");
  }

  const handleLoClick = () => {
    setText(text.toLowerCase());
    props.showAlert("Converted to lowercase", "success");
  }

  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("Removed the extra spaces", "success");
  }

  const handleCopyClick = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("Copied to clipboard", "success");
  }

  const handleClearText = () => {
    let confirmation = confirm("Are you sure? ");
    if (confirmation) {
      let newText = "";
      setText(newText);
      props.showAlert("Cleared the text", "success");
    }
  }

  const buttonStyle = {
    color: props.theme === 'light' ? 'black' : "white",
    backgroundColor: props.theme === 'light' ? "#faffa3" : `${props.colorTheme}`,
    filter: props.theme === 'light' ? 'none' : 'brightness(240%)',
    fontWeight: props.theme === 'light' ? 400 : 300,
    boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.15)',
  }

  return (
    <section data-aos="fade-up" style={{ color: props.theme === 'light' ? 'black' : "white" }}>
      <div className="container">
        <div className="my-3">
          <h1 className="mb-3">{props.heading}</h1>
          <textarea className="form-control" rows="10" value={text} onChange={handleChange} style={{ color: props.theme === 'light' ? 'black' : "white", backgroundColor: props.theme === 'light' ? 'white' : "#313131", border: props.theme === 'light' ? "2px solid black" : "1px solid grey" }}></textarea>
        </div>
        <button disabled={text.length === 0} className='btn mx-2 my-1' onClick={handleUpClick} style={buttonStyle}>Convert to uppercase</button>
        <button disabled={text.length === 0} className='btn mx-2 my-1' onClick={handleLoClick} style={buttonStyle}>Convert to lowercase</button>
        <button disabled={text.length === 0} className='btn mx-2 my-1' onClick={handleExtraSpaces} style={buttonStyle}>Remove extra spaces</button>
        <button disabled={text.length === 0} className='btn mx-2 my-1' onClick={handleCopyClick} style={buttonStyle}>Copy text</button>
        <button disabled={text.length === 0} className='btn mx-2 my-1' onClick={handleClearText} style={buttonStyle}>Clear text</button>
      </div>

      <div className='info container my-4'>
        <h2>Summary of the Text</h2>
        <p>{text.split(/\s+/).filter((element) => { return element.length !== 0 }).length} words and {text.length} characters</p>
        <p>{(0.008 * text.split(' ').filter((element) => { return element.length !== 0 }).length).toFixed(2)} mintues to read</p>

        <h2 className='my-2'>Preview of the Text</h2>
        <p>{text.length > 0 ? text : "Nothing to preview!"}</p>
      </div>
    </section>
  )
}

export default TextForm;
