import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";

interface SearchBarProps {
    onSearch: (city: string) => void;
    onUseCurrentLocation: () => void;
}

export default function SearchBar({ onSearch, onUseCurrentLocation }: SearchBarProps) {
    const [city, setCity] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (city.length > 2) {
            const delayDebounceFn = setTimeout(() => {
                fetchSuggestions(city);
            }, 300);

            return () => clearTimeout(delayDebounceFn);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
            setError(null);
        }
    }, [city]);

    const fetchSuggestions = async (query: string) => {
        try {
            setLoading(true);
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?city=${query}&format=json&limit=5`
            );
            const data = await response.json();
            if (Array.isArray(data)) {
                setSuggestions(data.map((place) => place.display_name));
                setShowSuggestions(true);
                setError(null);
            } else {
                throw new Error("Invalid data format");
            }
        } catch {
            setError("Failed to fetch city suggestions. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (city.trim()) {
            handleSelectSuggestion(city.trim());
        }
    };

    const handleSelectSuggestion = (selectedCity: string) => {
        setCity(selectedCity);
        setSuggestions([]);
        setLoading(false);
        setShowSuggestions(false);
        onSearch(selectedCity);
        setError(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
        setShowSuggestions(false);
        setSuggestions([]);
    };

    return (
        <div className="w-full max-w-4xl mx-auto relative z-50">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl relative border border-white/20">
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            value={city}
                            onChange={handleInputChange}
                            placeholder="Enter city name"
                            className="w-full px-5 py-3 rounded-xl bg-white/20 backdrop-blur-md 
                            text-white placeholder-gray-300 border border-white/30
                            focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50
                            transition-all duration-300"
                        />
                        {showSuggestions && (
                            <ul className="absolute w-full mt-1 bg-white/10 backdrop-blur-md shadow-lg 
                            rounded-lg z-50 text-white border border-white/20">
                                {loading ? (
                                    <li className="px-4 py-2 flex items-center gap-2 text-gray-300">
                                        <div className="animate-spin h-5 w-5 border-4 border-blue-400 border-t-transparent rounded-full"></div>
                                        Loading cities...
                                    </li>
                                ) : suggestions.length > 0 ? (
                                    suggestions.map((suggestion, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleSelectSuggestion(suggestion)}
                                            className="px-4 py-2 cursor-pointer hover:bg-white/20 
                                            transition-colors duration-200"
                                        >
                                            {suggestion}
                                        </li>
                                    ))
                                ) : null}
                            </ul>
                        )}

                        {error && <p className="text-red-400 mt-2">{error}</p>}
                    </div>

                    <button
                        type="button"
                        onClick={onUseCurrentLocation}
                        className="px-5 py-3 bg-emerald-500/80 hover:bg-emerald-600/80 text-white 
                        rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400/50 
                        transition-all duration-300 backdrop-blur-sm flex items-center justify-center
                        border border-emerald-400/30"
                    >
                        <MapPin size={20} className="mr-2" />
                        Live Location
                    </button>
                </form>
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="mt-4 w-full sm:w-auto px-5 py-3 bg-blue-500/80 hover:bg-blue-600/80 
                    text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 
                    transition-all duration-300 backdrop-blur-sm border border-blue-400/30"
                >
                    View Weather
                </button>
            </div>
        </div>
    );
}