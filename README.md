<div align="center">

# ⛅ Weather Dashboard

A sleek and intuitive weather application delivering real-time weather insights with a modern user interface.

[![Next.js](https://img.shields.io/badge/Next.js-13.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![OpenWeatherMap](https://img.shields.io/badge/OpenWeatherMap-API-orange?style=for-the-badge&logo=openweathermap)](https://openweathermap.org/api)

</div>

## 📌 Overview

Experience weather forecasting reimagined with our dynamic dashboard. Seamlessly access accurate weather data through an elegant interface that adapts to your device and location preferences.

## 🚀 About Project

### 🎯 Introduction

Transform how you check the weather with our sophisticated application. Whether you're planning your day or tracking weather patterns, get instant access to comprehensive weather data through city search or automatic location detection.

### 💻 Technologies Used

- Next.js for robust server-side rendering
- TypeScript ensuring type safety
- GitHub for version control
- Node.js powering the backend
- Express for efficient API routing
- TailwindCSS creating responsive designs
- Jest enabling reliable testing
- Supertest for API testing
- Vercel ensuring seamless deployment
- OpenWeatherMap API delivering accurate data

### ⚡ Functionalities

- Smart Location Detection: Automatically fetches weather data based on user's current location
- Intelligent Search: Dynamic city search with autocomplete suggestions
- Comprehensive Data Display: Detailed weather metrics including temperature, humidity, wind speed, and more
- Visual Weather Representation: Clear icons and descriptions for current conditions
- Time-Aware Updates: Real-time data with automatic refresh capabilities
- Responsive Design: Seamless experience across all devices


### 🛡️ Error Handling

- Displays clear and user-friendly error messages for invalid inputs or issues while fetching data, utilizing try/catch blocks and alert notifications.
- Manages backend errors effectively and ensures proper error state handling on the frontend.

### 🧪 Testing

- Conducted unit testing for the frontend WeatherData component and the weatherData.ts action responsible for fetching data, using Jest.
- Tried implementing unit tests for the route.ts file on the backend with Supertest but faced some challenges.

## ✨ Features

Our weather dashboard offers an intuitive interface with:
- Smart Search: Intelligent city name input with suggestions
- One-Click Updates: Instant weather data retrieval
- Clear Visualization: Clean, organized weather information display including:
  - Current Temperature
  - Real Feel Temperature
  - Humidity Levels
  - Wind Conditions
  - Detailed Weather Status
- Reliable Backend: Robust server handling with proper error management
- Efficient Processing: Quick data parsing and delivery
- User-Centric Design: Thoughtful error handling and feedback

## 🛠️ Getting Started

### Prerequisites

- Node.js 
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd weather-dashboard
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment:
   ```bash
   OPENWEATHERMAP_API_KEY=<your-openweathermap-api-key>
   ```
4. Launch development:
   ```bash
   npm run dev
   ```
5. Visit `http://localhost:3000`

## 🧪 Testing

- Frontend unit tests are written using Jest. To execute the tests.
- Backend integration tests are implemented using Mocha/Chai or Jest/Supertest. To run    them.
```bash
npm test
```

## 🚀 Deployment

Experience the live application: [Weather Dashboard](https://weatherapp-floworks.vercel.app/)

</div>