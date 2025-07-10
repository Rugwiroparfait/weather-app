#!/bin/bash
# filepath: /home/kali/Documents/Projects/weather-app/start-app.sh

# Colors for better visibility
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================${NC}"
echo -e "${GREEN}Starting Rwanda Weather Application${NC}"
echo -e "${BLUE}================================${NC}"

# Check if MongoDB is running
if ! pgrep mongod > /dev/null; then
    echo -e "${YELLOW}MongoDB is not running. Starting Docker container...${NC}"
    cd backend && docker-compose up -d
    sleep 3 # Give MongoDB a moment to start
else
    echo -e "${GREEN}MongoDB is already running${NC}"
fi

# Function to handle script exit
cleanup() {
    echo -e "\n${YELLOW}Shutting down servers...${NC}"
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Set up trap to catch Ctrl+C
trap cleanup SIGINT

# Start backend server
echo -e "\n${GREEN}Starting backend server...${NC}"
cd "$(dirname "$0")/backend"
npm run dev &
BACKEND_PID=$!
echo -e "${GREEN}Backend server started with PID: ${BACKEND_PID}${NC}"

# Start frontend development server
echo -e "\n${GREEN}Starting frontend development server...${NC}"
cd "$(dirname "$0")/frontend"
npm run serve &
FRONTEND_PID=$!
echo -e "${GREEN}Frontend server started with PID: ${FRONTEND_PID}${NC}"

echo -e "\n${BLUE}================================${NC}"
echo -e "${GREEN}Both servers are now running${NC}"
echo -e "${YELLOW}Backend:${NC} http://localhost:3000"
echo -e "${YELLOW}Frontend:${NC} http://localhost:8080"
echo -e "${BLUE}================================${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop both servers${NC}"

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
