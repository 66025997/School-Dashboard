import React from "react";

type Props = {};

const Webpage: React.FC<Props> = () => {
    return (
        <div className="bg-gray-100">
            <header className="bg-white shadow">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <img src="public/logo.png" alt="School-Dashboard logo" className="h-12" />
                        <h1 className="ml-4 text-2xl font-bold text-gray-800">SCHOOL DASHBOARD</h1>
                    </div> 
                    <div>
                        <ul className="flex space-x-4 text-gray-600">
                            <li><a href="#" className="hover:text-blue-600">Calendar</a></li>
                            <li><a href="#" className="hover:text-biue-600">Power School</a></li>
                            <li><a href="#" className="hover:text-biue-600">Email Login</a></li>
                        </ul>
                    </div>
                </div>
            </header>
        </div>
    );
};