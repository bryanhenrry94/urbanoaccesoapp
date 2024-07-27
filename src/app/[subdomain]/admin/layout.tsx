"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTenant } from "@/contexts/TenantContext";
import { FaChartBar, FaUsers, FaCog, FaSignOutAlt } from 'react-icons/fa';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const { tenant } = useTenant();
  const [activeComponent, setActiveComponent] = useState("dashboard");

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-indigo-600 text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">{tenant?.name} Admin</h1>
        </div>
        <div className="flex items-center">
          {session?.user && (
            <>
              <span className="mr-4 font-semibold">{session.user.name}</span>
              {session.user.image && (
                <Image
                  src="/team/picture1.jpg"
                  alt={session.user.name ?? "User Image"}
                  width={40}
                  height={40}
                  className="rounded-full mr-4 border-2 border-white"
                />
              )}
            </>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out flex items-center"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      </header>
      <div className="flex flex-1">
        <nav className="bg-white w-64 p-6 shadow-lg">
          <ul className="space-y-4">
            <li>
              <Link
                href="/admin"
                className={`flex items-center py-2 px-4 rounded-lg transition duration-300 ease-in-out ${
                  activeComponent === "dashboard" ? "bg-indigo-100 text-indigo-600" : "hover:bg-gray-100"
                }`}
                onClick={() => setActiveComponent("dashboard")}
              >
                <FaChartBar className="mr-3" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/admin/users"
                className={`flex items-center py-2 px-4 rounded-lg transition duration-300 ease-in-out ${
                  activeComponent === "users" ? "bg-indigo-100 text-indigo-600" : "hover:bg-gray-100"
                }`}
                onClick={() => setActiveComponent("users")}
              >
                <FaUsers className="mr-3" />
                Users
              </Link>
            </li>
            <li>
              <Link
                href="/admin/settings"
                className={`flex items-center py-2 px-4 rounded-lg transition duration-300 ease-in-out ${
                  activeComponent === "settings" ? "bg-indigo-100 text-indigo-600" : "hover:bg-gray-100"
                }`}
                onClick={() => setActiveComponent("settings")}
              >
                <FaCog className="mr-3" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
        <main className="flex-1 p-8 bg-white m-6 rounded-lg shadow-lg">{children}</main>
      </div>
    </div>
  );
}
