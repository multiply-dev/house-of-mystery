import React from "react";
import "./TitleScreen.css";
import mysteryLogo from "../../assets/mystery game logo.png";
import titleButton from "../../assets/buttons/title_button.png";

const TitleScreen = ({ onNext }) => {
  return (
    <div className="title-container">
      <div className="content-container">
        <img
          className="mystery-logo"
          src={mysteryLogo}
          alt="Mystery Game Logo"
        />
        <img
          className="title-button"
          onClick={onNext}
          src={titleButton}
          alt="Let's Play"
        />
      </div>
    </div>
  );
};

export default TitleScreen;
