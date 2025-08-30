import { useState } from "react";
import "./GameScreen.css";
import gameBase from "../../assets/Desktop/Game Base.png";
import mixButton from "../../assets/buttons/mix_mystery_button.png";
import leftArrow from "../../assets/buttons/left.png";
import rightArrow from "../../assets/buttons/right.png";

const potions = [
    "Apple", "Banana", "Blue Raspberry", "Blueberry", "Candy Apple",
    "Cherry", "Grape", "Grapefruit", "Key Lime", "Kiwi", "Lemon",
    "Mai Thai", "Mango", "Orange", "Peach", "Pineapple", "Rainbow Sherbert",
    "Strawberry", "Watermelon", "Yuzu Lime"
];

const GameScreen = ({ selectedPotions, cauldronColor, onSelectPotion, onMix }) => {
  const [startIndex, setStartIndex] = useState(0);
  const isMobile = window.innerWidth < 968;
  const visibleCount = 14; // mobile only

  const handleLeft = () => {
    setStartIndex(prev => Math.max(prev - 1, 0));
  };

  const handleRight = () => {
    setStartIndex(prev => Math.min(prev + 1, potions.length - visibleCount));
  };

  const canGoLeft = startIndex > 0;
  const canGoRight = startIndex < potions.length - visibleCount;
  console.log("canGoLeft", startIndex, potions.length - visibleCount)

  return (
    <div className="game-screen">
      {/* Background */}
      <img src={gameBase} alt="Game Background" className="game-bg" />

      {/* Cauldron */}
      <div className="cauldron">
        <div
          className="cauldron-display"
          style={{ backgroundColor: cauldronColor || "transparent" }}
        >
          {selectedPotions.length === 1 && <p>{selectedPotions[0].flavor}</p>}
          {selectedPotions.length === 2 && (
            <p>{selectedPotions[0].flavor} + {selectedPotions[1].flavor}</p>
          )}
        </div>
      </div>

      {/* DESKTOP LAYOUT: 5 shelves of 4 potions */}
      {!isMobile && (
        <div className="shelves">
          {Array.from({ length: 5 }).map((_, shelfIndex) => (
            <div className="shelf" key={shelfIndex}>
              {potions.slice(shelfIndex * 4, shelfIndex * 4 + 4).map(flavor => {
                const isSelected = selectedPotions.some(p => p.flavor === flavor);
                const potionSrc = isSelected
                  ? require(`../../assets/Potions/Selected/potion_Glow ${flavor}.png`)
                  : require(`../../assets/Potions/Standard/potion_${flavor}.png`);

                return (
                  <img
                    key={flavor}
                    src={potionSrc}
                    alt={flavor}
                    className={`potion-icon ${isSelected ? "selected" : ""}`}
                    onClick={() => onSelectPotion({ flavor, color: flavor })}
                  />
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* MOBILE LAYOUT: horizontal carousel */}
      {isMobile && (
        <div className="shelves mobile">
          <img
            src={leftArrow}
            alt="Left"
            className={`arrow left ${!canGoLeft ? "disabled" : ""}`}
            onClick={canGoLeft ? handleLeft : null}
          />

          <div
            className="carousel-row"
            style={{
              width: `${(potions.length / visibleCount) * 100}%`,
              transform: `translateX(-${(startIndex / potions.length) * 100}%)`,
              transition: "transform 0.4s ease"
            }}
          >
            {potions.map(flavor => {
              const isSelected = selectedPotions.some(p => p.flavor === flavor);
              const potionSrc = isSelected
                ? require(`../../assets/Potions/Selected/potion_Glow ${flavor}.png`)
                : require(`../../assets/Potions/Standard/potion_${flavor}.png`);

              return (
                <img
                  key={flavor}
                  src={potionSrc}
                  alt={flavor}
                  className={`potion-icon ${isSelected ? "selected" : ""}`}
                  onClick={() => onSelectPotion({ flavor, color: flavor })}
                />
              );
            })}
          </div>

          <img
            src={rightArrow}
            alt="Right"
            className={`arrow right ${!canGoRight ? "disabled" : ""}`}
            onClick={canGoRight ? handleRight : null}
          />
        </div>
      )}

      {/* Mix Button */}
      <img
        className="mix-button"
        onClick={() => { if (selectedPotions.length >= 2) onMix(); }}
        src={mixButton}
        alt="Mix the Mystery"
      />
    </div>
  );
};

export default GameScreen;
