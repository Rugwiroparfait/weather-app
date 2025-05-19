# Rwanda Weather API

> Enterprise-grade meteorological data service providing real-time weather information for all 31 districts of Rwanda. Accessible via web and mobile applications through a unified RESTful API.

---

## Overview

This comprehensive full-stack solution delivers precise weather forecasts for every administrative district in Rwanda by leveraging the Open-Meteo API integration. The architecture employs:

- **Frontend**: Vue.js 3 with Composition API and Bootstrap 5
- **Backend**: Node.js with Express.js framework
- **Database**: MongoDB with Mongoose ORM

The system features a RESTful API designed for cross-platform compatibility across web and mobile clients.

*Kinyarwanda*: Iyi serivisi itanga amakuru y'ibihe by'ikirere ku turere twose 31 tugize u Rwanda, hakoreshejwe Open-Meteo API. Yubatswe hakoreshejwe Vue 3, Express.js, na MongoDB.

---

## Technical Architecture

| Layer | Technology | Function |
|-------------|-------------------|-----------|
| Frontend | Vue 3, Bootstrap 5 | User interface and data visualization |
| Backend | Node.js, Express.js | API routing and business logic |
| Database | MongoDB + Mongoose | Data persistence and querying |
| External Services | Open-Meteo API | Weather data acquisition |

---

## Project Structure

The application follows standard industry practices for code organization:

```
rwanda-weather-app/
├── backend/       # Express REST API implementation
├── frontend/      # Vue.js application
```

### Backend Architecture

```
backend/
├── routes/        # API endpoint definitions
├── controllers/   # Business logic implementation
├── models/        # Database schema definitions
├── services/      # External API integrations
├── data/          # Geospatial coordinates for districts
├── config/        # Environment configuration
├── middleware/    # Request processing middleware
├── utils/         # Helper functions
└── server.js      # Application entry point
```

### Frontend Architecture

```
frontend/
├── src/
│   ├── views/         # Page components
│   ├── components/    # Reusable UI elements
│   ├── services/      # API client services
│   ├── stores/        # State management
│   ├── assets/        # Static resources
│   ├── router/        # Application routing
│   └── App.vue        # Root component
```

---

## Core Functionality

- **Real-time Weather Monitoring**: Continuous updates with minimal latency
- **Geospatial Precision**: District-specific meteorological data for all 31 administrative regions
- **Cross-platform API**: RESTful endpoints designed for both web and mobile consumption
- **Data Visualization**: Structured for integration with analytical dashboards and graphical representations

---

## Implementation Guide

### 1. Repository Initialization

```bash
git clone https://github.com/Rugwiroparfait/rwanda-weather-api.git
cd rwanda-weather-api
```

### 2. Backend Configuration

```bash
cd backend
npm install
cp .env.example .env  # Configure environment variables
npm run dev  # Launch development server
```

### 3. Frontend Configuration

```bash
cd frontend
npm install
npm run dev  # Launch development server
```

---

## API Documentation

| Method | Endpoint | Description | Response Format |
| ------ | -------- | ----------- | --------------- |
| GET | /api/weather | Retrieves weather data for all districts | JSON array |
| GET | /api/weather/:name | Retrieves weather data for a specific district | JSON object |
| GET | /api/weather/forecast/:name | Retrieves 7-day forecast for a specific district | JSON array |

### Response Schema

```json
{
  "district": "string",
  "temperature": "number",
  "humidity": "number",
  "windSpeed": "number",
  "precipitation": "number",
  "description": "string",
  "timestamp": "ISO8601 date string",
  "coordinates": {
    "latitude": "number",
    "longitude": "number"
  }
}
```

---

## Configuration Parameters

Required environment variables for the backend service:

```env
PORT=5000
MONGODB_URI=mongodb://username:password@host:port/database
API_KEY=your-openmeteo-api-key
NODE_ENV=production
```

---

## Coverage Area

The service encompasses all 31 districts of Rwanda across five provinces:

**Kigali Province**:
- Gasabo
- Kicukiro
- Nyarugenge

**Northern Province**:
- Burera
- Gakenke
- Gicumbi
- Musanze
- Rulindo

**Southern Province**:
- Gisagara
- Huye
- Kamonyi
- Muhanga
- Nyamagabe
- Nyanza
- Nyaruguru
- Ruhango

**Eastern Province**:
- Bugesera
- Gatsibo
- Kayonza
- Kirehe
- Ngoma
- Nyagatare
- Rwamagana

**Western Province**:
- Karongi
- Ngororero
- Nyabihu
- Nyamasheke
- Rubavu
- Rutsiro
- Rusizi

Each district is referenced by precise geospatial coordinates defined in `/backend/data/districtData.js`.

---

## Contribution Guidelines

We welcome professional contributions to enhance the platform's capabilities:

- Multilingual support (Kinyarwanda, French, English)
- User interface optimization
- Mobile client development (React Native, Flutter)
- Data visualization enhancements
- Performance optimization

Please follow our contribution workflow:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/enhancement-name`)
3. Commit changes (`git commit -m 'Add specific enhancement'`)
4. Push to branch (`git push origin feature/enhancement-name`)
5. Open a Pull Request

---

## Technical Contact

**Rugwiro Parfait**  
Agricultural Technology Specialist & Full Stack Engineer  
Rwanda

---

## License

This software is distributed under the MIT License.  
Copyright © 2025 Rwanda Weather API
