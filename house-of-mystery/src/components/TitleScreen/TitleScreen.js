import React from "react";
import "./TitleScreen.css";
import titleButton from "../../assets/buttons/title_button.png";

const TitleScreen = ({ onNext }) => {
  return (
    <div className="title-screen">
      <button onClick={onNext} className="title-button">
        <img
          src={titleButton}
          alt="Let's Play"
        />
      </button>
    </div>
  );
};

export default TitleScreen;
