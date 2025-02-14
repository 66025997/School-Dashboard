"use client";

import { useReducer, useEffect, useState } from "react";

// Action types
const actionTypes = {
    SET_STUDENTS: "SET_STUDENTS",
    UPDATE_ATTENDANCE: "UPDATE_ATTENDANCE",
};

// Initial state
const initialState = {
    students: [],
    attendance: {},
};

// Reducer function
const attendanceReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_STUDENTS:
            return { ...state, students: action.payload };
        case actionTypes.UPDATE_ATTENDANCE:
            return {
                ...state,
                attendance: {
                    ...state.attendance,
                    [action.payload.studentId]: action.payload.status,
                },
            };
        default:
            return state;
    }
};

const AttendancePage = () => {
    const [state, dispatch] = useReducer(attendanceReducer, initialState);
    const [selectedClass, setSelectedClass] = useState(1);
    const [classes, setClasses] = useState([
        { id: 1, name: "Class 1" },
        { id: 2, name: "Class 2" },
    ]);

    // Function to fetch students by class
    const fetchStudents = async (classId) => {
        // Call API to fetch students (this example assumes API is ready)
        const response = await fetch(`/api/students?classId=${classId}`);
        const data = await response.json();
        dispatch({ type: actionTypes.SET_STUDENTS, payload: data });
    };

    // Fetch students on class change
    useEffect(() => {
        fetchStudents(selectedClass);
    }, [selectedClass]);

    // Handle attendance update
    const handleAttendanceChange = (studentId, status) => {
        dispatch({
            type: actionTypes.UPDATE_ATTENDANCE,
            payload: { studentId, status },
        });
    };

    // Submit attendance
    const handleSubmit = async () => {
        try {
            await fetch("/api/submit-attendance", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ attendance: state.attendance }),
            });
            alert("Attendance submitted successfully!");
        } catch (error) {
            alert("Error submitting attendance.");
        }
    };

    return (
        <div>
            <h1>Attendance for Class {selectedClass}</h1>

            {/* Dropdown for selecting class */}
            <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(Number(e.target.value))}
            >
                {classes.map((classItem) => (
                    <option key={classItem.id} value={classItem.id}>
                        {classItem.name}
                    </option>
                ))}
            </select>

            <table>
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {state.students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>
                                <select
                                    value={state.attendance[student.id] || ""}
                                    onChange={(e) =>
                                        handleAttendanceChange(student.id, e.target.value)
                                    }
                                >
                                    <option value="">Select</option>
                                    <option value="Present">Present</option>
                                    <option value="Absent">Absent</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={handleSubmit}>Submit Attendance</button>
        </div>
    );
};

export default AttendancePage;
