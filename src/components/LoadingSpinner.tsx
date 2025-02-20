import React from 'react';

export default function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center mt-8">
            <div className="relative w-32 h-32">
                <div className="absolute top-0 left-0 w-16 h-16 
                    bg-yellow-300/60 rounded-full animate-spin-slow 
                    shadow-[0_0_30px_rgba(255,255,0,0.3)]">
                </div>
                <div className="absolute top-8 left-8 w-20 h-12 
                    bg-white/40 rounded-full shadow-md animate-cloud-move 
                    blur-[1px]">
                </div>
                <div className="absolute top-6 left-10 w-12 h-12 
                    bg-white/40 rounded-full shadow-md animate-cloud-move 
                    blur-[1px]">
                </div>
                <div className="absolute top-10 left-6 w-14 h-14 
                    bg-white/40 rounded-full shadow-md animate-cloud-move 
                    blur-[1px]">
                </div>
            </div>
        </div>
    );
}