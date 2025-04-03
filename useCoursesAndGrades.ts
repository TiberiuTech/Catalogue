import { useState, useEffect } from 'react';
import type { Course, Grade, Student } from '../types';

const COURSES_STORAGE_KEY = 'grade_manager_courses';
const GRADES_STORAGE_KEY = 'grade_manager_grades';
const STUDENTS_STORAGE_KEY = 'grade_manager_students';

const initialCourses: Course[] = [
  { id: '1', name: 'Mathematics', teacherId: '1', students: ['1', '2'] },
  { id: '2', name: 'Physics', teacherId: '1', students: ['1', '3'] },
];

const initialGrades: Grade[] = [
  { id: '1', studentId: '1', courseId: '1', value: 85, createdAt: '2024-03-10', updatedAt: '2024-03-10' },
  { id: '2', studentId: '2', courseId: '1', value: 92, createdAt: '2024-03-10', updatedAt: '2024-03-10' },
];

const initialStudents: Student[] = [
  { id: '1', name: 'Ana Popescu', email: 'ana.popescu@example.com' },
  { id: '2', name: 'Ion Ionescu', email: 'ion.ionescu@example.com' },
  { id: '3', name: 'Maria Marinescu', email: 'maria.marinescu@example.com' },
  { id: '4', name: 'Mihai Georgescu', email: 'mihai.georgescu@example.com' },
  { id: '5', name: 'Elena Vasilescu', email: 'elena.vasilescu@example.com' },
];

export function useCoursesAndGrades() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedCourses = localStorage.getItem(COURSES_STORAGE_KEY);
    if (storedCourses) {
      try {
        setCourses(JSON.parse(storedCourses));
      } catch (error) {
        console.error('Error parsing courses from localStorage:', error);
        setCourses(initialCourses);
        localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(initialCourses));
      }
    } else {
      setCourses(initialCourses);
      localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(initialCourses));
    }

    const storedGrades = localStorage.getItem(GRADES_STORAGE_KEY);
    if (storedGrades) {
      try {
        setGrades(JSON.parse(storedGrades));
      } catch (error) {
        console.error('Error parsing grades from localStorage:', error);
        setGrades(initialGrades);
        localStorage.setItem(GRADES_STORAGE_KEY, JSON.stringify(initialGrades));
      }
    } else {
      setGrades(initialGrades);
      localStorage.setItem(GRADES_STORAGE_KEY, JSON.stringify(initialGrades));
    }

    const storedStudents = localStorage.getItem(STUDENTS_STORAGE_KEY);
    if (storedStudents) {
      try {
        setStudents(JSON.parse(storedStudents));
      } catch (error) {
        console.error('Error parsing students from localStorage:', error);
        setStudents(initialStudents);
        localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(initialStudents));
      }
    } else {
      setStudents(initialStudents);
      localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(initialStudents));
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (courses.length > 0) {
      localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(courses));
    }
  }, [courses]);

  useEffect(() => {
    if (grades.length > 0) {
      localStorage.setItem(GRADES_STORAGE_KEY, JSON.stringify(grades));
    }
  }, [grades]);

  useEffect(() => {
    if (students.length > 0) {
      localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(students));
    }
  }, [students]);

  const addCourse = (name: string) => {
    const newCourse: Course = {
      id: `${courses.length + 1}`,
      name,
      teacherId: '1', 
      students: [],
    };
    setCourses([...courses, newCourse]);
  };

  const updateCourse = (updatedCourse: Course) => {
    setCourses(
      courses.map((course) =>
        course.id === updatedCourse.id ? updatedCourse : course
      )
    );
  };

  const addGrade = (studentId: string, courseId: string, value: number) => {
    const now = new Date().toISOString().split('T')[0];
    const newGrade: Grade = {
      id: `${grades.length + 1}`,
      studentId,
      courseId,
      value,
      createdAt: now,
      updatedAt: now,
    };
    setGrades([...grades, newGrade]);
  };

  const updateGrade = (id: string, value: number) => {
    setGrades(
      grades.map((grade) =>
        grade.id === id
          ? { ...grade, value, updatedAt: new Date().toISOString().split('T')[0] }
          : grade
      )
    );
  };

  const deleteGrade = (id: string) => {
    setGrades(grades.filter(grade => grade.id !== id));
  };

  const addStudent = (name: string, email: string) => {
    const newStudent: Student = {
      id: `${students.length + 1}`, 
      name,
      email,
    };
    setStudents([...students, newStudent]);
    return newStudent;
  };

  return {
    courses,
    grades,
    students,
    loading,
    addCourse,
    updateCourse,
    addGrade,
    updateGrade,
    deleteGrade,
    addStudent,
  };
} 