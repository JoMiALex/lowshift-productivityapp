import React from 'react'
import Navbar from '.'

const DashboardWrapper = ({ children} : {children: React.ReactNode}) => {
  return (
    <div className={'flex bg-emerald-900 w-full min-h-screen'}>
        
        {/* {children} */}
        <main className={'flex flex-col w-full h-full py-7 px-9'}>
          <Navbar />
          {children}
          </main>
    </div>
  )
}

export default DashboardWrapper