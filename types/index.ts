export interface User {
  id: string;
  email: string;
  role: 'teacher' | 'student';
  name: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
}

export interface Grade {
  id: string;
  studentId: string;
  courseId: string;
  value: number;
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: string;
  name: string;
  teacherId: string;
  students: string[];
}