import React, { useState } from "react";
import "./SideNav.css";

import Home from "../components/Home";
import About from "../components/About";
import Captions from "../components/Captions";

import Logo from "../assets/coc-logo.png";
import Github from "../assets/github.png";
import Contribute from "../assets/contribute.png";

function SideNav() {
  const [active, setActive] = useState("home");

  const handleNavClick = (nav) => {
    setActive(nav);
  };

  const renderComponent = () => {
    switch (active) {
      case "home":
        return <Home />;
      case "about":
        return <About />;
      case "captions":
        return <Captions />;
      default:
        return <Home />;
    }
  };
  
  const handleSource = () => {
    window.open('https://github.com/kalviumcommunity/S51_COC');
  }
  
  const handleContribute = () => {
    window.open('https://github.com/kalviumcommunity/S51_COC/issues')
  }

  return (
    <>
      <nav>
        <div className="navigation">
          <div className="logo-area">
            <img src={Logo} alt="" />
          </div>
          <div className="nav-links">
            <div className={active === "home" ? "home-active" : "home"}>
              <button onClick={() => handleNavClick("home")}>Home</button>
            </div>
            <div className={active === "about" ? "about-active" : "about"}>
              <button onClick={() => handleNavClick("about")}>About</button>
            </div>
            <div className={active === "captions" ? "caption-link-active" : "caption-link"}>
              <button onClick={() => handleNavClick("captions")}>Show Captions</button>
            </div>
          </div>
          <div className="nav-footer">
            <div className="github" onClick={handleSource}>
              <img src={Github} alt="github-logo" />
              <button>View Source Code</button>
            </div>
            <div className="contribute" onClick={handleContribute}>
              <img src={Contribute} alt="github-logo" />
              <button>Contribute</button>
            </div>
          </div>
        </div>
      </nav>
      {renderComponent()}
    </>
  );
}

export default SideNav;
