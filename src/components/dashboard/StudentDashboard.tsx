import { Layout } from '../layout/Layout';
import { format } from 'date-fns';
import { Trophy } from 'lucide-react';
import type { Grade } from '../../types';

const mockGrades: Grade[] = [
  { id: '1', studentId: '1', courseId: '1', value: 85, createdAt: '2024-03-10', updatedAt: '2024-03-10' },
  { id: '2', studentId: '1', courseId: '2', value: 92, createdAt: '2024-03-10', updatedAt: '2024-03-10' },
];

const mockCourses: Record<string, string> = {
  '1': 'Mathematics',
  '2': 'Physics',
};

export function StudentDashboard() {
  const averageGrade = mockGrades.reduce((acc, grade) => acc + grade.value, 0) / mockGrades.length;

  return (
    <Layout>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Trophy className="h-8 w-8 text-yellow-400" />
            <h3 className="ml-3 text-xl font-medium text-gray-900">Average Grade</h3>
          </div>
          <p className="mt-4 text-4xl font-bold text-gray-900">{averageGrade.toFixed(1)}</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Your Grades</h3>
        </div>
        <div className="border-t border-gray-200">
          <ul role="list" className="divide-y divide-gray-200">
            {mockGrades.map((grade) => (
              <li key={grade.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-900">{mockCourses[grade.courseId]}</div>
                  <div className="flex items-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-sm font-medium ${
                      grade.value >= 90 ? 'bg-green-100 text-green-800' :
                      grade.value >= 80 ? 'bg-blue-100 text-blue-800' :
                      grade.value >= 70 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {grade.value}
                    </span>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="text-sm text-gray-500">
                    Last updated: {format(new Date(grade.updatedAt), 'MMM d, yyyy')}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}