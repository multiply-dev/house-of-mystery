import { useState } from "react";
import TitleScreen from "./components/TitleScreen/TitleScreen";
import RulesScreen from "./components/RulesScreen/RulesScreen";
import GameScreen from "./components/GameScreen/GameScreen";
import FormScreen from "./components/FormScreen/FormScreen";
import EndScreen from "./components/EndScreen/EndScreen";
import { potionColors } from "./utils/potionColors"; // adjust path if needed

function App() {
  const [currentScreen, setCurrentScreen] = useState("title");
  const [selectedPotions, setSelectedPotions] = useState([]);
  const [cauldronColor, setCauldronColor] = useState(null);

  // Switch screen
  const goToScreen = (screen) => {
    setCurrentScreen(screen);
  };

  const parseColor = (color) => {
    const [r, g, b] = color.match(/\d+/g).map(Number);
    return [r, g, b];
  }

  const mixColors = (c1, c2) => {
    const [r1, g1, b1] = parseColor(c1);
    const [r2, g2, b2] = parseColor(c2);
    return `rgb(${Math.round((r1 + r2) / 2)}, ${Math.round(
      (g1 + g2) / 2
    )}, ${Math.round((b1 + b2) / 2)})`;
  }

 const handlePotionSelect = (potion) => {
    let newSelections = [...selectedPotions];

    if (newSelections.length < 2) {
      if (!newSelections.find(p => p.flavor === potion.flavor)) {
        newSelections.push(potion);
      }
    } else {
      newSelections = [potion]; // restart selection if already have 2
    }

    setSelectedPotions(newSelections);

    if (newSelections.length === 1) {
      setCauldronColor(potionColors[newSelections[0].flavor]);
    } else if (newSelections.length === 2) {
      // Example: blend colors, or use lookup table
      const color1 = potionColors[newSelections[0].flavor];
      const color2 = potionColors[newSelections[1].flavor];
      setCauldronColor(mixColors(color1, color2));
    }
  };

  
  // Handle form submission
  const handleFormSubmit = () => {
    goToScreen("end");
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
        <FormScreen onSubmit={handleFormSubmit} selectedPotions={selectedPotions} />
      )}

      {currentScreen === "end" && (
        <EndScreen />
      )}
    </div>
  );
}

export default App;
