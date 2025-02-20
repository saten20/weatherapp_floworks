'use client';

import { useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useGeolocation } from '../hooks/useGeolocation';
import { WeatherData } from '@/types/weather';

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { latitude, longitude, error: geoError } = useGeolocation();

  const fetchWeather = useCallback(async (city?: string) => {
    setLoading(true);
    setError(null);
    try {
      const params = city
        ? `city=${encodeURIComponent(city)}`
        : `lat=${latitude}&lon=${longitude}`;
      const res = await fetch(`/api/weather?${params}`);
      if (!res.ok) throw new Error('Failed to fetch weather data');
      const data = await res.json();
      setWeather(data);
    } catch {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (latitude && longitude) {
      fetchWeather();
    }
  }, [fetchWeather, latitude, longitude]);

  const handleSearch = (city: string) => {
    fetchWeather(city);
  };

  const handleUseCurrentLocation = () => {
    if (latitude && longitude) {
      fetchWeather();
    } else if (geoError) {
      setError('Unable to get your location. Please try entering a city name.');
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-start p-4 sm:p-8 overflow-y-auto">
      <div className="w-full max-w-[1440px] mx-auto mt-8 sm:mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="flex flex-col">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-8 
            bg-gradient-to-r from-white/90 to-white/70 bg-clip-text text-transparent
            drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)]
            tracking-wide leading-tight">
            Weather Update<br className="hidden sm:block" /> 
            <span className="text-3xl sm:text-4xl font-light opacity-90">Update</span>
          </h1>
          <div className="w-full">
            <SearchBar 
              onSearch={handleSearch} 
              onUseCurrentLocation={handleUseCurrentLocation} 
            />
            {loading && <LoadingSpinner />}
            {error && (
              <p className="text-red-500 mt-4 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-4">
                {error}
              </p>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="flex items-start justify-center md:justify-end">
          {weather && (
            <div className="w-full">
              <WeatherCard data={weather} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}