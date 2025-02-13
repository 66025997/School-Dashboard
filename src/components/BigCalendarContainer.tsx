"use client";

import { useEffect, useState } from "react";
import BigCalendar from "./BigCalender";

interface BigCalendarContainerProps {
    type: string;
    id: string;
}

const BigCalendarContainer = ({ type, id }: BigCalendarContainerProps) => {
    interface Subject {
        name: string;
        // Add other properties if needed
    }

    const [subjectsData, setSubjectsData] = useState<Subject[]>([]);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const res = await fetch(`/api/subjects?type=${type}&id=${id}`);
                const data = await res.json();
                setSubjectsData(data);
            } catch (error) {
                console.error("Error fetching subjects:", error);
            }
        };

        fetchSubjects();
    }, [type, id]);

    const data = subjectsData.map((subject, index) => ({
        title: subject.name,
        start: new Date(new Date().setHours(9 + index, 0, 0)),
        end: new Date(new Date().setHours(10 + index, 0, 0)),
    }));

    return (
        <div className="bg-white p-4 rounded-lg">
            <h1 className="text-lg font-semibold">
                {type === "teacherId" ? "Subjects Taught" : "Subjects in Class"}
            </h1>
            <BigCalendar data={data} />
        </div>
    );
};

export default BigCalendarContainer;
