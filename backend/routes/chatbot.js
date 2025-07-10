// filepath: /home/kali/Documents/Projects/weather-app/backend/routes/chatbot.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

// Google AI API configurations
const GOOGLE_AI_API_KEY = 'AIzaSyCy3314Rjf7rqG32Tyhm27JO5-J6X0P9mQ';
const GOOGLE_AI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

router.post('/', async (req, res) => {
  try {
    const { message, context } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    // Construct prompt with weather context
    const prompt = constructPrompt(message, context);
    
    // Call Google AI API
    const response = await axios.post(
      `${GOOGLE_AI_API_URL}?key=${GOOGLE_AI_API_KEY}`, 
      {
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      }
    );
    
    // Extract and send response
    const aiResponse = extractResponseText(response.data);
    res.json({ response: aiResponse });
    
  } catch (error) {
    console.error('Chatbot API error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to process your request',
      details: error.message
    });
  }
});

function constructPrompt(userMessage, weatherContext) {
  return `
You are a helpful weather assistant that gives friendly advice based on current weather conditions.

CURRENT WEATHER CONTEXT:
${weatherContext}

USER QUESTION:
${userMessage}

Please provide a helpful, friendly response that:
1. Answers the user's question in simple, easy-to-understand terms
2. Offers practical safety advice relevant to the current weather conditions
3. Suggests appropriate activities or precautions based on the weather
4. Keeps the response concise (2-3 paragraphs maximum)
5. Uses a conversational, friendly tone

Your response should be directly relevant to the weather conditions provided and the user's specific question.
`;
}

function extractResponseText(apiResponse) {
  try {
    // Extract the text from the response structure
    return apiResponse.candidates[0].content.parts[0].text;
  } catch (e) {
    console.error('Error extracting response text:', e);
    return 'I\'m having trouble generating a response right now. Please try again.';
  }
}

module.exports = router;