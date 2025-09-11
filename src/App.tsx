import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AppProvider from './app/providers/AppProvider';
import Dashboard from './features/dashboard/pages/Dashboard';
import Landing from './features/landing/pages/Landing';
import FieldListPage from '@/features/fields/pages/FieldListPage';
import AddFieldPage from '@/features/fields/pages/AddFieldPage.tsx';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/dashboard"
            element={
              <Layout>
                <Dashboard />
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
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
