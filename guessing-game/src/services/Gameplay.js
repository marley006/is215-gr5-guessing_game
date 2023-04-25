import { generateWordByCategory, generateClues } from './OpenAiService'
import { CATEGORIES } from './Constants';


export const newGame = async () => {
    console.log("preparing round");
    const randomIndex =  Math.floor(Math.random() * 10); //randomize index here
    const category = CATEGORIES[randomIndex]; // get category based on index
    const  word =  await generateWordByCategory(category); // get clue from chatgpt
    const  clues =  await generateClues(word, category); // get hints from chatgrt
    const roundDetails = {
        "categoy": category,
        "word": word,
        "clues": clues
    }; // generate json containing category and clues. Loop here when the player guess
    console.log(roundDetails);
    return roundDetails;
}