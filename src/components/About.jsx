import { accordionItems } from '../data/accordionItems';

const About = ({ theme }) => {
  const accordionHeaderStyle = {
    color: theme === 'light' ? 'black' : 'white',
    backgroundColor: theme === 'light' ? 'white' : '#282b2d'
  }

  const accordionBodyStyle = {
    color: theme === 'light' ? 'black' : "white",
    backgroundColor: theme === 'light' ? "#f3f5f5" : `#282b2d`,
    filter: theme === 'light' ? 'none' : 'brightness(220%)',
    fontWeight: theme === 'light' ? 400 : 300,
  }

  return (
    <section data-aos="fade-up" style={{ height: "100vh", color: theme === 'light' ? 'black' : "white" }}>
      <div className="container py-4">
        <h2 className="my-2">About Us</h2>

        <div className="accordion" id="accordionExample">
          {accordionItems.map((item) => {
            return (
              <div className="accordion-item" key={item.id}>
                <h2 className="accordion-header">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#${item.id}`} aria-expanded="true" aria-controls="collapseOne" style={accordionHeaderStyle}>
                    <strong>{item.title}</strong>
                  </button>
                </h2>
                <div id={item.id} className="accordion-collapse collapse" data-bs-parent="#accordionExample" style={accordionBodyStyle}>
                  <div className="accordion-body">
                    <span>{item.content}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default About;
