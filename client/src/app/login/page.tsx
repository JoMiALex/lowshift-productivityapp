'use client'
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../lib/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../(state)/authSlice";
import { doc, getDoc } from "@firebase/firestore";

export const FormLogIn = () => {
    const [isSupervisor, setIsSupervisor] = useState(false);
    const [isShiftView, setIsShiftView] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const dispatch = useDispatch();

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        let hasError = false;

        if (!email) {
            setEmailError("Email cannot be empty!");
            hasError = true;
        } else {
            setEmailError('');
        }

        if (!password) {
            setPasswordError("Password cannot be empty!");
            hasError = true;
        } else {
            setPasswordError('');
        }

        if (hasError) {
            setLoading(false);
            return;
        }

        try {
            
            const verifyLogin = await signInWithEmailAndPassword(auth, email, password);
            const user = verifyLogin.user;
            const userDoc = await getDoc(doc(db, 'employees', user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                dispatch(setUser({
                    uid: user.uid,
                    email: user.email,
                    isSupervisor: userData.supervisor,
                    displayName: user.displayName,
                }));

            }

            router.push('/Home');
        } catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }

    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <form onSubmit={handleSignIn} className="flex flex-col items-center space-y-4 w-[600px] p-8 bg-white rounded-lg border border-solid border-[#d9d9d9] shadow-lg">
                <div className="flex flex-col items-start gap-2 w-full">
                    <label className="self-stretch relative font-body-base font-medium text-[#1e1e1e] text-base tracking-normal leading-normal">
                        Email:
                    </label>
                    <input 
                        name="email"
                        type="text" 
                        placeholder="Enter your email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                        className={`flex items-center px-5 py-4 w-full bg-white rounded-lg border border-solid border-[#d9d9d9] text-black ${loading ? 'opacity-50' : ''}`}
                    />
                    {emailError && <span className="text-red-500 text-sm">{emailError}</span>}
                </div>

                <div className="flex flex-col items-start gap-2 w-full">
                    <div className="self-stretch relative font-body-base font-medium text-[#1e1e1e] text-base tracking-normal leading-normal">
                        Password:
                    </div>

                    <input 
                        type="password" 
                        placeholder="Enter your password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                        className={`flex items-center px-5 py-4 w-full bg-white rounded-lg border border-solid border-[#d9d9d9] text-black ${loading ? 'opacity-50' : ''}`}
                    />
                    {passwordError && <span className="text-red-500 text-sm">{passwordError}</span>}
                </div>

                <div className="flex flex-col w-full space-y-2">
                    <div className="flex justify-between items-center">
                        <div className="flex-1 font-body-base font-medium text-[#1e1e1e] text-base tracking-normal leading-normal">
                            Supervisor/Admin
                        </div>
                        <button 
                            onClick={() => setIsSupervisor(!isSupervisor)}
                            disabled={loading}
                            className={`relative w-10 h-6 rounded-full p-0.5 transition-colors duration-200 ease-in-out ${
                                isSupervisor ? 'bg-blue-600' : 'bg-gray-200'
                            } ${loading ? 'opacity-50' : ''}`}
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
                            disabled={loading}
                            className={`relative w-10 h-6 rounded-full p-0.5 transition-colors duration-200 ease-in-out ${
                                isShiftView ? 'bg-blue-600' : 'bg-gray-200'
                            } ${loading ? 'opacity-50' : ''}`}
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
                <div className="flex flex-col items-center gap-2.5 w-full">
                    <div className="flex items-center gap-4">
                        <button 
                            className={`w-300 p-3 text-lg bg-gray-300 text-black rounded-full hover:bg-gray-400 transition duration-300 ${loading ? 'opacity-50' : ''}`}
                            onClick={() => router.push('/')}
                            disabled={loading}
                        >
                            Back
                        </button>
                        <button
                            type="submit" 
                            className={`w-300 p-3 text-lg bg-[#2c2c2c] text-white rounded-full hover:bg-black transition duration-300 ${loading ? 'opacity-50' : ''}`}
                            disabled={loading}
                        >
                            Sign In
                        </button>
                    </div>
                </div>
    
            </form>
        </div>
    );
};

export default FormLogIn;