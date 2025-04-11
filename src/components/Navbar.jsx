import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    return (
        <nav className={`navbar navbar-expand-lg navbar-${props.theme} bg-${props.theme}`}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"><strong>{props.title}</strong></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                    </ul>
                    <div className={`mb-sm-3 mb-md-0 px-md-3 form-check form-switch text-${props.theme === 'light' ? 'dark' : 'light'}`}>
                        <input onClick={() => props.toggleTheme()} className="form-check-input" type="checkbox" role="switch" id="switchCheckDefault" value="Dark Blue" />
                        <label className="form-check-label " htmlFor="switchCheckDefault">Enable Dark Mode</label>
                    </div>

                    <div className="d-flex mt-sm-3 mt-md-1">
                        <div className={`text-${props.theme === 'light' ? 'dark' : 'light'}`}>
                            <button disabled={props.theme === 'light'} onClick={(e) => props.addColorTheme(e.target.value, "#063729")} name="colorThemes" value="Dark Green" style={{backgroundColor: "#063729", width: "30px", height: "30px", borderRadius: "5px", filter: 'brightness(240%)'}}></button>
                        </div>
                        <div className={`px-3 text-${props.theme === 'light' ? 'dark' : 'light'}`}>
                            <button disabled={props.theme === 'light'} onClick={(e) => props.addColorTheme(e.target.value, "#392626")} className="mx-1" name="colorThemes" value="Brown" style={{backgroundColor: "#392626", width: "30px", height: "30px", borderRadius: "5px", filter: 'brightness(240%)'}}></button>
                        </div>
                        <div className={`text-${props.theme === 'light' ? 'dark' : 'light'}`}>
                            <button disabled={props.theme === 'light'} onClick={(e) => props.addColorTheme(e.target.value, "#421a42")} name="colorThemes" value="Purple" style={{backgroundColor: "#421a42", width: "30px", height: "30px", borderRadius: "5px", filter: 'brightness(240%)'}}></button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
