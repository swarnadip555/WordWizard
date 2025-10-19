import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const [animate, setAnimate] = useState(true);

  // After first render, disable animation attribute
  useEffect(() => {
    const timer = setTimeout(() => setAnimate(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const colors = [
    {
      colorName: "Green",
      hexCode: "#063729",
    },
    {
      colorName: "Brown",
      hexCode: "#392626",
    },
    {
      colorName: "Purple",
      hexCode: "#421a42",
    },
  ];

  return (
    <nav
      {...(animate ? { "data-aos": "fade-up" } : {})}
      className={`navbar navbar-expand-lg navbar-${props.theme} bg-${props.theme}`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <strong>{props.title}</strong>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
          </ul>
          <div
            className={`mb-sm-3 mb-md-0 px-md-3 form-check form-switch text-${
              props.theme === "light" ? "dark" : "light"
            }`}
          >
            <input
              onClick={() => props.toggleTheme()}
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="switchCheckDefault"
              value="Dark Blue"
            />
            <label className="form-check-label " htmlFor="switchCheckDefault">
              Enable Dark Mode
            </label>
          </div>

          <div className="d-flex mt-sm-3 mt-md-1 gap-3">
            {colors.map((color, index) => {
              return (
                <div
                  key={index}
                  className={`text-${
                    props.theme === "light" ? "dark" : "light"
                  }`}
                >
                  <button
                    disabled={props.theme === "light"}
                    onClick={(e) =>
                      props.addColorTheme(e.target.value, color.hexCode)
                    }
                    name="colorThemes"
                    value={color.colorName}
                    style={{
                      backgroundColor: color.hexCode,
                      width: "30px",
                      height: "30px",
                      borderRadius: "5px",
                      filter: "brightness(240%)",
                    }}
                  ></button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
