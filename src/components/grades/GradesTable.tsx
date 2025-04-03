import React from 'react';
import type { Grade } from '../../types';
import { useCoursesAndGrades } from '../../hooks/useCoursesAndGrades';

interface GradesTableProps {
  grades: Grade[];
  onGradeUpdate: (id: string, value: number) => void;
  onGradeDelete: (id: string) => void;
}

export function GradesTable({ grades, onGradeUpdate, onGradeDelete }: GradesTableProps) {
  const { courses, students } = useCoursesAndGrades();
  
  const [editableGradeId, setEditableGradeId] = React.useState<string | null>(null);
  const [editedValue, setEditedValue] = React.useState<string>('');
  
  const handleEditClick = (grade: Grade) => {
    setEditableGradeId(grade.id);
    setEditedValue(grade.value.toString());
  };
  
  const handleSaveClick = (gradeId: string) => {
    const newValue = parseInt(editedValue, 10);
    
    if (!isNaN(newValue) && newValue >= 0 && newValue <= 100) {
      onGradeUpdate(gradeId, newValue);
      setEditableGradeId(null);
    }
  };

  const getStudentName = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    return student ? student.name : 'Unknown Student';
  };

  const getCourseName = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    return course ? course.name : 'Unknown Course';
  };

  if (grades.length === 0) {
    return (
      <div className="text-center p-4 border rounded mt-4">
        <p className="text-gray-500">No grades available.</p>
      </div>
    );
  }

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {grades.map((grade) => (
            <tr key={grade.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{getStudentName(grade.studentId)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{getCourseName(grade.courseId)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {editableGradeId === grade.id ? (
                  <input 
                    type="number" 
                    className="border rounded px-2 py-1 w-16"
                    value={editedValue}
                    onChange={(e) => setEditedValue(e.target.value)}
                    min="0"
                    max="100"
                  />
                ) : (
                  <span className={`px-2 py-1 rounded ${grade.value >= 90 ? 'bg-green-100 text-green-800' : grade.value >= 70 ? 'bg-blue-100 text-blue-800' : grade.value >= 50 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                    {grade.value}
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{grade.updatedAt}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {editableGradeId === grade.id ? (
                  <button 
                    onClick={() => handleSaveClick(grade.id)} 
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Save
                  </button>
                ) : (
                  <button 
                    onClick={() => handleEditClick(grade)} 
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Edit
                  </button>
                )}
                <button 
                  onClick={() => onGradeDelete(grade.id)} 
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 