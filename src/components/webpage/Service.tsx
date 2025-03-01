import { useState } from "react";

const slides = [
  { title: "Subjects", text: "Manage information on the subjects offered in the school, including the assignment of teachers for each subject." },
  { title: "Classes", text: "Manage classroom information." },
  { title: "Lessons", text: "Manage the lessons or content that teachers want students to study." },
  { title: "Exames", text: "Manage exam information such as exam schedules, Results." },
  { title: "Assignments", text: "For teachers to create and track assignments to students." },
  { title: "Events", text: "Create and track school activities." },
  { title: "Announcements", text: "Create and manage announcements about important information or school news." }
];

export default function Service() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 2.3;
  const totalSlides = slides.length;

  const nextSlide = () => {
    if (currentIndex + cardsPerView < totalSlides) {
      setCurrentIndex((prevIndex) => prevIndex + cardsPerView);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => Math.max(prevIndex - cardsPerView, 0));
    }
  };

  return (
    <div className="relative flex items-center bg-blue-100 p-6 rounded-lg shadow-lg">
      <div className="w-1/2">
        <img src="Webpage/back to school.jpg" alt="Main visual" className="w-full h-auto rounded-lg shadow-md" />
      </div>

      <div className="w-1/2 relative p-6">
        <div className="relative overflow-hidden w-full">
          <div
            className="flex gap-4 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${(currentIndex / totalSlides) * 100}%)`,
              width: `calc(${cardsPerView * 100}% + ${cardsPerView * 1 * 16}px)` // ใช้ width ของการ์ดและช่องว่างระหว่างการ์ด
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="w-full min-w-[300px] h-[400px] p-6 bg-white rounded-lg shadow-md flex flex-col items-center"
              >
                <h2 className="text-2xl font-semibold text-black text-center mb-4">{slide.title}</h2>
                <p className="text-lg text-gray-700 text-center">{slide.text}</p>
              </div>
            ))}
          </div>
        </div>

        {currentIndex > 0 && (
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
          >
            <img
              src="Webpage/arrow.png"
              alt="Previous"
              className="w-6 h-6 transform rotate-180" // หมุน 180 องศา
            />
          </button>
        )}

        {currentIndex + cardsPerView < totalSlides && (
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
          >
            <img src="Webpage/arrow.png" alt="Next" className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
}
