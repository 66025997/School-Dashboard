import { useState } from "react";

const slides = [
  { title: "Subjects", text: "Some description for slide 1" },
  { title: "Classes", text: "Some description for slide 2." },
  { title: "Lessons", text: "Some description for slide 3." },
  { title: "Exams", text: "Some description for slide 4." },
  { title: "Assignments", text: "Some description for slide 5." },
  { title: "Results", text: "Some description for slide 5." },
  { title: "Events", text: "Some description for slide 5." },
  { title: "Announcements", text: "Some description for slide 6." }
];

export default function Service() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length); 
  };

  return (
    <div className="relative flex items-center bg-Bisque p-6 rounded-lg shadow-lg">
      <div className="w-1/2">
        <img src="Webpage/Academics.jpg" alt="Main visual" className="w-full h-auto rounded-lg shadow-md" />
      </div>

      <div className="w-1/2 relative p-6">
        <div className="relative overflow-hidden">
          <div
            className="flex space-x-4 transition-transform duration-500 ease-in-out" 
            style={{ transform: `translateX(-${(currentIndex * 100) / 3}%)` }} 
          >
            {slides.map((slide, index) => (
              <div key={index} className="w-[33.33%] min-w-[300px] h-[400px] p-6 bg-white rounded-lg shadow-md flex flex-col justify-center items-center">
                <h2 className="text-2xl font-semibold text-black text-center">{slide.title}</h2>
                <p className="text-lg text-gray-700 text-center mt-4">{slide.text}</p>
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
