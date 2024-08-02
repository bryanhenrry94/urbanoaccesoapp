"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTenant } from "@/contexts/TenantContext";
import { FaChartBar, FaUsers, FaCog, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const { tenant } = useTenant();
  const [activeComponent, setActiveComponent] = useState("dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = (component: string) => {
    setActiveComponent(component);
    setIsMenuOpen(false); // Collapse the menu
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="bg-primary text-white p-2 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <button
            onClick={toggleMenu}
            className="md:hidden text-white text-2xl focus:outline-none mr-2"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
          <span className="text-xl font-semibold text-white">UrbanoAcceso</span>
        </div>
        <div className="flex items-center">
          <button
            onClick={handleLogout}
            className="bg-danger hover:bg-danger-dark text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out flex items-center"
          >
            <FaSignOutAlt className="mr-2" />
          </button>
        </div>
      </header>
      <div className="flex flex-1 flex-col md:flex-row">
        <nav className={`bg-background-alt w-full md:w-64 p-6 shadow-lg ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
          <ul className="space-y-4">
            <li>
              <Link
                href="/admin"
                className={`flex items-center py-2 px-4 rounded-lg transition duration-300 ease-in-out ${
                  activeComponent === "dashboard"
                    ? "bg-primary-light text-primary"
                    : "hover:bg-background-light"
                }`}
                onClick={() => handleMenuClick("dashboard")}
              >
                <FaChartBar className="mr-3" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/admin/users"
                className={`flex items-center py-2 px-4 rounded-lg transition duration-300 ease-in-out ${
                  activeComponent === "users"
                    ? "bg-primary-light text-primary"
                    : "hover:bg-background-light"
                }`}
                onClick={() => handleMenuClick("users")}
              >
                <FaUsers className="mr-3" />
                Users
              </Link>
            </li>
            <li>
              <Link
                href="/admin/settings"
                className={`flex items-center py-2 px-4 rounded-lg transition duration-300 ease-in-out ${
                  activeComponent === "settings"
                    ? "bg-primary-light text-primary"
                    : "hover:bg-background-light"
                }`}
                onClick={() => handleMenuClick("settings")}
              >
                <FaCog className="mr-3" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
        <main className="flex-1 p-8 bg-background-alt m-6 rounded-lg shadow-lg">
          <div className="bg-white p-6 rounded-lg shadow-md">{children}</div>
        </main>
      </div>
    </div>
  );
}
