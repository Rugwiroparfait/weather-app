// filepath: /home/kali/Documents/Projects/weather-app/backend/routes/chatbot.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

// Google AI API configurations - use environment variable when available
const GOOGLE_AI_API_KEY = process.env.GOOGLE_AI_API_KEY || 'AIzaSyCy3314Rjf7rqG32Tyhm27JO5-J6X0P9mQ';
const GOOGLE_AI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// Add more debugging
router.post('/', async (req, res) => {
  try {
    const { message, context } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    console.log('📝 Processing chatbot request with context:', context);
    
    // Construct prompt with weather context
    const prompt = constructPrompt(message, context);
    
    console.log('🔍 Sending request to Google AI API...');
    
    // Call Google AI API with improved error handling
    try {
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
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 10000 // 10 second timeout
        }
      );
      
      console.log('✅ Received response from Google AI API');
      
      // Extract and send response
      const aiResponse = extractResponseText(response.data);
      res.json({ response: aiResponse });
    } catch (apiError) {
      console.error('🚨 Google AI API error:', apiError.response?.data || apiError.message);
      
      // Fall back to a simpler response if the API fails
      const fallbackResponse = generateFallbackResponse(message, context);
      res.json({ response: fallbackResponse });
    }
    
  } catch (error) {
    console.error('🚨 Chatbot general error:', error.message);
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

// Fallback response generator for when the API is unavailable
function generateFallbackResponse(message, weatherContext) {
  // Parse the weather context to extract basic info
  let district = "your area";
  let temperature = "moderate";
  let description = "varied";
  
  try {
    // Try to extract information from the context string
    const districtMatch = weatherContext.match(/Current weather in ([^:]+):/);
    if (districtMatch) district = districtMatch[1];
    
    const tempMatch = weatherContext.match(/(\d+(\.\d+)?)°C/);
    if (tempMatch) {
      const temp = parseFloat(tempMatch[1]);
      temperature = temp < 15 ? "cool" : temp > 25 ? "warm" : "pleasant";
    }
    
    const descMatch = weatherContext.match(/(\d+(\.\d+)?)°C, ([^,]+),/);
    if (descMatch) description = descMatch[3].trim();
  } catch (e) {
    console.error("Error parsing weather context:", e);
  }
  
  // Simple response based on message keywords
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes('wear') || lowerMsg.includes('clothes') || lowerMsg.includes('dress')) {
    return `Based on the ${temperature} weather in ${district} with ${description} conditions, I'd recommend dressing in layers. Check the temperature before heading out and adjust your clothing accordingly.`;
  }
  
  if (lowerMsg.includes('rain') || lowerMsg.includes('umbrella')) {
    if (description.includes('rain') || description.includes('shower') || description.includes('drizzle')) {
      return `Yes, it's currently showing ${description} in ${district}. I'd definitely recommend taking an umbrella and wearing waterproof shoes.`;
    } else {
      return `The current conditions in ${district} are ${description}, so you probably don't need an umbrella right now. However, it's always good to check the forecast before heading out.`;
    }
  }
  
  if (lowerMsg.includes('drive') || lowerMsg.includes('driving') || lowerMsg.includes('road')) {
    if (description.includes('rain') || description.includes('snow') || description.includes('fog')) {
      return `Be careful driving in ${district} today. The ${description} conditions require extra caution - reduce your speed, increase following distance, and use appropriate lights.`;
    } else {
      return `Road conditions in ${district} should be fine with the current ${description} weather. Just follow normal safety precautions and have a safe journey!`;
    }
  }
  
  // Default response
  return `Currently in ${district}, it's ${temperature} with ${description} conditions. Stay comfortable and enjoy your day! If you have specific questions about activities or safety concerns, feel free to ask.`;
}

module.exports = router;