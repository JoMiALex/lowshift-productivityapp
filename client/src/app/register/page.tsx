'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'


const register = () => {
    const [isSupervisor, setIsSupervisor] = useState(false);
    const router = useRouter();

return (
    <div className="flex items-center justify-center min-h-screen">
        <form className="flex flex-col items-center space-y-4 w-[600px] p-8 bg-white rounded-lg border border-solid border-[#d9d9d9] shadow-lg">
            <h1 className="text-2xl font-bold text-[#1e1e1e]">Enter New User Info:</h1>
            <div className="flex flex-col items-start gap-2 w-full">
                <label className="self-stretch font-body-base font-medium text-[#1e1e1e] text-base tracking-normal leading-normal">
                    Email:
                </label>
                <input
                    type="text"
                    placeholder="Email"
                    className="flex items-center px-5 py-4 w-full bg-white rounded-lg border border-solid border-[#d9d9d9] text-black"
                />
            </div>

            <div className="flex flex-col items-start gap-2 w-full">
                <label className="self-stretch font-body-base font-medium text-[#1e1e1e] text-base tracking-normal leading-normal">
                    Password:
                </label>
                <input
                    type="password"
                    placeholder="Password"
                    className="flex items-center px-5 py-4 w-full bg-white rounded-lg border border-solid border-[#d9d9d9] text-black"
                />
            </div>

            <div className="flex justify-between items-left w-full">
                <label className="flex-1 font-body-base font-medium text-[#1e1e1e] text-base tracking-normal leading-normal">
                    Supervisor/Admin
                </label>
                <button
                    type="button"
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

            <div className="flex flex-col items-center gap-2.5">
                <button
                    type="button"
                    className="w-300 p-3 text-lg bg-[#2c2c2c] text-white rounded-md hover:bg-black transition duration-300"
                    onClick={() => router.push('/login')}
                >
                    Add User
                </button>
            </div>
        </form>
    </div>
);
}

export default register