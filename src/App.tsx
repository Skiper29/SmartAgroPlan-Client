import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AppProvider from './app/providers/AppProvider';
import Dashboard from './features/dashboard/pages/Dashboard';
import Landing from './features/landing/pages/Landing';
import FieldListPage from '@/features/fields/pages/FieldListPage';

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
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
