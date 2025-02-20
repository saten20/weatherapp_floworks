import { render, screen } from "@testing-library/react";
import WeatherCard from "../src/components/WeatherCard";
import { WeatherData } from "../src/types/weather";
import '@testing-library/jest-dom';

const mockWeatherData: WeatherData = {
    city: "New York",
    country: "US",
    temperature: 22,
    feelsLike: 20,
    description: "Cloudy",
    icon: "04d",
    humidity: 60,
    windSpeed: 10,
    pressure: 1012,
    sunrise: 1699999999,
    sunset: 1700009999,
};

describe("WeatherCard Component", () => {
    it("renders weather details correctly", () => {
        render(<WeatherCard data={mockWeatherData} />);

        expect(screen.getByText("New York, US")).toBeInTheDocument();
        expect(screen.getByText("22°C")).toBeInTheDocument();
        expect(screen.getByText("Cloudy")).toBeInTheDocument();
        expect(screen.getByText("Feels Like")).toBeInTheDocument();
        expect(screen.getByText("Humidity")).toBeInTheDocument();
    });
});
