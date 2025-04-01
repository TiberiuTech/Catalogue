import { Users } from 'lucide-react';
import type { Course } from '../../types';

interface CourseListProps {
  courses: Course[];
  onManageCourse: (courseId: string) => void;
}

export function CourseList({ courses, onManageCourse }: CourseListProps) {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <div key={course.id} className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Course Name
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {course.name}
                  </dd>
                </dl>
              </div>
            </div>
            <div className="mt-5">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div>Students enrolled</div>
                <div>{course.students.length}</div>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => onManageCourse(course.id)}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Manage Course
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}