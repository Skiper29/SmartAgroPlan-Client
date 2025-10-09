import { Routes, Route } from 'react-router-dom';
import { LandingPage } from '../../features/landing/pages/Landing';
import { DashboardPage } from '../../features/dashboard/pages/Dashboard';
import FieldListPage from '@/features/fields/pages/FieldListPage';
import AddFieldPage from '@/features/fields/pages/AddFieldPage';
import EditFieldPage from '@/features/fields/pages/EditFieldPage';
import FieldViewPage from '@/features/fields/pages/FieldViewPage';
import Layout from '../../components/layout/Layout';
import IrrigationDashboardPage from '@/features/irrigation/pages/IrrigationDashboardPage.tsx';
import IrrigationDetailPage from '@/features/irrigation/pages/IrrigationDetailPage.tsx';

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
      <Route
        path="/fields/new"
        element={
          <Layout>
            <AddFieldPage />
          </Layout>
        }
      />
      <Route
        path="/fields/view/:id"
        element={
          <Layout>
            <FieldViewPage />
          </Layout>
        }
      />
      <Route
        path="/fields/edit/:id"
        element={
          <Layout>
            <EditFieldPage />
          </Layout>
        }
      />
      <Route
        path="/irrigation"
        element={
          <Layout>
            <IrrigationDashboardPage />
          </Layout>
        }
      />
      <Route
        path="/irrigation/:id"
        element={
          <Layout>
            <IrrigationDetailPage />
          </Layout>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
