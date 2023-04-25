import { generateWordByCategory, generateClues } from './OpenAiService'
import { CATEGORIES } from './Constants';
import React, { useState } from 'react';

export const newGame = async () => {
    console.log("preparing round");
    const randomIndex =  Math.floor(Math.random() * 10); //randomize index here
    const category = CATEGORIES[randomIndex]; // get category based on index
    const  word =  await generateWordByCategory(category); // get clue from chatgpt
    const  clues =  await generateClues(word, category); // get hints from chatgpt
    const roundDetails = {
        "categoy": category,
        "word": word,
        "clues": clues
    }; // generate json containing category and clues. Loop here when the player guess

    const [currentClueIndex, setCurrentClueIndex] = useState(0);    // count the number of clues provided
    const [guess, setGuess] = useState('');                        // keep track of the user guess
    const [isCorrect, setIsCorrect] = useState(false);             // tag correct guess
    const [hasDisplayedFirstClue, setHasDisplayedFirstClue] = useState(false);

    function handleGuess(e) {
        e.preventDefault();
    
        // compare guess with the word
        if (guess.toLowerCase() === word.toLowerCase()) {
          setIsCorrect(true);
        } else {                                                     // if incorrect, go to the next clue index
          setCurrentClueIndex(currentClueIndex + 1);
          setGuess('');
        }
      }

      function handleDisplayFirstClue() {
        setHasDisplayedFirstClue(true);
      }
  
    return (
     <div>
        !hasDisplayedFirstClue ? (
          <>
            <p>Guess the word based on the following clue:</p>
            <p>Clue #{currentClueIndex + 1}: {clues[currentClueIndex]}</p>
            <button onClick={handleDisplayFirstClue}>Show First Clue</button>
          </> ) 
        :
        {isCorrect ? (
          <p>You guessed the word!</p>
        ) : currentClueIndex === clues.length ? (
          <p>You didn't guess the word. The word was "{word}".</p>
        ) : (
          <>
            <p>Clue #{currentClueIndex + 1}: {clues[currentClueIndex]}</p>
            <form onSubmit={handleGuess}>
              <label>
                Guess:
                <input type="text" value={guess} onChange={e => setGuess(e.target.value)} />
              </label>
              <button type="submit">Guess</button>
            </form>
          </>
        )} 
    </div>
    );

    //console.log(roundDetails);
    //return roundDetails;
}




