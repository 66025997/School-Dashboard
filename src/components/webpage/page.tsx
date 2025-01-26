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
                </div>
            </header>
        </div>
    )
}