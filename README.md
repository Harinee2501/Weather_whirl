# WEATHER WHIRL 
## Problem Statement
People often need quick and accurate weather updates for their location or places they plan to visit. Many existing weather apps lack engaging visuals or intuitive design, and they don't dynamically adapt to weather conditions to provide an immersive user experience. WeatherWhirl solves this by providing real-time weather updates, forecasts, and background visuals that reflect the current weather conditions.

## Project Idea
WeatherWhirl is a React-based weather application that offers:

Today's Weather: Displays the current weather conditions at the user’s location.
Hourly Forecast: Provides a detailed forecast for the next few hours.
Weekly Forecast: Displays weather trends for the week ahead.
Search by City/ZIP: Allows users to search weather conditions for specific locations.
Dynamic Backgrounds: Changes the app's background video dynamically to reflect the weather conditions (e.g., sunny, rainy, cloudy).

## Approach
Data Fetching:
Use weather APIs like OpenWeatherMap and VisualCrossing to fetch real-time weather data.
Utilize the Geolocation API to detect the user’s location for location-based weather updates.

Dynamic Backgrounds:
Use pre-recorded weather videos (e.g., sunny, rainy, snowy) and switch the background dynamically based on the fetched weather conditions.

Modular Design:
Separate components for different functionalities such as search, current weather, hourly forecast, and weekly forecast.
Error Handling:

Implement robust error handling for API calls and location services to ensure seamless user experience.
User Experience:

Include a dimmed overlay for readability.
Ensure responsive design for mobile and desktop users.

## Progress / Status
✅ Completed all four functionalities: today's weather, hourly forecast, weekly forecast, and location search.
✅ Successfully integrated APIs for data fetching.
✅ Background videos change dynamically based on weather conditions.
🚧 Deployment is pending.

## Tech Stack
Frontend:
React.js: For building the user interface and managing component states.
CSS: For styling components and making the app visually appealing.
HTML5 Video: For displaying dynamic weather background videos.

APIs:
OpenWeatherMap API: For fetching current weather, hourly forecasts, and weekly forecasts.
VisualCrossing API: As an alternative data source for weather information.
Geolocation API: To get the user's current location.

Libraries:
Axios: To handle API requests and fetch data efficiently.
React Router: For navigation between different sections (e.g., hourly forecast, weekly forecast).
React Icons: To display weather-related icons and improve UI aesthetics.

Dynamic Media Handling:
Video Backgrounds:
Collection of short weather-themed videos (sunny, rainy, cloudy, snow).
Dynamically loaded based on the API's weather condition codes.
Managed with React's useEffect for smooth transitions.

## Future Scope
Deployment: Host the app on platforms like Vercel or Netlify to make it accessible.
Enhancements:
Add weather alerts for severe conditions.
Include detailed insights like air quality, UV index, and pollen levels.
Integrate voice search for hands-free operation.
Mobile App: Extend functionality to a mobile app for Android and iOS.
Dark Mode: Add dark mode support for better usability at night.
Global Accessibility: Translate the app into multiple languages for wider reach.