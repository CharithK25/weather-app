import axios from "axios";

export interface WeatherResult {
  city: string;
  region: string;
  country: string;
  localTime: string;
  temperature: number;
  sunrise: string;
  sunset: string;
  latitude: number;
  longitude: number;
}


export async function getWeather(city: string): Promise<WeatherResult> {
  const res = await axios.get<WeatherResult>(
    "http://localhost:5059/api/weather", // <-- backend URL
    {
      params: { city },
    }
  );
  return res.data;
}


export interface HistoricWeather {
  date: string;
  avgTempC: number;
  maxTempC: number;
  minTempC: number;
}

export async function getHistory(city: string, days: number): Promise<HistoricWeather[]> {
  const res = await axios.get<HistoricWeather[]>(
    "http://localhost:5059/api/weather/history",
    { params: { city, days } }
  );
  return res.data;
}
