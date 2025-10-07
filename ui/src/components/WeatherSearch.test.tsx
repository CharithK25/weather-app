import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import React from "react";
import {WeatherSearch} from "./WeatherSearch";

const mockGetWeather = jest.fn();
const mockGetHistory = jest.fn();

jest.mock("../api/weatherApi", () => ({
  __esModule: true,
  getWeather: (...args: any[]) => mockGetWeather(...args),
  getHistory: (...args: any[]) => mockGetHistory(...args),
}));

jest.mock("react-leaflet", () => ({
  MapContainer: ({ children }: any) => <div data-testid="map">{children}</div>,
  TileLayer: () => <div />,
  Marker: ({ children }: any) => <div>{children}</div>,
  Popup: ({ children }: any) => <div>{children}</div>,
}));

describe("WeatherSearch", () => {
  it("shows weather after search", async () => {
    mockGetWeather.mockResolvedValueOnce({
      city: "Rotterdam",
      temperature: 15,
      region: "South Holland",
      country: "Netherlands",
      localTime: "2022-04-12 11:33",
      sunrise: "06:52 AM",
      sunset: "08:34 PM",
      latitude: 51.92,
      longitude: 4.48,
    });
    mockGetHistory.mockResolvedValueOnce([]);

    render(<WeatherSearch />);

    fireEvent.change(screen.getByPlaceholderText(/enter city/i), {
      target: { value: "Rotterdam" },
    });
    fireEvent.click(screen.getByText(/search/i));

    await waitFor(() => {
  
  expect(
    screen.getByRole("heading", { name: /Rotterdam/i })
  ).toBeInTheDocument();

  
  const detailsCard = screen.getByText("Weather Details").closest(".card") as HTMLElement;
  expect(within(detailsCard).getByText(/15/)).toBeInTheDocument();
});

  });
});
