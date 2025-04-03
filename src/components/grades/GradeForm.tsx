import React, { useState } from 'react';
import { Course } from '../../types';
import { useCoursesAndGrades } from '../../hooks/useCoursesAndGrades';

interface GradeFormProps {
  courses: Course[];
  onSubmit: (studentId: string, courseId: string, value: number) => void;
}

export function GradeForm({ courses, onSubmit }: GradeFormProps) {
  const { students } = useCoursesAndGrades();
  
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [gradeValue, setGradeValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedStudent) {
      setError('Please select a student');
      return;
    }
    
    if (!selectedCourse) {
      setError('Please select a course');
      return;
    }
    
    const gradeNum = parseInt(gradeValue, 10);
    if (isNaN(gradeNum) || gradeNum < 0 || gradeNum > 100) {
      setError('Grade must be a number between 0 and 100');
      return;
    }
    
    onSubmit(selectedStudent, selectedCourse, gradeNum);
    
    setSelectedStudent('');
    setSelectedCourse('');
    setGradeValue('');
    setError(null);
  };

  return (
    <div className="bg-white shadow-sm border rounded-md p-4 mb-4">
      <h2 className="text-lg font-medium mb-3">Add New Grade</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Student
            </label>
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            >
              <option value="">Select a student</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course
            </label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Grade
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={gradeValue}
              onChange={(e) => setGradeValue(e.target.value)}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter grade (0-100)"
            />
          </div>
          
          <div className="flex items-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full h-10"
            >
              Add Grade
            </button>
          </div>
        </div>
      </form>
    </div>
  );
} 