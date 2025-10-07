import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./api/weatherApi", () => ({
  getWeather: jest.fn().mockResolvedValue({
    city: "Rotterdam",
    region: "South Holland",
    country: "Netherlands",
    localTime: "2022-04-12 11:33",
    temperature: 15,
    sunrise: "06:52 AM",
    sunset: "08:34 PM",
    latitude: 51.92,
    longitude: 4.48,
  }),
  getHistory: jest.fn().mockResolvedValue([]),
}));

jest.mock("react-leaflet", () => ({
  MapContainer: ({ children }: any) => <div data-testid="map">{children}</div>,
  TileLayer: () => <div />,
  Marker: ({ children }: any) => <div>{children}</div>,
  Popup: ({ children }: any) => <div>{children}</div>,
}));

test("renders app with title", () => {
  render(<App />);
  expect(
    screen.getByText(/Weather & Local Time/i)
  ).toBeInTheDocument();
});
