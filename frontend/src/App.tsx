import "./App.css";
import OfficeMapCanvas from "./components/Map";
import React from "react";
import ViewMap from "./components/ViewMap";

const adminPW = "test";

export default function App() {
  return (
    <nav className="bg-gray-100 shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-3xl font-bold text-black">
          BBB Berufsfachschule
        </div>
        <ul className="hidden md:flex space-x-6">
          <li className="hover:text-red-500 cursor-pointer">Schulbetrieb</li>
          <li className="hover:text-red-500 cursor-pointer">Berufe</li>
          <li className="hover:text-red-500 cursor-pointer">Berufsmaturität</li>
          <li className="hover:text-red-500 cursor-pointer">Über uns</li>
          <li className="hover:text-red-500 cursor-pointer">Raumvermietung</li>
        </ul>
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
          Quicklinks
        </button>
      </div>
      <Overview />
      {adminPW == "test" ? <OfficeMapCanvas /> : <ViewMap />}
    </nav>
  );
}

const Overview: React.FC = () => {
  return (
    <div className="container mx-auto mt-10 grid md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-xl font-bold">Schuljahresstart</h2>
        <ul className="mt-2 space-y-2">
          <li className="text-red-500 cursor-pointer">
            Schulbetrieb Übersicht
          </li>
          <li className="text-red-500 cursor-pointer">Anmeldung</li>
          <li className="text-red-500 cursor-pointer">
            Informationen zum Lehrbeginn
          </li>
          <li className="text-red-500 cursor-pointer">Notebookanforderung</li>
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-bold">Dienstleistungen</h2>
        <ul className="mt-2 space-y-2">
          <li className="text-red-500 cursor-pointer">
            Beratung für BBB-Lernende
          </li>
          <li className="text-red-500 cursor-pointer">Zentrale Dienste</li>
          <li className="text-red-500 cursor-pointer">Mindspace</li>
          <li className="text-red-500 cursor-pointer">Restaurant</li>
        </ul>
      </div>
    </div>
  );
};
