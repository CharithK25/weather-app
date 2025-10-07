import React, { useState } from "react";
import { getWeather, WeatherResult } from "../api/weatherApi";
import { Container, Row, Col, Form, Button, Card, Spinner, Alert } from "react-bootstrap";
import { WeatherHistoryChart } from "./WeatherHistoryChart";
import { CityMap } from "./CityMap";


export const WeatherSearch: React.FC = () => {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<WeatherResult | null>(null);
  const [history, setHistory] = useState<{ city: string; temp: number }[]>([]);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await getWeather(city);
      setResult(data);
    setHistory((prev) => {
      const newEntry = { city: data.city, temp: data.temperature };
      const filtered = prev.filter((h) => h.city !== newEntry.city);
      const updated = [newEntry, ...filtered];
      return updated.slice(0, 6);
    });
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg border-0 p-3 m-3">
            <Card.Body>
              <Card.Title className="text-center mb-4 text-primary fs-3">
                Weather & Local Time
              </Card.Title>
              <Form onSubmit={handleSubmit} className="d-flex gap-2 mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter city (e.g. Rotterdam)"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
                <Button type="submit" variant="primary">
                  {loading ? <Spinner size="sm" animation="border" /> : "Search"}
                </Button>
                
              </Form>
              {error && <Alert variant="danger">{error}</Alert>}
             
   {history.length > 0 && (
  <Card className="mt-4 shadow-sm p-3 m-3">
    <Card.Header className="bg-info text-white fw-bold">
      Recent Searches
    </Card.Header>
    <Card.Body>
      <ul className="list-group">
        {history.map((h, idx) => (
          <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{h.city}</span>
            <span className="badge bg-primary rounded-pill">
              {h.temp} °C
            </span>
          </li>
        ))}
      </ul>
    </Card.Body>
  </Card>
)}

             
              {result && (
  <Card className="mt-4 border-0 shadow-lg text-dark p-3 m-3">
    <Card.Header className="bg-success text-white fw-bold">
      Weather Details
    </Card.Header>
    <Card.Body className="bg-light">
      <h4 className="mb-3 text-primary">
        {result.city}, {result.region}, {result.country}
      </h4>
      <ul className="list-unstyled fs-5">
        <li> <strong>Local Time:</strong> {result.localTime}</li>
        <li><strong>Temperature:</strong> {result.temperature} °C</li>
        <li><strong>Sunrise:</strong> {result.sunrise}</li>
        <li><strong>Sunset:</strong> {result.sunset}</li>
      </ul>
    </Card.Body>
  </Card>
)}

{result && (
  <>
    
    <WeatherHistoryChart city={result.city} />

    <CityMap lat={result.latitude} lon={result.longitude} city={result.city} />
  </>
)}


            </Card.Body>
          </Card>

        
        </Col>
      </Row>
    </Container>
  );
};
