import React from "react";
import "./GameScreen.css";
import gameBase from "../../assets/Desktop/Game Base.png";
import mixButton from "../../assets/buttons/mix_mystery_button.png";

// Example: potions array with flavor names
const potions = [
    "Apple", "Banana", "Blue Raspberry", "Blueberry", "Candy Apple",
    "Cherry", "Grape", "Grapefruit", "Key Lime", "Kiwi", "Lemon",
    "Mai Thai", "Mango", "Orange", "Peach", "Pineapple", "rainbow Sherbert",
    "Strawberry", "Watermelon", "Yuzu Lime"
];

const GameScreen = ({ selectedPotions, cauldronColor, onSelectPotion, onMix }) => {
  return (
    <div className="game-screen">
      <img src={gameBase} alt="Game Background" className="game-bg" />
      
      <div className="cauldron">
        {/* Placeholder for cauldron image/color */}
        <div className="cauldron-display">{cauldronColor}</div>
      </div>

      <div className="shelves">
        {Array.from({ length: 5 }).map((_, shelfIndex) => (
          <div className="shelf" key={shelfIndex}>
            {potions.slice(shelfIndex * 4, shelfIndex * 4 + 4).map((flavor) => {
              const isSelected = selectedPotions.some(p => p.flavor === flavor);
              const potionSrc = isSelected
                ? require(`../../assets/Potions/Selected/potion_Glow ${flavor}.png`)
                : require(`../../assets/Potions/Standard/potion_${flavor}.png`);

              return (
                <img
                  key={flavor}
                  src={potionSrc}
                  alt={flavor}
                  className="potion-icon"
                  onClick={() => onSelectPotion({ flavor, color: flavor })} // color can be mapped later
                />
              );
            })}
          </div>
        ))}
      </div>

      <button className="mix-button" onClick={onMix} disabled={selectedPotions.length < 2}>
        <img src={mixButton} alt="Mix the Mystery" />
      </button>
    </div>
  );
};

export default GameScreen;
