import { useState } from 'react';
import { accordionItems } from '../data/accordionItems';

const About = ({ theme }) => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <section data-aos="fade-up" className={`min-h-screen py-8 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold mb-8">About Us</h2>

        <div className="space-y-4">
          {accordionItems.map((item) => {
            const isOpen = openAccordion === item.id;
            return (
              <div key={item.id} className={`border rounded-lg overflow-hidden ${theme === 'light' ? 'border-gray-200' : 'border-gray-600'}`}>
                <button 
                  className={`w-full px-6 py-4 text-left font-semibold flex justify-between items-center transition-colors ${theme === 'light' ? 'bg-white hover:bg-gray-50 text-gray-900' : 'bg-gray-800 hover:bg-gray-700 text-white'}`}
                  onClick={() => toggleAccordion(item.id)}
                >
                  <span>{item.title}</span>
                  <svg 
                    className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                  <div className={`px-6 py-4 ${theme === 'light' ? 'bg-gray-50 text-gray-900' : 'bg-gray-700 text-white'}`}>
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
