import React, { useState } from 'react';
import { getTextOperations } from '../data/textUtils';

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

  return (
    <section data-aos="fade-up" style={{ color: props.theme === 'light' ? 'black' : "white" }}>
      <div className="container">
        <div className="my-3">
          <h1 className="mb-3">{props.heading}</h1>
          <textarea className="form-control" rows="10" value={text} onChange={handleChange} style={{ color: props.theme === 'light' ? 'black' : "white", backgroundColor: props.theme === 'light' ? 'white' : "#313131", border: props.theme === 'light' ? "2px solid black" : "1px solid grey" }}></textarea>
        </div>
        {textOperations.map((operation, index) => {
          return <button key={index} disabled={text.length === 0} className='btn mx-2 my-1' onClick={operation.func} style={buttonStyle}>{operation.label}</button>
        })}
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
