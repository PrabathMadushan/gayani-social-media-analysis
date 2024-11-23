// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getVertexAI, getGenerativeModel } from "firebase/vertexai";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhWzz74anexkRdQ9R3jZstZA0qBArs25o",
  authDomain: "gayani-8f02e.firebaseapp.com",
  projectId: "gayani-8f02e",
  storageBucket: "gayani-8f02e.firebasestorage.app",
  messagingSenderId: "688139112012",
  appId: "1:688139112012:web:2a32df90b4f415e788eee9",
  measurementId: "G-0YRZB9ZH8Y",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// Initialize the Vertex AI service
const vertexAI = getVertexAI(firebaseApp);

// Initialize the generative model with a model that supports your use case
// Gemini 1.5 models are versatile and can be used with all API capabilities
export const AIModel = getGenerativeModel(vertexAI, {
  model: "gemini-1.5-flash",
});

export async function getTrendingTopics() {
  // Provide a prompt that contains text
  const prompt = `
    Provide a JSON array of trending topics in the format: [{topic: string, description: string, searchVolume: percentage}]. Predict current trends based on recent data without including any explanatory text, only the JSON output.
    `;

  // To generate text output, call generateContent with the text input
  const result = await AIModel.generateContent(prompt);

  const response = result.response;
  const text = response.text();
  //   const json = JSON.parse(text) as {topic:string,searchVolume:number,started:Date}[];
  const json = extractJSONFromString(text) as {
    topic: string;
    searchVolume: number;
    started: Date;
  }[];
  return json;
}

export async function getTrendingHashtags() {
    // Provide a prompt that contains text
    const prompt = `
      Provide a JSON array of trending hashtags in the format: [{hashtag: string, description: string, similarHashtags: string}]. Predict current trends based on recent data without including any explanatory text, only the JSON output.
      min = 10 hashtags,
      max = 15 hashtags
      `;
  
    // To generate text output, call generateContent with the text input
    const result = await AIModel.generateContent(prompt);
  
    const response = result.response;
    const text = response.text();
    console.log(text)
    //   const json = JSON.parse(text) as {topic:string,searchVolume:number,started:Date}[];
    const json = extractJSONFromString(text) as {
      topic: string;
      searchVolume: number;
      started: Date;
    }[];
    return json;
  }

function extractJSONFromString(inputString: string) {
  const potentialJSONs = [];

  // Regular expression to match JSON-like structures
  const jsonRegex = /{[^{}]*}|(?:\[[^{}\[\]]*\])/g;
  let match;

  // Extract all potential JSON fragments
  while ((match = jsonRegex.exec(inputString)) !== null) {
    try {
      // Try to parse to ensure it's valid JSON
      const parsed = JSON.parse(match[0]);
      potentialJSONs.push(parsed);
    } catch (error) {
      // Ignore invalid JSON
    }
  }

  return potentialJSONs;
}
