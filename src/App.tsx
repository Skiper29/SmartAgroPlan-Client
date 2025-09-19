import { BrowserRouter as Router } from 'react-router-dom';
import AppProvider from './app/providers/AppProvider';

import AppRoutes from '@/app/routes/AppRoutes.tsx';

function App() {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  );
}

export default App;
