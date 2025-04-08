'use client';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, db } from '../../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

const register = () => {
    const [isSupervisor, setIsSupervisor] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const requiredFields = ['firstName', 'lastName', 'email', 'password'];
        const newErrors: Record<string, string> = {};

        requiredFields.forEach((field) => {
            if (!formData.get(field)) {
                newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        const { firstName, lastName, phone, email, password, hourlyLimit } = Object.fromEntries(
            formData.entries()
        ) as Record<string, string>;

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);

            await setDoc(doc(db, 'employees', res.user.uid), {
                employee_id: res.user.uid,
                first_name: firstName,
                last_name: lastName,
                email,
                phone,
                hour_limit: hourlyLimit,
                supervisor: isSupervisor,
            });

        } catch (err: any) {
            console.error('Error during registration:', err);

            if (err.code === 'auth/email-already-in-use') {
                setErrors({ email: 'Email already in use' });
            } else if (err.code === 'auth/weak-password') {
                setErrors({ password: 'Password is too weak' });
            } else {
                setErrors({ general: 'An unexpected error occurred. Please try again.' });
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form
                className="flex flex-col items-center space-y-4 w-[800px] p-8 bg-white rounded-lg border border-solid border-[#d9d9d9] shadow-lg"
                onSubmit={handleRegister}
            >
                <h1 className="text-2xl font-bold text-[#1e1e1e]">Enter New User Info:</h1>

                {/* First Name Field */}
                <div className="flex flex-col items-start gap-2 w-full">
                    <label className="self-stretch font-body-base font-medium text-[#1e1e1e] text-base tracking-normal leading-normal">
                        First Name: <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                        className="flex items-center px-5 py-4 w-full bg-white rounded-lg border border-solid border-[#d9d9d9] text-black"
                    />
                    {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName}</span>}
                </div>

                {/* Last Name Field */}
                <div className="flex flex-col items-start gap-2 w-full">
                    <label className="self-stretch font-body-base font-medium text-[#1e1e1e] text-base tracking-normal leading-normal">
                        Last Name: <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="lastName"
                        type="text"
                        placeholder="Last Name"
                        className="flex items-center px-5 py-4 w-full bg-white rounded-lg border border-solid border-[#d9d9d9] text-black"
                    />
                    {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}
                </div>

                {/* Phone Field */}
                <div className="flex flex-col items-start gap-2 w-full">
                    <label className="self-stretch font-body-base font-medium text-[#1e1e1e] text-base tracking-normal leading-normal">
                        Phone:
                    </label>
                    <input
                        name="phone"
                        type="text"
                        placeholder="Phone"
                        className="flex items-center px-5 py-4 w-full bg-white rounded-lg border border-solid border-[#d9d9d9] text-black"
                    />
                </div>

                {/* Email Field */}
                <div className="flex flex-col items-start gap-2 w-full">
                    <label className="self-stretch font-body-base font-medium text-[#1e1e1e] text-base tracking-normal leading-normal">
                        Email: <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="email"
                        type="text"
                        placeholder="Email"
                        className="flex items-center px-5 py-4 w-full bg-white rounded-lg border border-solid border-[#d9d9d9] text-black"
                    />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                </div>

                {/* Password Field */}
                <div className="flex flex-col items-start gap-2 w-full">
                    <label className="self-stretch font-body-base font-medium text-[#1e1e1e] text-base tracking-normal leading-normal">
                        Password: <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="flex items-center px-5 py-4 w-full bg-white rounded-lg border border-solid border-[#d9d9d9] text-black"
                    />
                    {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                </div>

                {/* Hourly Limit Field */}
                <div className="flex flex-col items-start gap-2 w-full">
                    <label className="self-stretch font-body-base font-medium text-[#1e1e1e] text-base tracking-normal leading-normal">
                        Hourly Limit:
                    </label>
                    <input
                        name="hourlyLimit"
                        type="number"
                        placeholder="Hourly Limit"
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
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={() => router.push('/')}
                            className="w-300 p-3 text-lg bg-gray-300 text-black rounded-full hover:bg-gray-400 transition duration-300"
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            className="w-300 p-3 text-lg bg-[#2c2c2c] text-white rounded-full hover:bg-black transition duration-300"
                        >
                            Add User
                        </button>
                    </div>
                    {errors.general && <span className="text-red-500 text-sm">{errors.general}</span>}
                </div>
            </form>
        </div>
    );
};

export default register;