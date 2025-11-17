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
import FertilizerDashboardPage from '@/features/fertilizer/pages/FertilizerDashboardPage';
import FertilizerPlanPage from '@/features/fertilizer/pages/FertilizerPlanPage';
import GenerateSeasonPlanPage from '@/features/fertilizer/pages/GenerateSeasonPlanPage';
import FertilizerBalancePage from '@/features/fertilizer/pages/FertilizerBalancePage';
import FertilizerHistoryPage from '@/features/fertilizer/pages/FertilizerHistoryPage';

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
      <Route
        path="/fertilizer"
        element={
          <Layout>
            <FertilizerDashboardPage />
          </Layout>
        }
      />
      <Route
        path="/fertilizer/plan/:id"
        element={
          <Layout>
            <FertilizerPlanPage />
          </Layout>
        }
      />
      <Route
        path="/fertilizer/generate-plan/:id"
        element={
          <Layout>
            <GenerateSeasonPlanPage />
          </Layout>
        }
      />
      <Route
        path="/fertilizer/balance/:id"
        element={
          <Layout>
            <FertilizerBalancePage />
          </Layout>
        }
      />
      <Route
        path="/fertilizer/history/:id"
        element={
          <Layout>
            <FertilizerHistoryPage />
          </Layout>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
