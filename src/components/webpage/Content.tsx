import React from "react";
import Service from "@/components/webpage/Service";
import Image from "next/image";

type Props = {};

const Webpage: React.FC<Props> = () => {
  return (
    <div className="bg-gray-100">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-400 to-indigo-500 shadow-lg py-4">
        <div className="container mx-auto flex justify-between items-center px-6">
          <div className="flex items-center">
            <Image src="/logo.png" alt="School Dashboard Logo" width={50} height={50} className="h-12 w-12" />
            <h1 className="ml-4 text-2xl font-bold text-white">School Dashboard</h1>
          </div>
          <nav>
            <ul className="flex space-x-6 text-white font-medium">
              <li><a href="#" className="hover:text-gray-200">Dashboard</a></li>
              <li><a href="#resources" className="hover:text-gray-200">Resources</a></li>
              <li><a href="#contact" className="hover:text-gray-200">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[500px] flex items-center justify-center text-center text-white" style={{ backgroundImage: "url('/Webpage/hero-placeholder.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative px-6">
          <h2 className="text-5xl font-bold">Empowering Education</h2>
          <p className="mt-4 text-lg">Connecting the school community through knowledge, collaboration, and growth.</p>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {["Academics", "Community", "Support"].map((item, index) => (
            <div key={index} className="text-center bg-white rounded-lg shadow-md p-6">
              <Image src={`/Webpage/${item}.jpg`} alt={item} width={300} height={200} className="mx-auto mb-4 rounded-lg shadow-md" />
              <h3 className="text-xl font-semibold">{item}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 bg-blue-200">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-4">About the Dashboard</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">The School Dashboard is designed to provide essential tools and resources, connecting students, parents, and teachers in a collaborative environment.</p>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-12 bg-blue-100">
        <div className="container mx-auto px-6 text-center">
          <blockquote className="text-lg italic text-gray-700 max-w-xl mx-auto">
            &quot;The School Dashboard is a powerful platform designed to provide not only essential academic tools and resources but also to foster a sense of connection and growth within the school community. It equips students, parents, and teachers with the necessary tools to succeed academically while supporting the holistic development of individuals in an environment of collaboration and shared values.&quot;
          </blockquote>
          <p className="mt-4 text-gray-500">- Kaitoy , Codomo , Mamypoko | The strong woman behind the development of this server</p>
        </div>
      </section>

      {/* Service Component */}
      <Service />

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; School Dashboard 2025. All Rights Reserved.</p>
          <ul className="flex space-x-6 text-sm">
            <li><a href="#" className="hover:text-gray-400">Dashboard Info</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Webpage;