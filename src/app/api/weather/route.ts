import { NextResponse } from 'next/server';
import { WeatherData } from '@/types/weather';

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

async function fetchWeatherData(city?: string | null, lat?: string | null, lon?: string | null): Promise<WeatherData> {
    let url = `${BASE_URL}?appid=${API_KEY}&units=metric`;

    if (city) {
        url += `&q=${encodeURIComponent(city)}`;
    } else if (lat && lon) {
        url += `&lat=${lat}&lon=${lon}`;
    } else {
        throw new Error('City or coordinates are required');
    }

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();
    return {
        city: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
        pressure: data.main.pressure,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
    };
}

// Ensure API function is correctly structured
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const lat = searchParams.get('lat');
        const lon = searchParams.get('lon');
        const city = searchParams.get('city');

        if (!API_KEY) {
            return NextResponse.json({ error: 'API key is missing' }, { status: 500 });
        }

        const weatherData = await fetchWeatherData(city, lat, lon);
        return NextResponse.json(weatherData);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch weather data';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
