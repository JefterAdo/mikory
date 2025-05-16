"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-mikory-dark/95 backdrop-blur-sm fixed w-full z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">Mikory</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-300 hover:text-primary transition-colors"
            >
              Accueil
            </Link>
            <Link
              href="/about"
              className="text-gray-300 hover:text-primary transition-colors"
            >
              À propos
            </Link>
            <Link
              href="/services"
              className="text-gray-300 hover:text-primary transition-colors"
            >
              Services
            </Link>
            <Link
              href="/blog"
              className="text-gray-300 hover:text-primary transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/demarrer-un-projet"
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Démarrer un projet
            </Link>
          </div>

          {/* Mobile Navigation Button */}
          <button
            className="md:hidden text-gray-300 hover:text-primary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              href="/"
              className="block text-gray-300 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Accueil
            </Link>
            <Link
              href="/about"
              className="block text-gray-300 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              À propos
            </Link>
            <Link
              href="/services"
              className="block text-gray-300 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/blog"
              className="block text-gray-300 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/demarrer-un-projet"
              className="block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors text-center"
              onClick={() => setIsOpen(false)}
            >
              Démarrer un projet
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
