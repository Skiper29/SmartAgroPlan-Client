import { Routes, Route } from 'react-router-dom';
import { LandingPage } from '../../features/landing/pages/Landing';
import { DashboardPage } from '../../features/dashboard/pages/Dashboard';
import FieldListPage from '@/features/fields/pages/FieldListPage';
import Layout from '../../components/layout/Layout';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/dashboard"
        element={
          <Layout>
            <DashboardPage />
          </Layout>
        }
      />
      <Route
        path="/fields"
        element={
          <Layout>
            <FieldListPage />
          </Layout>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
