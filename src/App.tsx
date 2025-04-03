import { LoginForm } from './components/auth/LoginForm';
import { TeacherDashboard } from './components/dashboard/TeacherDashboard';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, loading, signIn } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <LoginForm onSubmit={signIn} />
      </div>
    );
  }

  return user.role === 'teacher' ? <TeacherDashboard /> : <StudentDashboard />;
}

export default App;