import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Course } from '../../types';

interface GradeFormProps {
  courses: Course[];
  onSubmit: (studentId: string, courseId: string, value: number) => void;
}

export function GradeForm({ courses, onSubmit }: GradeFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [value, setValue] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentId && courseId && value >= 0 && value <= 100) {
      onSubmit(studentId, courseId, value);
      setStudentId('');
      setCourseId('');
      setValue(0);
      setIsOpen(false);
    }
  };

  return (
    <div className="mb-6">
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Grade
        </button>
      ) : (
        <div className="bg-white p-4 rounded-md shadow-md">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Grade</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1">
                  ID Student
                </label>
                <input
                  type="text"
                  id="studentId"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="ex: 1, 2, etc."
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="courseId" className="block text-sm font-medium text-gray-700 mb-1">
                  Course
                </label>
                <select
                  id="courseId"
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  required
                >
                  <option value="">Selectează un curs</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-1">
                  Grade (0-100)
                </label>
                <input
                  type="number"
                  id="value"
                  min="0"
                  max="100"
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
} 