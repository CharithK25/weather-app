#  Weather & Local Time App

A modern React + TypeScript application to check **real-time weather** and **local time** of any city in the world.  
The app also tracks recent searches, visualizes weather history trends, and shows the city on an interactive map.

---

##  Features

-  Search for weather by city name
-  Displays:
  - Current temperature
  - Local time
  - Sunrise & sunset times

  ## Additional features
-  Maintains a **recent searches history** (up to 6 cities)
-  Weather history chart for temperature trends
-  Interactive map with latitude & longitude
-  Responsive UI using **React-Bootstrap**
-  Error handling & loading spinner for smooth UX

---

##  Tech Stack

- **React (TypeScript)** – Component-based frontend
- **React-Bootstrap** – UI and styling
- **Axios / Fetch API** – API calls
- **Chart.js / Recharts** – Weather history chart
- **Leaflet / Mapbox / Google Maps** – Interactive maps
- **Bootstrap utilities** – Consistent margin & padding (`m-3`, `p-4`)

---

##  Project Structure

```
src/
│── api/
│   └── weatherApi.ts        # Weather API integration
│
│── components/
│   ├── WeatherSearch.tsx    # Main search UI
│   ├── WeatherHistoryChart.tsx # Chart for temperature trends
│   └── CityMap.tsx          # Interactive city map
│
│── App.tsx
│── index.tsx
```

---

##  Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/weather-app.git
   cd weather-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Add your **Weather API Key** inside `src/api/weatherApi.ts`:
   ```ts
   const API_KEY = "YOUR_API_KEY";
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open in browser:
   ```
   http://localhost:3000
   ```

---

##  Usage

1. Enter a city name (e.g., `Rotterdam`, `New York`, `Tokyo`) in the input field.
2. Click **Search**.
3. The app will show:
   - Weather details (temperature, sunrise, sunset, local time)
   - Interactive map of the city
   - Weather history chart
4. Recent searches will appear in a list for quick access.

---



##  Future Improvements

- Multi-day weather forecast (3-day / 7-day)
- Persist recent searches in **localStorage**
- Dark mode support
- Geolocation-based city detection

---

