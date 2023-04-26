import logo from './logo.svg';
import './App.css';
import { newGame } from './services/Gameplay'
import React, { useState } from 'react';

function App() {
  const [currentClueIndex, setCurrentClueIndex] = useState(0);    // count the number of clues provided
  const [guess, setGuess] = useState('');                        // keep track of the user guess
  const [isCorrect, setIsCorrect] = useState(false);             // tag correct guess
  const [roundDetails, setRoundDetails] = useState([]);
  const [hasDisplayedFirstClue, setHasDisplayedFirstClue] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const start = async () => {
    console.log("creating new game");
    let payload = await newGame();
    setRoundDetails(payload);
    console.log(roundDetails);
    console.log("game loaded");
    setHasStarted(true);
  }

  function handleGuess(e) {
    e.preventDefault();
    if (guess.toLowerCase() === roundDetails.word.toLowerCase()) {
      setIsCorrect(true);
    } else {
      setCurrentClueIndex(currentClueIndex + 1);
      setGuess('');
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
          <p>Category : {roundDetails.category}</p>
        </div>
        <div style={{ display: hasStarted ? "block" : "none" }}> 
        { (hasStarted && roundDetails.length > 0) ?
          <div>
            <p>Clue #{currentClueIndex }: {roundDetails.clues[currentClueIndex]}</p>
            <form onSubmit={handleGuess}>
              <label>
                <p/>
                Guess:
                <input type="text" value={guess} onChange={e => setGuess(e.target.value)} />
              </label>
              <button type="submit">Guess</button>
            </form>
          </div> :  ""
        }
        </div>

      </header>
    </div>
  );
}

export default App;
