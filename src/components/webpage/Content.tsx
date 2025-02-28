import React from "react";

import Service from "@/components/webpage/Service"
type Props = {};

const Webpage: React.FC<Props> = () => {
  return (
    <div className="bg-gray-100">
      {/* Header Section */}
      <header className="bg-blue-400 shadow">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="logo.png" alt="School Dashboard Logo" className="h-12" />
            <h1 className="ml-4 text-2xl font-bold text-gray-800">School Dashboard</h1>
          </div>
          <div>
            <ul className="flex space-x-4 text-gray-600">
              <li><a href="#" className="hover:text-white">Dashboard</a></li>
              <li><a href="#resources" className="hover:text-white">Resources</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>
      </header>

      <section className="relative bg-cover bg-center h-[500px]" style={{ backgroundImage: "url('Webpage/hero-placeholder.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative container mx-auto px-6 py-20 text-center text-white">
          <h2 className="text-4xl font-bold">Empowering Education</h2>
          <p className="mt-4 text-lg">Connecting the school community through knowledge, collaboration, and growth.</p>
        </div>
      </section>

      <section id="resources" className="py-12 bg-blue-100">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <img src="Webpage/Academics.jpg" alt="Academics" className="mx-auto mb-4 rounded-md shadow-md" />
            <h3 className="text-xl font-semibold">Academics</h3>
          </div>
          <div className="text-center">
            <img src="Webpage/Community.jpg" alt="Community" className="mx-auto mb-4 rounded-md shadow-md" />
            <h3 className="text-xl font-semibold">Community</h3>
          </div>
          <div className="text-center">
            <img src="Webpage/Support.jpg" alt="Support" className="mx-auto mb-4 rounded-md shadow-md" />
            <h3 className="text-xl font-semibold">Support</h3>
          </div>
        </div>
      </section>

      <section className="py-12 bg-blue-200">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-4">About the Dashboard</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">The School Dashboard is designed to provide essential tools and resources, connecting students, parents, and teachers in a collaborative environment.</p>
        </div>
      </section>

      <section className="py-12 bg-blue-100">
        <div className="container mx-auto px-6 text-center">
          <blockquote className="text-lg italic text-gray-700 max-w-xl mx-auto">
            "The School Dashboard is a powerful platform designed to provide not only essential academic tools and resources but also to foster a sense of connection and growth within the school community. It equips students, parents, and teachers with the necessary tools to succeed academically while supporting the holistic development of individuals in an environment of collaboration and shared values."
          </blockquote>
          <p className="mt-4 text-gray-500">- Kaitoy , Codomo , Mamypoko | The strong woman behind the development of this server</p>
        </div>
      </section>

      <section className="py-12 bg-blue-300">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-bold text-center mb-6">News and Updates</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 shadow-md rounded-md">
              <h4 className="font-semibold">New Online Resources Available</h4>
              <p className="text-sm text-gray-500">January 15, 2025</p>
            </div>
            <div className="bg-white p-4 shadow-md rounded-md">
              <h4 className="font-semibold">Parent-Teacher Conference Schedule</h4>
              <p className="text-sm text-gray-500">February 10, 2025</p>
            </div>
            <div className="bg-white p-4 shadow-md rounded-md">
              <h4 className="font-semibold">Annual School Community Day</h4>
              <p className="text-sm text-gray-500">March 5, 2025</p>
            </div>
          </div>
        </div>
      </section>

      <Service />

      <footer id="contact" className="bg-blue-950 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <p className="text-sm">&copy; School Dashboard 2025. All Rights Reserved.</p>
            <ul className="flex space-x-4 text-sm">
              <li><a href="#" className="hover:text-gray-400">Dashboard Info</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Webpage;