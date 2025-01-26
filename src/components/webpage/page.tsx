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
               <p className="mt-4 text-lg">The School Dashboard platform is designed to support learning and effective school community management. This website serves as a hub for everything students, parents, and teachers need, such as the latest school news, activity calendars, academic records, and other valuable resources. Our goal is to create a central space that connects everyone in the community, fostering growth and promoting sustainable education.</p>
             </div>
            </section>

            <section className="py-12 bg-white">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <img src="public/page.png/who-we-are.jpg" alt="Who We Are" className="mx-auto mb-4 rounded-md shadow-md" />
            <h3 className="text-xl font-semibold">Who We Are</h3>
          </div>
          <div className="text-center">
            <img src="public/page.png/Academics.jpg" alt="Academics" className="mx-auto mb-4 rounded-md shadow-md" />
            <h3 className="text-xl font-semibold">Academics</h3>
          </div>
          <div className="text-center">
            <img src="public/page.png/Community.jpg" alt="Community" className="mx-auto mb-4 rounded-md shadow-md" />
            <h3 className="text-xl font-semibold">Community</h3>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-4">Who We Are</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">Welcome to the Community School Dashboard, a platform designed to bring our school community closer together! This website serves as a central hub for everything you need, including the latest news, important events, school calendars, and valuable resources for students, parents, and teachers. We are committed to fostering a learning environment that supports everyone in our community, empowering growth together in knowledge and virtue</p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 text-center">
          <blockquote className="text-lg italic text-gray-700 max-w-xl mx-auto">
            "The School Dashboard is a powerful platform designed to provide not only essential academic tools and resources but also to foster a sense of connection and growth within the school community. It equips students, parents, and teachers with the necessary tools to succeed academically while supporting the holistic development of individuals in an environment of collaboration and shared values."
          </blockquote>
          <p className="mt-4 text-gray-500">- Kaitoy , Codomo , Mamypoko | The strong woman behind the development of this server</p>
        </div>
      </section>

        </div>
    );
};