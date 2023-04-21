import { OPENAI } from "./Constants";
import axios from "axios";

const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${OPENAI.secret}`
}

const generateRequestBody = (message) => {
    return {
        "model": OPENAI.model,
        "messages": [{
            "role": "user",
            "content": `Hello OpenAI, ${message}`
        }]
    }
}

export const generateWordByCategory = async (category) => {
    const message = `Give me a word under the category ${category}. Don't add period in your reply`;
    return await axios.post(OPENAI.chat_url, generateRequestBody(message), {headers})
        .then((response)=> response.data.choices[0].message.content);
}

export const generateClues = async (word, category) => {
    const message = `Give me 10 clues to guess the word ${word} aside from ${category}`;
    return await axios.post(OPENAI.chat_url, generateRequestBody(message), {headers})
        .then((response)=> response.data.choices[0].message.content.split("\n"));
}