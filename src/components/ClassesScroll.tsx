"use client";

import { useState } from "react";

const ClassCard = ({
  name,
  studentCount,
  boys,
  girls,
  capacity = 1,
}: {
  name: string;
  studentCount: number;
  boys: number;
  girls: number;
  capacity?: number;
}) => {
  const percentage = capacity > 0 ? Math.min(Math.round((studentCount / capacity) * 100), 100) : 0;
  const isOverCapacity = studentCount > capacity;

  return (
    <div className="bg-white p-8 rounded-2xl flex flex-col items-center shadow-md w-full max-w-2xl h-[310px]">
      <div className="bg-blue-200 p-3 rounded-full w-24 h-24 flex items-center justify-center shadow-md">
        <span className="text-blue-700 text-2xl font-bold">{name}</span>
      </div>

      <p className="text-gray-500 text-lg mt-4">👥 {studentCount} Students</p>

      <div className="w-full mt-4 px-6">
        <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
          <span>Capacity: {studentCount}/{capacity}</span>
          <span>{isOverCapacity ? "Over Capacity" : `${percentage}%`}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-5">
          <div
            className={`h-5 rounded-full ${isOverCapacity ? "bg-red-500" : "bg-blue-500"}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      <div className="flex gap-12 mt-5">
        <p className="text-blue-500 font-semibold text-sm">👦 {boys} Boys</p>
        <p className="text-pink-400 font-semibold text-sm">👧 {girls} Girls</p>
      </div>
    </div>
  );
};

const ClassesScroll = ({
  data,
  classes,
  selectedClass,
  onClassChange,
}: {
  data: { name: string; studentCount: number; boys: number; girls: number; capacity: number }[];
  classes: string[];
  selectedClass: string;
  onClassChange: (className: string) => void;
}) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-6xl mx-auto border border-gray-300">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold text-gray-900">Class List</h2>
        <select
          value={selectedClass}
          onChange={(e) => onClassChange(e.target.value)}
          className="p-3 border border-gray-400 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 bg-gray-100"
        >
          {classes.map((className) => (
            <option key={className} value={className}>
              {className}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 place-items-center gap-8 p-4 w-full">
          {data.map((cls) => (
            <ClassCard
              key={cls.name}
              name={cls.name}
              studentCount={cls.studentCount}
              boys={cls.boys}
              girls={cls.girls}
              capacity={cls.capacity}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassesScroll;
