<template>
  <div class="chatbot-container">
    <div class="card">
      <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Weather Assistant</h5>
        <button class="btn btn-sm btn-light" @click="toggleChat">
          {{ isChatOpen ? 'Close' : 'Open' }}
        </button>
      </div>
      
      <div class="card-body chat-body" v-if="isChatOpen">
        <div class="chat-messages" ref="chatMessages">
          <div v-for="(message, index) in messages" :key="index" 
               :class="['message', message.sender === 'user' ? 'user-message' : 'bot-message']">
            <div class="message-content">
              <p v-if="message.content" v-html="formatMessage(message.content)"></p>
              <div v-else class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="input-group mt-3">
          <input 
            type="text" 
            class="form-control" 
            placeholder="Ask about today's weather..." 
            v-model="userInput"
            @keyup.enter="sendMessage"
            :disabled="isProcessing"
          >
          <button 
            class="btn btn-primary" 
            @click="sendMessage"
            :disabled="isProcessing || !userInput.trim()"
          >
            <i class="bi bi-send"></i> Send
          </button>
        </div>
        <div class="text-muted mt-2 small">
          <em>Try asking: "What should I wear today?" or "Is it safe to drive?"</em>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'WeatherChatbot',
  props: {
    currentWeather: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      isChatOpen: false,
      messages: [
        { 
          sender: 'bot', 
          content: 'Hello! I\'m your weather assistant. Ask me about today\'s weather, clothing recommendations, or activities suited for the current conditions.' 
        }
      ],
      userInput: '',
      isProcessing: false
    };
  },
  watch: {
    messages() {
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    }
  },
  methods: {
    toggleChat() {
      this.isChatOpen = !this.isChatOpen;
      if (this.isChatOpen) {
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },
    async sendMessage() {
      if (!this.userInput.trim() || this.isProcessing) return;
      
      // Add user message
      const userMessage = this.userInput.trim();
      this.messages.push({ sender: 'user', content: userMessage });
      this.userInput = '';
      
      // Add loading indicator
      this.messages.push({ sender: 'bot', content: null });
      this.isProcessing = true;
      
      try {
        // Get weather context
        const weatherContext = this.getWeatherContext();
        
        // Call the chatbot API
        const response = await this.callChatbotAPI(userMessage, weatherContext);
        
        // Replace loading indicator with response
        this.messages.pop(); // Remove loading indicator
        this.messages.push({ sender: 'bot', content: response });
      } catch (error) {
        console.error('Error with chatbot:', error);
        // Replace loading indicator with error message
        this.messages.pop(); // Remove loading indicator
        this.messages.push({ 
          sender: 'bot', 
          content: 'Sorry, I had trouble processing your request. Please try again later.' 
        });
      } finally {
        this.isProcessing = false;
      }
    },
    getWeatherContext() {
      // Format current weather data for the AI
      const weather = this.currentWeather;
      if (!weather || !weather.district) {
        return "I don't have current weather information available.";
      }
      
      return `Current weather in ${weather.district}: ${weather.temperature}°C, ${weather.description}, 
        humidity ${weather.humidity}%, wind speed ${weather.windSpeed} m/s.`;
    },
    async callChatbotAPI(userMessage, weatherContext) {
      try {
        const response = await axios.post('/api/chatbot', {
          message: userMessage,
          context: weatherContext
        });
        return response.data.response;
      } catch (error) {
        console.error('API error:', error);
        throw error;
      }
    },
    formatMessage(message) {
      // Basic formatting to add line breaks and links
      return message
        .replace(/\n/g, '<br>')
        .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
    },
    scrollToBottom() {
      const chatContainer = this.$refs.chatMessages;
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }
  }
};
</script>

<style scoped>
.chatbot-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 350px;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.chat-body {
  display: flex;
  flex-direction: column;
}

.chat-messages {
  display: flex;
  flex-direction: column;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 5px;
}

.message {
  margin-bottom: 10px;
  max-width: 85%;
}

.user-message {
  align-self: flex-end;
}

.bot-message {
  align-self: flex-start;
}

.message-content {
  padding: 8px 12px;
  border-radius: 15px;
  color: white;
}

.user-message .message-content {
  background-color: #007bff;
  border-bottom-right-radius: 5px;
}

.bot-message .message-content {
  background-color: #6c757d;
  border-bottom-left-radius: 5px;
}

.message-content p {
  margin-bottom: 0;
}

.typing-indicator {
  display: flex;
  padding: 5px 0;
}

.typing-indicator span {
  height: 8px;
  width: 8px;
  background-color: #ffffff;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
  animation: typing 1s infinite ease-in-out;
}

.typing-indicator span:nth-child(1) {
  animation-delay: 0s;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
  margin-right: 0;
}

@keyframes typing {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
}
</style>