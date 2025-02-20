import Image from 'next/image';
import { WeatherData } from '../types/weather';
import { Wind, Droplets, Thermometer, ArrowDown, Sunrise, Sunset } from 'lucide-react';

interface WeatherCardProps {
    data: WeatherData;
}

export default function WeatherCard({ data }: WeatherCardProps) {
    const formatTime = (timestamp: number) => {
        return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
    const currentTime = new Date().toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="bg-gradient-to-br from-blue-400/20 via-blue-500/20 to-blue-600/20 backdrop-blur-xl 
            rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-6 sm:p-8 w-full mx-auto border border-white/20">
            
            {/* Top Section - Location & Time */}
            <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white drop-shadow-sm mb-3">
                    {data.city}, {data.country}
                </h2>
                <p className="text-xl sm:text-2xl lg:text-3xl text-blue-100/80 font-medium">
                    {currentTime}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Temperature & Weather Icon */}
                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center">
                        <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48
                            bg-gradient-to-b from-white/10 to-transparent rounded-full
                            backdrop-blur-sm mb-4">
                            <Image
                                src={`http://openweathermap.org/img/wn/${data.icon}@4x.png`}
                                alt={data.description}
                                width={200}
                                height={200}
                                className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]
                                    animate-float-slow filter brightness-125 contrast-125"
                            />
                        </div>
                        <p className="text-4xl sm:text-6xl font-bold text-white drop-shadow-md mt-2">{data.temperature}°C</p>
                        <p className="text-xl sm:text-2xl capitalize text-blue-100/90 mt-2">{data.description}</p>
                    </div>
                </div>

                {/* Right Column - Weather Details */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4">
                    <WeatherDetail icon={<Thermometer className="text-orange-300" size={24} />} label="Feels Like" value={`${data.feelsLike}°C`} />
                    <WeatherDetail icon={<Droplets className="text-blue-300" size={24} />} label="Humidity" value={`${data.humidity}%`} />
                    <WeatherDetail icon={<Wind className="text-cyan-300" size={24} />} label="Wind Speed" value={`${data.windSpeed} km/h`} />
                    <WeatherDetail icon={<ArrowDown className="text-purple-300" size={24} />} label="Pressure" value={`${data.pressure} hPa`} />
                    <WeatherDetail icon={<Sunrise className="text-yellow-300" size={24} />} label="Sunrise" value={formatTime(data.sunrise)} />
                    <WeatherDetail icon={<Sunset className="text-orange-300" size={24} />} label="Sunset" value={formatTime(data.sunset)} />
                </div>
            </div>
        </div>
    );
}

function WeatherDetail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex items-center
            border border-white/10 hover:bg-white/15 transition-colors duration-300">
            <div className="mr-4">{icon}</div>
            <div>
                <p className="text-sm text-blue-100/70">{label}</p>
                <p className="font-bold text-lg text-white">{value}</p>
            </div>
        </div>
    );
}