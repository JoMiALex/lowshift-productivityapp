"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DashboardWrapper from "./dashboardWrapper";
import { usePathname } from "next/navigation";
import { AuthProvider } from "./(components)/context/AuthContext";

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
        <AuthProvider>
          {showDashboard ? (
          
          <DashboardWrapper>
            <div className="bg-gray-200 rounded-lg p-5">
              {children}
            </div>
          </DashboardWrapper>
          
          ) : (
            <>
              <div className="rounded-lg p-5">
                {children}
              </div>
            </>
          )}
        </AuthProvider>
      </body>
    </html>
  );
}
