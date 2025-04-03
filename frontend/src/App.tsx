import './App.css';
import OfficeMapCanvas from "./Map";

export default function App() {
    return (
        <div>
            <div className="min-h-screen bg-gray-100">
                <nav className="bg-blue-600 text-white p-4 shadow-md">
                    <div className="container mx-auto flex justify-between items-center">
                        <span className="text-xl font-bold">Berufsfachschule Baden</span>
                        <ul className="flex space-x-6">
                            <li>
                                <a href="" className="hover:underline">BBB</a>
                            </li>
                            <li>
                                <a href="" className="hover:underline">Intranet</a>
                            </li>
                            <li>
                                <a href="" className="hover:underline">Arbeitsplätze</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <OfficeMapCanvas/>
        </div>
            );
};