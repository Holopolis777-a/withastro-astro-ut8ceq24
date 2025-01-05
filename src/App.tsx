import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import { Layout } from './components/layout/Layout';

// Lazy load pages
const Login = React.lazy(() => import('./pages/Login'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Brokers = React.lazy(() => import('./pages/brokers/BrokerList'));
const AdminMembers = React.lazy(() => import('./pages/admin/members'));
const Members = React.lazy(() => import('./pages/members/MemberList'));
const MemberOrders = React.lazy(() => import('./pages/orders/MemberOrders'));
const NewOrders = React.lazy(() => import('./pages/orders/NewOrders'));
const Orders = React.lazy(() => import('./pages/orders/OrderList'));
const News = React.lazy(() => import('./pages/news/NewsManagement'));
const FAQ = React.lazy(() => import('./pages/faq'));
const Vehicles = React.lazy(() => import('./pages/vehicles'));
const Companies = React.lazy(() => import('./pages/companies'));
const TicketsPage = React.lazy(() => import('./pages/tickets'));
const Messages = React.lazy(() => import('./pages/messages'));
const Notifications = React.lazy(() => import('./pages/notifications'));
const Benefits = React.lazy(() => import('./pages/benefits'));
const HowItWorks = React.lazy(() => import('./pages/how-it-works'));
const SalarySacrifice = React.lazy(() => import('./pages/salary-sacrifice'));
const ResetPassword = React.lazy(() => import('./pages/auth/ResetPassword'));

// Admin Settings Pages
const AdminSettings = React.lazy(() => import('./pages/admin/settings'));

// Employer Pages
const EmployerDashboard = React.lazy(() => import('./pages/employer/Dashboard'));
const EmployerInformation = React.lazy(() => import('./pages/employer/Information'));
const Employees = React.lazy(() => import('./pages/employer/Employees'));
const EmployerSettings = React.lazy(() => import('./pages/employer/Settings'));

// Employee Pages
const EmployeeDashboard = React.lazy(() => import('./pages/employee/Dashboard'));
const EmployeeVehicles = React.lazy(() => import('./pages/employee/Vehicles'));
const EmployeeRequests = React.lazy(() => import('./pages/employee/Requests'));

// Salary Employee Pages
const SalaryEmployeeDashboard = React.lazy(() => import('./pages/salary-employee/Dashboard'));

export default function App() {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return (
      <Router>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </React.Suspense>
        <Toaster position="top-right" />
      </Router>
    );
  }

  return (
    <Router>
      <Layout>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Common Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/vehicles/*" element={<Vehicles />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/tickets" element={<TicketsPage />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/salary-sacrifice/*" element={<SalarySacrifice />} />

            {/* Admin Routes */}
            {user?.role === 'admin' && (
              <>
                <Route path="/brokers" element={<Brokers />} />
                <Route path="/admin/members" element={<AdminMembers />} />
                <Route path="/new-orders" element={<NewOrders />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/news" element={<News />} />
                <Route path="/admin/settings/*" element={<AdminSettings />} />
              </>
            )}

            {/* Broker Routes */}
            {user?.role === 'broker' && (
              <>
                <Route path="/members" element={<Members />} />
                <Route path="/member-orders" element={<MemberOrders />} />
                <Route path="/benefits" element={<Benefits />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
              </>
            )}

            {/* Employer Routes */}
            {user?.role === 'employer' && (
              <>
                <Route path="/employer/dashboard" element={<EmployerDashboard />} />
                <Route path="/employer/information" element={<EmployerInformation />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/employer/settings" element={<EmployerSettings />} />
              </>
            )}

            {/* Employee Routes */}
            {user?.role === 'employee' && (
              <>
                <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
                <Route path="/employee/vehicles" element={<EmployeeVehicles />} />
                <Route path="/employee/requests" element={<EmployeeRequests />} />
              </>
            )}

            {/* Salary Employee Routes */}
            {user?.role === 'salary-employee' && (
              <>
                <Route path="/dashboard" element={<SalaryEmployeeDashboard />} />
                <Route path="/salary-sacrifice/*" element={<SalarySacrifice />} />
                <Route path="/employee/requests" element={<EmployeeRequests />} />
              </>
            )}

            {/* Default redirect */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </React.Suspense>
      </Layout>
      <Toaster position="top-right" />
    </Router>
  );
}