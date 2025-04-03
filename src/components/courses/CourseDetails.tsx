import { useState } from 'react';
import { Course } from '../../types';
import { ArrowLeft } from 'lucide-react';
import { useCoursesAndGrades } from '../../hooks/useCoursesAndGrades';

interface CourseDetailsProps {
  course: Course;
  onBack: () => void;
  onUpdate: (course: Course) => void;
}

export function CourseDetails({ course, onBack, onUpdate }: CourseDetailsProps) {
  const { students, addStudent } = useCoursesAndGrades();
  
  const [availableStudents, setAvailableStudents] = useState(() => 
    students.filter(student => !course.students.includes(student.id))
  );
  
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState('');
  
  const courseStudents = students.filter(student => 
    course.students.includes(student.id)
  );
  
  const handleAddExistingStudent = () => {
    if (!selectedStudentId) return;
    
    const updatedCourse = {
      ...course,
      students: [...course.students, selectedStudentId]
    };
    
    onUpdate(updatedCourse);
    setSelectedStudentId('');
    setAvailableStudents(prev => prev.filter(student => student.id !== selectedStudentId));
  };
  
  const handleAddNewStudent = () => {
    if (!newStudentName.trim() || !newStudentEmail.trim()) return;
    
    const newStudent = addStudent(newStudentName, newStudentEmail);
    
    const updatedCourse = {
      ...course,
      students: [...course.students, newStudent.id]
    };
    
    onUpdate(updatedCourse);
    setNewStudentName('');
    setNewStudentEmail('');
  };
  
  const handleRemoveStudent = (studentId: string) => {
    const updatedCourse = {
      ...course,
      students: course.students.filter(id => id !== studentId)
    };
    
    onUpdate(updatedCourse);
    
    const removedStudent = students.find(student => student.id === studentId);
    if (removedStudent) {
      setAvailableStudents(prev => [...prev, removedStudent]);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <button 
          onClick={onBack}
          className="mr-3 inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </button>
        <h2 className="text-xl font-bold">{course.name}</h2>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Students enrolled</h3>
        
        {courseStudents.length === 0 ? (
          <p className="text-gray-500 italic">No students enrolled yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200 border rounded-md">
            {courseStudents.map(student => (
              <li key={student.id} className="flex justify-between items-center p-3">
                <div>
                  <p className="font-medium">{student.name}</p>
                  <p className="text-sm text-gray-500">{student.email}</p>
                </div>
                <button
                  onClick={() => handleRemoveStudent(student.id)}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableStudents.length > 0 && (
          <div className="border rounded-md p-4">
            <h3 className="text-md font-medium mb-3">Add existing student</h3>
            <div className="flex space-x-2">
              <select
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              >
                <option value="">Select a student</option>
                {availableStudents.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleAddExistingStudent}
                disabled={!selectedStudentId}
                className="inline-flex px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                Add
              </button>
            </div>
          </div>
        )}
        
        <div className="border rounded-md p-4">
          <h3 className="text-md font-medium mb-3">Add new student</h3>
          <div className="space-y-3">
            <input
              type="text"
              value={newStudentName}
              onChange={(e) => setNewStudentName(e.target.value)}
              placeholder="Student name"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
            <input
              type="email"
              value={newStudentEmail}
              onChange={(e) => setNewStudentEmail(e.target.value)}
              placeholder="Student email"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
            <button
              onClick={handleAddNewStudent}
              disabled={!newStudentName.trim() || !newStudentEmail.trim()}
              className="w-full inline-flex justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              Add New Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 