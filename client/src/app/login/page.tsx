'use client'
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';

export const FormLogIn = () => {
    const [isSupervisor, setIsSupervisor] = useState(false);
    const [isShiftView, setIsShiftView] = useState(false);
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="flex flex-col items-center space-y-4 w-[600px] p-8 bg-white rounded-lg border border-solid border-[#d9d9d9] shadow-lg">
                <div className="flex flex-col items-start gap-2 w-full">
                    <div className="self-stretch relative font-body-base font-medium text-[#1e1e1e] text-base tracking-normal leading-normal">
                        Username:
                    </div>

                    <input 
                        type="text" 
                        placeholder="Enter your username" 
                        className="flex items-center px-5 py-4 w-full bg-white rounded-lg border border-solid border-[#d9d9d9] text-black"
                    />
                </div>

                <div className="flex flex-col items-start gap-2 w-full">
                    <div className="self-stretch relative font-body-base font-medium text-[#1e1e1e] text-base tracking-normal leading-normal">
                        Password:
                    </div>

                    <input 
                        type="password" 
                        placeholder="Enter your password" 
                        className="flex items-center px-5 py-4 w-full bg-white rounded-lg border border-solid border-[#d9d9d9] text-black"
                    />
                </div>

                <div className="flex flex-col items-start gap-2.5 w-full">
                    <button className="w-full py-3 text-lg bg-[#2c2c2c] text-white rounded-md hover:bg-black transition duration-300"
                    onClick={() => router.push('/schedule')}
                    >
                        Sign In
                    </button>
                </div>

                <div className="flex flex-col w-full space-y-2">
                    <div className="flex justify-between items-center">
                        <div className="flex-1 font-body-base font-medium text-[#1e1e1e] text-base tracking-normal leading-normal">
                            Supervisor/Admin
                        </div>
                        <button 
                            onClick={() => setIsSupervisor(!isSupervisor)}
                            className={`relative w-10 h-6 rounded-full p-0.5 transition-colors duration-200 ease-in-out ${
                                isSupervisor ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                        >
                            <span
                                className={`block w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                                    isSupervisor ? 'translate-x-4' : 'translate-x-0'
                                }`}
                            />
                        </button>
                    </div>
                    <div className="flex justify-between items-center">
                    <div className="flex-1 font-body-base font-medium text-[#1e1e1e] text-base tracking-normal leading-normal">
                            Shift View
                        </div>
                        <button 
                            onClick={() => setIsShiftView(!isShiftView)}
                            className={`relative w-10 h-6 rounded-full p-0.5 transition-colors duration-200 ease-in-out ${
                                isShiftView ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                        >
                            <span
                                className={`block w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                                    isShiftView ? 'translate-x-4' : 'translate-x-0'
                                }`}
                            />
                        </button>
                    </div>
                </div>

                <a 
                    href="/forgot-password"
                    className="self-stretch h-22 flex items-end w-full text-[#1e1e1e] hover:underline"
                >
                    Forgot password?
                </a>    
            </div>
        </div>
    );
};

export default FormLogIn;