import React, { useState } from 'react';

interface CourseFormProps {
  onSubmit: (name: string) => void;
}

export function CourseForm({ onSubmit }: CourseFormProps) {
  const [courseName, setCourseName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!courseName.trim()) {
      setError('Course name is required');
      return;
    }
    
    onSubmit(courseName);
    setCourseName('');
    setError(null);
  };

  return (
    <div className="bg-white shadow-sm rounded-md border p-4">
      <h2 className="text-lg font-medium mb-3">Add New Course</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-3">
          <div className="flex-grow">
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter course name"
            />
          </div>
          <div>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Course
            </button>
          </div>
        </div>
      </form>
    </div>
  );
} 