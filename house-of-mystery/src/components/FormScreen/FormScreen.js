import React from "react";
import "./FormScreen.css";
import submitButton from "../../assets/buttons/submit.png";

const FormScreen = ({ onSubmit }) => {
  return (
    <div className="form-screen">
      <button className="submit-button" onClick={onSubmit}>
        <img src={submitButton} alt="Submit" />
      </button>
    </div>
  );
};

export default FormScreen;
