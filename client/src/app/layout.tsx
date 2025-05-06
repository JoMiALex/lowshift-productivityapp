"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DashboardWrapper from "./(components)/dashboardWrapper";
import { usePathname } from "next/navigation";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './(state)/store';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const unwrappedRoutes = ["/","/login","/register"];
  const showDashboard = !unwrappedRoutes.includes(pathname);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-emerald-900`}
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {showDashboard ? (
              <DashboardWrapper>
                <div className="bg-gray-200 rounded-lg p-5">{children}</div>
              </DashboardWrapper>
            ) : (
              <div className="rounded-lg p-5">{children}</div>
            )}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
