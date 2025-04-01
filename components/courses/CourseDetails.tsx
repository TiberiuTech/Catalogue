import { useState, useEffect } from 'react';
import { ArrowLeft, Edit2, Save, UserPlus, X, Search } from 'lucide-react';
import type { Course } from '../../types';
import { useCoursesAndGrades } from '../../hooks/useCoursesAndGrades';

interface CourseDetailsProps {
  course: Course;
  onBack: () => void;
  onUpdate: (updatedCourse: Course) => void;
}

export function CourseDetails({ course, onBack, onUpdate }: CourseDetailsProps) {
  const { students: allStudents } = useCoursesAndGrades();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(course.name);
  const [students, setStudents] = useState<string[]>([...course.students]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showStudentDropdown, setShowStudentDropdown] = useState(false);

  const filteredStudents = allStudents.filter(
    (student) => 
      (student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       student.id.includes(searchTerm)) && 
      !students.includes(student.id)
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.student-search-container')) {
        setShowStudentDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSave = () => {
    if (name.trim()) {
      onUpdate({
        ...course,
        name,
        students
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setName(course.name);
    setStudents([...course.students]);
    setIsEditing(false);
    setSearchTerm('');
    setShowStudentDropdown(false);
  };

  const handleAddStudent = (studentId: string) => {
    if (studentId && !students.includes(studentId)) {
      setStudents([...students, studentId]);
      setSearchTerm('');
      setShowStudentDropdown(false);
    }
  };

  const handleRemoveStudent = (studentId: string) => {
    setStudents(students.filter(id => id !== studentId));
  };

  const getStudentName = (studentId: string) => {
    const student = allStudents.find(s => s.id === studentId);
    return student ? student.name : `Student ID: ${studentId}`;
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center mb-6">
        <button 
          onClick={onBack}
          className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
        <h2 className="text-xl font-semibold text-gray-800">Course Management</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="ml-auto p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Edit2 className="h-5 w-5 text-blue-600" />
          </button>
        ) : (
          <div className="ml-auto flex space-x-2">
            <button
              onClick={handleCancel}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-red-600" />
            </button>
            <button
              onClick={handleSave}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Save className="h-5 w-5 text-green-600" />
            </button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Name
          </label>
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          ) : (
            <div className="text-lg font-medium text-gray-900">{course.name}</div>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Enrolled Students
            </label>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {students.length}
            </span>
          </div>

          {isEditing && (
            <div className="mb-4 student-search-container relative">
              <div className="flex space-x-2">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search student by name or ID..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowStudentDropdown(true);
                    }}
                    onClick={() => setShowStudentDropdown(true)}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              {showStudentDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 max-h-60 overflow-auto">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <div
                        key={student.id}
                        className="px-4 py-2 hover:bg-blue-50 cursor-pointer flex justify-between items-center"
                        onClick={() => handleAddStudent(student.id)}
                      >
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-gray-500">ID: {student.id}</div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800">
                          <UserPlus className="h-4 w-4" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500">No students found</div>
                  )}
                </div>
              )}
            </div>
          )}

          <ul className="divide-y divide-gray-200 border border-gray-200 rounded-md overflow-hidden">
            {students.length > 0 ? (
              students.map((studentId) => (
                <li key={studentId} className="px-4 py-3 flex justify-between items-center">
                  <div>
                    <span className="font-medium">{getStudentName(studentId)}</span>
                    <span className="text-xs text-gray-500 ml-2">ID: {studentId}</span>
                  </div>
                  {isEditing && (
                    <button
                      onClick={() => handleRemoveStudent(studentId)}
                      className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 rounded-md p-1"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </li>
              ))
            ) : (
              <li className="px-4 py-3 text-gray-500 text-center">No students enrolled</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
} 