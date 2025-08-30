import React, { useState } from "react";
import TitleScreen from "./components/TitleScreen/TitleScreen";
import RulesScreen from "./components/RulesScreen/RulesScreen";
import GameScreen from "./components/GameScreen/GameScreen";
import FormScreen from "./components/FormScreen/FormScreen";
import EndScreen from "./components/EndScreen/EndScreen";

function App() {
  const [currentScreen, setCurrentScreen] = useState("title");
  const [selectedPotions, setSelectedPotions] = useState([]);
  const [cauldronColor, setCauldronColor] = useState(null);
  const [formData, setFormData] = useState({});

  // Switch screen
  const goToScreen = (screen) => {
    setCurrentScreen(screen);
  };

  // Handle potion selection
  const handlePotionSelect = (potion) => {
    let newSelections = [...selectedPotions];

    if (newSelections.length < 2) {
      newSelections.push(potion);
    } else {
      newSelections = [potion]; // restart selection if already have 2
    }

    setSelectedPotions(newSelections);

    // Update cauldron color (placeholder logic — replace with blending rules)
    if (newSelections.length === 1) {
      setCauldronColor(potion.color);
    } else if (newSelections.length === 2) {
      // Example: blend colors, or use lookup table
      setCauldronColor(`${newSelections[0].color} + ${newSelections[1].color}`);
    }
  };

  // Handle form submission
  const handleFormSubmit = (data) => {
    setFormData(data);
    goToScreen("end");
  };

  // Reset game to start
  const resetGame = () => {
    setSelectedPotions([]);
    setCauldronColor(null);
    setFormData({});
    setCurrentScreen("title");
  };

  return (
    <div className="App">
      {currentScreen === "title" && (
        <TitleScreen onNext={() => goToScreen("rules")} />
      )}

      {currentScreen === "rules" && (
        <RulesScreen onNext={() => goToScreen("game")} />
      )}

      {currentScreen === "game" && (
        <GameScreen
          selectedPotions={selectedPotions}
          cauldronColor={cauldronColor}
          onSelectPotion={handlePotionSelect}
          onMix={() => goToScreen("form")}
        />
      )}

      {currentScreen === "form" && (
        <FormScreen onSubmit={handleFormSubmit} />
      )}

      {currentScreen === "end" && (
        <EndScreen onReplay={resetGame} formData={formData} />
      )}
    </div>
  );
}

export default App;
