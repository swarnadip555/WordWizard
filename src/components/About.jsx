import React from 'react';

const About = (props) => {
  const accordionHeaderStyle = {
    color: props.theme === 'light' ? 'black' : 'white',
    backgroundColor: props.theme === 'light' ? 'white' : '#282b2d'
  }

  const accordionBodyStyle = {
    color: props.theme === 'light' ? 'black' : "white",
    backgroundColor: props.theme === 'light' ? "#f3f5f5" : `#282b2d`,
    filter: props.theme === 'light' ? 'none' : 'brightness(220%)',
    fontWeight: props.theme === 'light' ? 400 : 300,
  }

  return (
    <section data-aos="fade-up"  style={{ height: "100vh", color: props.theme === 'light' ? 'black' : "white" }}>
      <div className="container py-4">
        <h2 className="my-2">About Us</h2>

        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" style={accordionHeaderStyle}>
                <strong>Analyse the text</strong>
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample" style={accordionBodyStyle}>
              <div className="accordion-body">
                <span>WordWizard gives you a way to analyze and manipulate your text quickly and efficiently — whether it's counting words, characters, estimating reading time, converting text to uppercase/lowercase, or cleaning up extra spaces.</span>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" style={accordionHeaderStyle}>
                <strong>Free to use</strong>
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample" style={accordionBodyStyle}>
              <div className="accordion-body">
                <span>WordWizard is a free character counter tool that provides instant character count & word count statistics for a given text. WordWizard reports the number of words and characters. Thus it is suitable for writing text with word/character limit.</span>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" style={accordionHeaderStyle}>
                <strong>Browser Compatible</strong>
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample" style={accordionBodyStyle}>
              <div className="accordion-body">
                <span>This word counter software works in any web browsers such as Chrome, Firefox, Internet Explorer, Safari, Opera. It suits to count characters in facebook, blog, books, excel document, pdf document, essays, etc.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About;
