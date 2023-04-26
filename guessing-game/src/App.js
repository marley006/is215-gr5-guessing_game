import logo from './logo.svg';
import './App.css';
import { newGame } from './services/Gameplay'
import React, { useState } from 'react';

function App() {
  const [currentClueIndex, setCurrentClueIndex] = useState(0);    // count the number of clues provided
  const [guess, setGuess] = useState('');                        // keep track of the user guess
  const [isCorrect, setIsCorrect] = useState(false);             // tag correct guess
  const [category, setCategory] = useState('');
  const [word, setWord] = useState('');
  const [clues, setClues] = useState([]);
  const [hasStarted, setHasStarted] = useState(false);

  const start = async () => {
    console.log("creating new game");
    let payload = await newGame();
    setCategory(payload.category);
    setClues(payload.clues);
    setWord(payload.word);
    setHasStarted(true);
    console.log("game loaded");
  }

  function handleGuess() {
    console.log("handle guess", guess);
    if (guess.toLowerCase() === word.toLowerCase()) {
      setIsCorrect(true);
      alert("correct");
    } else {
      setCurrentClueIndex(currentClueIndex + 1);
      setGuess('');
      alert("error");
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div style={{ display: hasStarted ? "none" : "block" }}> 
          <button onClick={start}>Start</button>
        </div>
        <div style={{ display: hasStarted ? "block" : "none" }}> 
          <p>Category : {category}</p>
        </div>
        <div style={{ display: hasStarted ? "block" : "none" }}> 
        { (clues.length > 0) ?
          <div>
            <p>Clue {clues[currentClueIndex]}</p>
              <label>
                <p/>
                Guess:
                <input type="text" value={guess} onChange={(e) => {setGuess(e.target.value)}}/>
              </label>
              <button onClick={handleGuess}>Guess</button>
          </div> :  ""
        }
        </div>

      </header>
    </div>
  );
}

export default App;
