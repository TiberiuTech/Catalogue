import React, { useState, useRef, useEffect } from 'react';
import { Save, X, Pencil } from 'lucide-react';
import type { Grade } from '../../types';

interface GradesTableProps {
  grades: Grade[];
  onGradeUpdate: (id: string, value: number) => void;
  onGradeDelete?: (id: string) => void;
}

export function GradesTable({ grades, onGradeUpdate, onGradeDelete }: GradesTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingId]);

  const handleEdit = (grade: Grade) => {
    setEditingId(grade.id);
    setEditValue(grade.value);
  };

  const handleSave = (id: string) => {
    if (editValue >= 0 && editValue <= 100) {
      onGradeUpdate(id, editValue);
      setEditingId(null);
    }
  };

  const handleDelete = (id: string) => {
    if (onGradeDelete && window.confirm('Are you sure you want to delete this grade?')) {
      onGradeDelete(id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter') {
      handleSave(id);
    } else if (e.key === 'Escape') {
      setEditingId(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {grades.map((grade) => (
            <tr key={grade.id} className={editingId === grade.id ? "bg-blue-50" : ""}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{grade.studentId}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{grade.courseId}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {editingId === grade.id ? (
                  <div className="relative">
                    <input
                      ref={inputRef}
                      type="number"
                      min="0"
                      max="100"
                      value={editValue}
                      onChange={(e) => setEditValue(Number(e.target.value))}
                      onKeyDown={(e) => handleKeyDown(e, grade.id)}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-24 sm:text-sm border-gray-300 rounded-md border-2 border-blue-300 p-2"
                    />
                    <span className="text-xs text-gray-500 mt-1 block">
                      Press Enter to save
                    </span>
                  </div>
                ) : (
                  <span className="font-medium">{grade.value}</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {editingId === grade.id ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSave(grade.id)}
                      className="text-blue-600 hover:text-blue-900 flex items-center bg-blue-100 hover:bg-blue-200 rounded-md px-2 py-1"
                    >
                      <Save className="h-5 w-5 mr-1" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-red-600 hover:text-red-900 flex items-center bg-red-100 hover:bg-red-200 rounded-md px-2 py-1"
                    >
                      <X className="h-5 w-5 mr-1" />
                      <span>Cancel</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(grade)}
                      className="text-blue-600 hover:text-blue-900 flex items-center bg-blue-50 hover:bg-blue-100 rounded-md px-2 py-1"
                      title="Edit grade"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    {onGradeDelete && (
                      <button
                        onClick={() => handleDelete(grade.id)}
                        className="text-red-600 hover:text-red-900 flex items-center bg-red-50 hover:bg-red-100 rounded-md px-2 py-1"
                        title="Delete grade"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}