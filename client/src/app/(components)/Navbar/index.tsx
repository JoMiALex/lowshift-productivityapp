"use client";

import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
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

        {/* CENTER */}
        <div className="flex justify-center items-center">
            <img src="/images/logo.png" alt="logo" className="w-10 h-10 mr-2" />
            <h1 className="text-2xl font-bold text-white">LowShift</h1>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex justify-between items-center gap-5 pr-5">
            Profile
            <button 
              className="flex items-center gap-2 rounded-full hover:bg-gray-700"
              onClick={() => handleNavigation('/profile')}
            >
              <div className="w-7 h-7 bg-white rounded-full"></div>
            </button>
            Logout
            <button 
              className="flex items-center gap-2 px-3 py-3 bg-black rounded-full hover:bg-gray-700"
              onClick={() => handleNavigation('/login')}
            >
              <X className="w-4 h-4"/>
            </button>
        </div>
    </div>

    {/* Modal */}
    <div 
      className={
        `fixed top-0 left-0 h-screen w-64 bg-gray-600 transform transition-transform duration-300 ease-in-out 
        ${ isModalOpen ? 'translate-x-0' : '-translate-x-full' } z-50`
        }
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
              <li>
                <button 
                  onClick={() => handleNavigation('/Home')}
                  className="hover:text-gray-300"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/Checklist')}
                  className="hover:text-gray-300"
                >
                  Shift Page
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/timeclock')}
                  className="hover:text-gray-300"
                >
                  Clock In/Out
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/schedule')}
                  className="hover:text-gray-300"
                >
                  Schedule
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/time_log')}
                  className="hover:text-gray-300"
                >
                  Time Log
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    </>

  );
}

export default Navbar