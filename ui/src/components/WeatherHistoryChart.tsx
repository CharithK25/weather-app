import React, { useEffect, useState } from "react";
import { getHistory, HistoricWeather } from "../api/weatherApi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Spinner, Alert } from "react-bootstrap";

interface Props {
  city: string;
}

export const WeatherHistoryChart: React.FC<Props> = ({ city }) => {
  const [data, setData] = useState<HistoricWeather[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city) return;
    setLoading(true);
    setError(null);
    getHistory(city, 5)
      .then(setData)
      .catch(() => setError("Failed to load historic data"))
      .finally(() => setLoading(false));
  }, [city]);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!data.length) return null;

  return (
    <div style={{ height: 300 }} className="p-3 m-3">
      <h5 className="text-center mt-4">Historic Temperatures (last 5 days)</h5>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="avgTempC" stroke="#007bff" name="Avg Temp" />
          <Line type="monotone" dataKey="maxTempC" stroke="#dc3545" name="Max Temp" />
          <Line type="monotone" dataKey="minTempC" stroke="#28a745" name="Min Temp" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
