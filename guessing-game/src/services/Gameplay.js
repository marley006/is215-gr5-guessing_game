import { generateWordByCategory } from './OpenAiService'

const categories = ["Disney Movies", "Famous Filipino Foods", "Philippine Tourist Destinations",
"Popular Filipino Brands", "Celebrity", "Philippine President", "90s Filipino Band",
"Things you find in an office", "Sports and Games", "Gadgets"];

export const newGame = () => {
    let randomIndex =  Math.floor(Math.random() * 10);
    let word = categories[randomIndex];
    generateWordByCategory(word);
}