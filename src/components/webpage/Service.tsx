import { useState } from "react";

const slides = [
  { title: "Subjects", text: "Manage information on the subjects offered in the school, including the assignment of teachers for each subject." },
  { title: "Classes", text: "Manage classroom information" },
  { title: "Events", text: "Create and track school activities" },
  { title: "Announcements", text: "Create and manage announcements about important information or school news." }
];

export default function Service() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 2) % slides.length);
  };

  return (
    <div className="relative flex items-center bg-Bisque p-6 rounded-lg shadow-lg">
      <div className="w-1/2">
        <img src="Webpage/back to school.jpg" alt="Main visual" className="w-full h-auto rounded-lg shadow-md" />
      </div>

      <div className="w-1/2 relative p-6">
        <div className="relative overflow-hidden">
          <div
            className="flex space-x-4 transition-transform duration-500 ease-in-out" 
            style={{ transform: `translateX(-${(currentIndex * 100) / 3}%)` }} 
          >
            {slides.map((slide, index) => (
              <div key={index} className="w-[33.33%] min-w-[300px] h-[400px] p-12 bg-white rounded-lg shadow-md flex flex-col items-center">
                <h2 className="text-2xl font-semibold text-black text-center mb-4">{slide.title}</h2>
                <p className="text-lg text-gray-700 text-center">{slide.text}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
        >
          <img src="Webpage/arrow.png" alt="Next" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
