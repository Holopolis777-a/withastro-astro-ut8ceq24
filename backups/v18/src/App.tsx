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
const Benefits = React.lazy(() => import('./pages/benefits'));
const HowItWorks = React.lazy(() => import('./pages/how-it-works'));
const SalarySacrifice = React.lazy(() => import('./pages/salary-sacrifice'));
const ResetPassword = React.lazy(() => import('./pages/auth/ResetPassword'));

// Employer Pages
const EmployerDashboard = React.lazy(() => import('./pages/employer/Dashboard'));
const EmployerInformation = React.lazy(() => import('./pages/employer/Information'));
const Employees = React.lazy(() => import('./pages/employer/Employees'));
const EmployerSettings = React.lazy(() => import('./pages/employer/Settings'));

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'broker' | 'user' | 'employer' | 'employee' | 'salary-employee';
  createdAt: Date;
  employerId?: string;
}

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

            {/* Admin Routes */}
            {user?.role === 'admin' && (
              <>
                <Route path="/brokers" element={<Brokers />} />
                <Route path="/admin/members" element={<AdminMembers />} />
                <Route path="/new-orders" element={<NewOrders />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/news" element={<News />} />
                <Route path="/salary-sacrifice/*" element={<SalarySacrifice />} />
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
                <Route path="/salary-sacrifice/*" element={<SalarySacrifice />} />
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