import logo from './logo.svg';
import './App.css';
import { newGame } from './services/Gameplay'

function App() {

  const start = async () =>{
    console.log("creating new game");
    newGame();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={start}>Start</button>
      </header>
    </div>
  );
}

export default App;
