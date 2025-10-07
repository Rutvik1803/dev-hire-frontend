import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import ProtectedLayout from './layouts/ProtectedLayout';

// Public Pages
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import NotFound from './pages/NotFound';

// Developer Pages
import DeveloperDashboard from './pages/developer/Dashboard';
import DeveloperJobs from './pages/developer/Jobs';
import JobDetails from './pages/developer/JobDetails';
import Resume from './pages/developer/Resume';

// Recruiter Pages
import RecruiterDashboard from './pages/recruiter/Dashboard';
import RecruiterJobs from './pages/recruiter/Jobs';
import NewJob from './pages/recruiter/NewJob';
import EditJob from './pages/recruiter/EditJob';
import JobApplicants from './pages/recruiter/JobApplicants';
import ApplicantDetails from './pages/recruiter/ApplicantDetails';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminJobs from './pages/admin/Jobs';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Developer Routes */}
          <Route element={<ProtectedLayout allowedRoles={['developer']} />}>
            <Route
              path="/developer/dashboard"
              element={<DeveloperDashboard />}
            />
            <Route path="/developer/jobs" element={<DeveloperJobs />} />
            <Route path="/developer/jobs/:id" element={<JobDetails />} />
            <Route path="/developer/resume" element={<Resume />} />
          </Route>

          {/* Recruiter Routes */}
          <Route element={<ProtectedLayout allowedRoles={['recruiter']} />}>
            <Route
              path="/recruiter/dashboard"
              element={<RecruiterDashboard />}
            />
            <Route path="/recruiter/jobs" element={<RecruiterJobs />} />
            <Route path="/recruiter/jobs/new" element={<NewJob />} />
            <Route path="/recruiter/jobs/edit/:id" element={<EditJob />} />
            <Route
              path="/recruiter/jobs/:id/applicants"
              element={<JobApplicants />}
            />
            <Route
              path="/recruiter/applicants/:id"
              element={<ApplicantDetails />}
            />
          </Route>

          {/* Admin Routes */}
          <Route element={<ProtectedLayout allowedRoles={['admin']} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/jobs" element={<AdminJobs />} />
          </Route>

          {/* 404 Page */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
