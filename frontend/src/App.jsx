import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from './hooks/useToast';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AppRoutes />
      </ToastProvider>
    </BrowserRouter>
  );
}
