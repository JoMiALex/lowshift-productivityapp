"use client"

import { useSelector } from "react-redux";
//import state from "../(state)/store"; // Adjust the path to your store file

const HomePage = () => {
  const user = useSelector((state: any) => state.auth.user);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <h1 className="text-5xl font-bold text-emerald-700">Welcome, {user.displayName || "Guest"}!</h1>
      <p className="text-xl mb-8 text-black">Let's get started! Go ahead and navigate to the sidebar to access your info.</p>
    </div>
  )
}

export default HomePage

//className="text-center mb-8"
//style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}