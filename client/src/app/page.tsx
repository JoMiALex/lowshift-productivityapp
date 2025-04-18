"use client";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();
  const currUser = null; // Replace with actual user state management
  const isLoggedIn = currUser !== null;
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center mb-8">
        <img src="/images/logo.png" alt="logo" className="w-32 h-32 mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4">Welcome to LowShift</h1>
        <p className="text-xl mb-8">Your productivity companion</p>
        
        <div className="space-x-4">
          <button
            onClick={() => router.push('/login')}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Login
          </button>
          <button
            onClick={() => router.push('/register')}
            className="bg-gray-700 px-6 py-2 rounded hover:bg-gray-300"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
