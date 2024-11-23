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
  console.log(text);
  //   const json = JSON.parse(text) as {topic:string,searchVolume:number,started:Date}[];
  const json = extractJSONFromString(text) as {
    topic: string;
    searchVolume: number;
    started: Date;
  }[];
  return json;
}

export interface SentimentDistribution {
  positive: number;
  negative: number;
  neutral: number;
}

export async function getSentimentDistribution(topic: string) {
  // Provide a prompt that contains text
  const prompt = `
    Analyze the sentiment distribution for the topic ${topic}. 
    Return the results in JSON format with three keys: Positive, Negative, and Neutral.
    Each key should have a corresponding numerical value representing either the count or percentage of occurrences of that sentiment. 
    The response must strictly follow this JSON structure: 
    {
      "positive": number,
      "negative": number,
      "neutral": number
    }
    Ensure the analysis is accurate and uses real-world context for the topic X.Do not include any text or explanation in the response—only the JSON
    `;

  // To generate text output, call generateContent with the text input
  const result = await AIModel.generateContent(prompt);

  const response = result.response;
  const text = response.text();
  // console.log(text);
  //   const json = JSON.parse(text) as {topic:string,searchVolume:number,started:Date}[];
  const json = extractJSONFromString(text)[0] as SentimentDistribution;
  return json;
}

export interface AgeDistribution {
  r10to20: number;
  r20to30: number;
  r30to50: number;
  r50to80: number;
}

export async function getAgeDistribution(topic: string) {
  // Provide a prompt that contains text
  const prompt = `
    Predict the engagement distribution across age groups for the topic ${topic}. Provide the results strictly in JSON format using the following structure:
      {
      "r10to20": percentage,
      "r20to30": percentage,
      "r30to50": percentage,
      "r50to80": percentage
      }
      Ensure the sum of percentages equals 100%. Do not include any text or explanation in the response—only the JSON.
    `;

  // To generate text output, call generateContent with the text input
  const result = await AIModel.generateContent(prompt);

  const response = result.response;
  const text = response.text();
  // console.log(text);
  //   const json = JSON.parse(text) as {topic:string,searchVolume:number,started:Date}[];
  const json = extractJSONFromString(text)[0] as AgeDistribution;
  return json;
}

export async function getHashtags(topic: string) {
  // Provide a prompt that contains text
  const prompt = `
  Generate a list of relevant and trending hashtags for the topic ${topic}. Return the results strictly in JSON format as an array of strings. For example:
  ["#hashtag1", "#hashtag2", "#hashtag3"]   
  generate more then 15 hashtags
  Do not include any text or explanation—only the JSON array.
    `;

  // To generate text output, call generateContent with the text input
  const result = await AIModel.generateContent(prompt);

  const response = result.response;
  const text = response.text();
  // console.log(text);
  //   const json = JSON.parse(text) as {topic:string,searchVolume:number,started:Date}[];
  const json = extractJSONFromString(text)[0] as string[];
  return json;
}

export async function getUsefulResources(topic: string) {
  // Provide a prompt that contains text
  const prompt = `
      Provide a list of useful resources for a case study on the topic ${topic}. 
      The response must be formatted in valid HTML with clickable links and structured as an unordered list. 
      Each list item should include the resource's title as anchor text and a brief description of its relevance. 
      Use the following structure:
      <ul>
        <li>
          <a href="URL1" target="_blank">Resource Title 1</a> - Brief description of the resource's relevance.
        </li>
        <li>
          <a href="URL2" target="_blank">Resource Title 2</a> - Brief description of the resource's relevance.
        </li>
        <li>
          <a href="URL3" target="_blank">Resource Title 3</a> - Brief description of the resource's relevance.
        </li>
      </ul>
      Do not include any text or explanation—only the HTML.
    `;

  // To generate text output, call generateContent with the text input
  const result = await AIModel.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  console.log(text);
  return text;
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
