import React from "react";

type Props = {};

const Webpage: React.FC<Props> = () => {
    return (
        <div className="bg-gray-100">
            <header className="bg-whit shadow">
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

            <section className="relative bg-center h-[500px]" style={{ backgroundImage:"url('public/page.png/hero-placeholder.jpg')" }} >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="relative container mx-auto px-6 py-20 text-center text-white">
               <h2 className="text-4xl font-bold">Faith, Community, and Excellence</h2>
               <p className="mt-4 text-lg">Education in an environment of faith and virtue for Pre-K through 8th grade.</p>
             </div>
            </section>
        </div>
    );
};