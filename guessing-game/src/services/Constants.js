 export const CATEGORIES = ["Disney Movies", "Filipino Cuisine", "Philippine Tourist Destinations",
 "Filipino Famous Celebrities", "Most Watched Animes", "Top Grossing Movies", "90s Filipino Band",
 "Gadgets", "Gaming Consoles", "Types of Transportation"];

 export const OPENAI = {
    "secret": process.env.REACT_APP_OPENAI_SECRET,
    "chat_url": "https://api.openai.com/v1/chat/completions",
    "model": "gpt-3.5-turbo"
 } ;
