"use client";

import React, { useState } from "react";
import Image from 'next/image';
import Link from "next/link";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-background shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Image
              src="/UrbanoAcceso.svg"
              alt="Logo"
              className="h-10 w-auto mr-2"
              width={100}
              height={100}
            />
            <span className="text-xl font-semibold text-text">
              <Link href="/">UrbanoAcceso</Link>
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-text-light hover:text-primary hover:underline transition-default">
              Inicio
            </Link>
            <Link href="/about" className="text-text-light hover:text-primary hover:underline transition-default">
              Sobre Nosotros
            </Link>
            <Link href="/prices" className="text-text-light hover:text-primary hover:underline transition-default">
              Precios
            </Link>
            <Link href="/contact" className="text-text-light hover:text-primary hover:underline transition-default">
              Contacto
            </Link>
            <Link
              href="/login"
              className="btn-primary hover:bg-primary-dark"
            >
              Iniciar Sesión
            </Link>            
          </div>
          <div className="md:hidden flex items-center">
            <button className="mobile-menu-button text-text" onClick={toggleMenu}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`mobile-menu md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <Link href="/" className="block py-2 px-4 text-sm text-text-light hover:bg-primary hover:text-white transition-default">
          Inicio
        </Link>
        <Link href="/about" className="block py-2 px-4 text-sm text-text-light hover:bg-primary hover:text-white transition-default">
          Sobre Nosotros
        </Link>
        <Link href="/prices" className="block py-2 px-4 text-sm text-text-light hover:bg-primary hover:text-white transition-default">
          Precios
        </Link>
        <Link
          href="/contact"
          className="block py-2 px-4 text-sm text-text-light hover:bg-primary hover:text-white transition-default"
        >
          Contacto
        </Link>
        <Link href="/login" className="block py-2 px-4 text-sm text-text-light hover:bg-primary hover:text-white transition-default">
          Iniciar Sesión
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
