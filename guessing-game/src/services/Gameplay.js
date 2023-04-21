import { generateWordByCategory, generateClues } from './OpenAiService'
import { CATEGORIES } from './Constants';


export const newGame = async () => {
    console.log("preparing round");
    const randomIndex =  Math.floor(Math.random() * 10);
    const category = CATEGORIES[randomIndex];
    const  word =  await generateWordByCategory(category);
    const  clues =  await generateClues(word, category);
    const roundDetails = {
        "categoy": category,
        "word": word,
        "clues": clues
    };
    console.log(roundDetails);
    return roundDetails;
}