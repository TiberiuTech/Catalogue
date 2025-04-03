import { Course } from '../../types';

interface CourseListProps {
  courses: Course[];
  onManageCourse: (courseId: string) => void;
}

export function CourseList({ courses, onManageCourse }: CourseListProps) {
  if (courses.length === 0) {
    return (
      <div className="text-center p-8 border rounded-md">
        <p className="text-gray-500">No courses available</p>
      </div>
    );
  }
  
  return (
    <div className="mt-4">
      <ul className="divide-y divide-gray-200 border rounded-md overflow-hidden">
        {courses.map((course) => (
          <li key={course.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 text-blue-600 rounded-full w-10 h-10 flex items-center justify-center">
                  <span className="text-sm font-medium">{course.name.substring(0, 2).toUpperCase()}</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900">{course.name}</h3>
                  <p className="text-xs text-gray-500">
                    {course.students.length} student{course.students.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onManageCourse(course.id)}
                className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Manage
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
} 