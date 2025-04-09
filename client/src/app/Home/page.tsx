"use client"

const HomePage = () => {
  const name = "John-Michael";

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <h1 className="text-5xl font-bold text-emerald-700">Welcome, {name}!</h1>
      <p className="text-xl mb-8 text-black">Let's get started! Go ahead and navigate to the sidebar to access your info.</p>
    </div>
  )
}

export default HomePage

//className="text-center mb-8"
//style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}