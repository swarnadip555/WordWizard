import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import TextForm from './components/TextForm';
import About from './components/About';


function App() {
  const [theme, setTheme] = useState('light');
  const [colorTheme, setColorTheme] = useState('#ffffff');
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  const toggleTheme = () => {
    if (theme === 'light') {
      // Switch to dark mode
      setTheme('dark');
      setColorTheme('#042743');
      showAlert(`Dark Mode theme has been enabled!`, "success");

    } else {
      setTheme('light');
      setColorTheme('#ffffff');
      showAlert("Light theme has been enabled!", "success");
    }
  };

  const addColorTheme = (colorName, bgColor) => {
    if (theme === 'dark') {
      setColorTheme(bgColor);
      showAlert(`${colorName} theme has been applied!`, "success");
    } else {
      showAlert("Enable Dark Mode to use color themes.", "warning");
    }
  };

  useEffect(() => {
    document.body.style.backgroundColor = colorTheme;
  }, [colorTheme]);

  return (
    <>
      <BrowserRouter>
        <Navbar title="WordWizard" theme={theme} toggleTheme={toggleTheme} addColorTheme={addColorTheme} />
        <Alert alert={alert} />

        <Routes>
          <Route path="/" element={<TextForm heading="Enter Your Text to Analyse" showAlert={showAlert} theme={theme} colorTheme={colorTheme} />} />
          <Route path="/about" element={<About showAlert={showAlert} theme={theme} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
