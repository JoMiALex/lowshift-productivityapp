"use client";

import React, { useState } from 'react'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleNavigation = (path: string) => {
    setIsModalOpen(false); // Close modal after navigation
    router.push(path);
  };
  
  return (
    <>
    <div className="flex justify-between items-center w-full mb-7">
        {/* LEFT SIDE */}
        <div className="flex justify-between items-center gap-5">
            <button 
              className="px-3 py-3 bg-black rounded-full hover:bg-gray-700"
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              <Menu className="w-4 h-4"/>
            </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative">
            <div className="absolute inset-y-0 right-5 pl-3 flex items-center">
                <img src="/images/logo.png" alt="logo" className="w-10 h-10 mr-2" />
                <h1 className="text-2xl font-bold text-white">LowShift</h1>
            </div>
        </div>
    </div>

    {/* Modal */}
    <div 
      className={`fixed top-0 left-0 h-screen w-64 bg-gray-600 transform transition-transform duration-300 ease-in-out ${
        isModalOpen ? 'translate-x-0' : '-translate-x-full'
      } z-50`}
    >
      <div className="p-6">
      <button 
          className="absolute top-3 right-3 px-3 py-3 rounded-full hover:bg-gray-800"
          onClick={() => setIsModalOpen(false)}
        >
          <Menu className="w-4 h-4"/>
        </button>
        {/* Modal content */}
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4">Menu</h2>
          <nav>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-gray-400">Home</a></li>
              <li><a href="#" className="hover:text-gray-400">Dashboard</a></li>
              <li><a href="#" className="hover:text-gray-400">Settings</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    </>

  );
}

export default Navbar