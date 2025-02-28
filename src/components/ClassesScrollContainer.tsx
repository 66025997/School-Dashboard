"use client";

import { useState, useEffect } from "react";
import ClassesScroll from "./ClassesScroll";

const ClassesScrollContainer = () => {
  const [classData, setClassData] = useState<
    { id: number; name: string; studentCount: number; boys: number; girls: number; capacity: number }[]
  >([]);
  const [classNames, setClassNames] = useState<string[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>("");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch("/api/classes");
        const data = await res.json();

        console.log("Fetched Classes:", data);

        if (!data.classes || data.classes.length === 0) {
          console.error("No classes found.");
          return;
        }

        setClassData(data.classes);
        setClassNames(data.classes.map((cls: any) => cls.name));
        setSelectedClass(data.classes[0]?.name || "");
      } catch (error) {
        console.error("Error fetching class data:", error);
      }
    };

    fetchClasses();
  }, []);

  const filteredClassData = classData.filter((cls) => cls.name === selectedClass);

  return (
    <ClassesScroll
      data={filteredClassData}
      classes={classNames}
      selectedClass={selectedClass}
      onClassChange={setSelectedClass}
    />
  );
};

export default ClassesScrollContainer;
