import { useState } from 'react';
import { GradesTable } from '../grades/GradesTable';
import { CourseList } from '../courses/CourseList';
import { CourseForm } from '../courses/CourseForm';
import { CourseDetails } from '../courses/CourseDetails';
import { GradeForm } from '../grades/GradeForm';
import { Layout } from '../layout/Layout';
import { Book, GraduationCap } from 'lucide-react';
import { useCoursesAndGrades } from '../../hooks/useCoursesAndGrades';

export function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState<'grades' | 'courses'>('grades');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  
  const { 
    courses, 
    grades, 
    loading, 
    addCourse, 
    updateCourse, 
    addGrade, 
    updateGrade,
    deleteGrade 
  } = useCoursesAndGrades();

  const handleManageCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
  };

  const selectedCourse = selectedCourseId 
    ? courses.find(course => course.id === selectedCourseId)
    : null;

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white rounded-lg shadow">
        {selectedCourse ? (
          <CourseDetails 
            course={selectedCourse} 
            onBack={() => setSelectedCourseId(null)}
            onUpdate={updateCourse}
          />
        ) : (
          <>
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('grades')}
                  className={`${
                    activeTab === 'grades'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm flex items-center justify-center`}
                >
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Grades
                </button>
                <button
                  onClick={() => setActiveTab('courses')}
                  className={`${
                    activeTab === 'courses'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm flex items-center justify-center`}
                >
                  <Book className="w-5 h-5 mr-2" />
                  Courses
                </button>
              </nav>
            </div>

            <div className="p-4">
              {activeTab === 'grades' ? (
                <>
                  <GradeForm courses={courses} onSubmit={addGrade} />
                  <GradesTable 
                    grades={grades} 
                    onGradeUpdate={updateGrade}
                    onGradeDelete={deleteGrade}
                  />
                </>
              ) : (
                <>
                  <CourseForm onSubmit={addCourse} />
                  <CourseList courses={courses} onManageCourse={handleManageCourse} />
                </>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}