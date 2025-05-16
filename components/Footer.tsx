"use client";
import React from "react";
import Link from "next/link";
import { FaPhone, FaEnvelope, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-mikory-dark border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <FaPhone className="text-primary" />
                <div>
                  <p className="text-gray-300">+225 05 85 81 47 47</p>
                  <p className="text-gray-300">+225 05 46 90 96 42</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-primary" />
                <a
                  href="mailto:info@mikory.digital"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  info@mikory.digital
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FaGlobe className="text-primary" />
                <a
                  href="https://www.mikory.digital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  www.mikory.digital
                </a>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">Adresse</h3>
            <div className="flex items-start space-x-3">
              <FaMapMarkerAlt className="text-primary mt-1" />
              <p className="text-gray-300">
                ABIDJAN-COCODY ANGRE CHATEAU
                <br />
                17 BP 581 ABIDJAN 17
              </p>
            </div>
          </div>

          {/* Legal Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">
              Informations Légales
            </h3>
            <p className="text-gray-300">
              MIKORY Société à Responsabilité Limitée
              <br />
              Capital : 5 000 000 Fcfa
              <br />
              R.C.C.M : CI-ABJ-03-2022-B12-03128
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} MIKORY. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
