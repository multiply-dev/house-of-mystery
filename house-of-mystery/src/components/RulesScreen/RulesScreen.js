import "./RulesScreen.css";
import happyMixingButton from "../../assets/buttons/happy_mixing_button.png";

const RulesScreen = ({ onNext }) => {
  return (
    <div className="rules-screen">
      <div className="rules-container">
        <h1 className="yellow">Welcome to Chewbie's Mystery Mix-Up Game!</h1>
        <h2>Chewbie is brewing a special new treat; <br /> the secret Mystery Mix Flavor!</h2>
        <h3>Here's how you can help:</h3>
        <div className="rules-text">
          <h3><span className="yellow">STEP 1:</span> Pick two fruity flavor potions from the shelf - any combo you dare!</h3>
          <h3><span className="yellow">STEP 2:</span> Drop the flavor potions into the cauldron and mix to see your creation.</h3>
          <h3><span className="yellow">STEP 3:</span> Think you've solved the mystery? Fill out your contact info so Chewbie can thank you! The flavor reveal will come later... but guess right and you'll be entered into our spooky giveaway!</h3>
        </div>
        <h3>Grab your witch hat, dust off your cape, and start mixing. <br />Think you've got the taste buds to solve the mystery?</h3>
        <img 
          onClick={onNext} 
          className="rules-button"
          src={happyMixingButton} 
          alt="Happy Mixing" 
        />
      </div>
    </div>
  );
};

export default RulesScreen;
