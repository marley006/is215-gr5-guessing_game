 export const CATEGORIES = ["Disney Movies", "Famous Filipino Foods", "Philippine Tourist Destinations",
 "Popular Filipino Brands", "Celebrity", "Philippine President", "90s Filipino Band",
 "Things you find in an office", "Sports and Games", "Gadgets"];

 export const OPENAI = {
    "secret": process.env.REACT_APP_OPENAI_SECRET,
    "chat_url": "https://api.openai.com/v1/chat/completions",
    "model": "gpt-3.5-turbo"
 } ;