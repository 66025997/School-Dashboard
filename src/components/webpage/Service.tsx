import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const slides = [
  { title: "Subjects", text: "Manage information on the subjects offered in the school, including the assignment of teachers for each subject." },
  { title: "Classes", text: "Manage classroom information." },
  { title: "Lessons", text: "Manage the lessons or content that teachers want students to study." },
  { title: "Exams", text: "Manage exam information such as exam schedules and results." },
  { title: "Assignments", text: "For teachers to create and track assignments to students." },
  { title: "Events", text: "Create and track school activities." },
  { title: "Announcements", text: "Create and manage announcements about important information or school news." }
];

export default function Service() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 2.3;
  const totalSlides = slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 3000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const handleClick = (direction: string) => {
    if (direction === "left") {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalSlides - 1 : prevIndex - 1));
    } else {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }
  };

  return (
    <div className="relative flex items-center bg-gradient-to-r from-blue-400 to-indigo-500 p-10 rounded-lg shadow-xl text-white">
      <div className="w-1/2">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
          <Image 
            src="/Webpage/backtoschool.jpg" 
            alt="Main visual" 
            width={500} 
            height={300} 
            className="w-full h-auto rounded-lg shadow-lg" 
          />
        </motion.div>
      </div>

      <div className="w-1/2 relative px-6">
        <div className="relative overflow-hidden w-full">
          <motion.div
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${(currentIndex / totalSlides) * 100}%)`,
              width: `calc(${cardsPerView * 100}% + ${cardsPerView * 1 * 16}px)`
            }}
          >
            {slides.map((slide, index) => (
              <motion.div
                key={index}
                className="w-full min-w-[320px] h-[400px] p-6 bg-white text-black rounded-lg shadow-md flex flex-col items-center text-center cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleClick(index < currentIndex ? "left" : "right")}
              >
                <h2 className="text-2xl font-bold mb-4">{slide.title}</h2>
                <p className="text-lg text-gray-700">{slide.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}