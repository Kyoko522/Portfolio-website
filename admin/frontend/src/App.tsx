import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './auth';
import Login from './pages/Login';
import Layout from './pages/Layout';
import ResumeEditor from './pages/ResumeEditor';
import Applications from './pages/Applications';
import ProfileBank from './pages/ProfileBank';
import TailorResume from './pages/TailorResume';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/resume" replace />} />
        <Route path="resume" element={<ResumeEditor />} />
        <Route path="profile" element={<ProfileBank />} />
        <Route path="tailor" element={<TailorResume />} />
        <Route path="applications" element={<Applications />} />
      </Route>
    </Routes>
  );
}
