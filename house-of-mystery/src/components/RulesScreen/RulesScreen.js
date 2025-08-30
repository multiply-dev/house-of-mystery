import "./RulesScreen.css";
import happyMixingButton from "../../assets/buttons/happy_mixing_button.png";

const RulesScreen = ({ onNext }) => {
  return (
    <div className="rules-screen">
      <button onClick={onNext} className="rules-button">
        <img src={happyMixingButton} alt="Happy Mixing" />
      </button>
    </div>
  );
};

export default RulesScreen;
