import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import LandingPage from '../pages/LandingPage';
import DashboardPage from '../pages/DashboardPage';
import PlayersPage from '../pages/PlayersPage';
import CourtsPage from '../pages/CourtsPage';
import ReservationsPage from '../pages/ReservationsPage';
import SchedulePage from '../pages/SchedulePage';

export default function AppRoutes() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/jogadores" element={<PlayersPage />} />
          <Route path="/quadras" element={<CourtsPage />} />
          <Route path="/reservas" element={<ReservationsPage />} />
          <Route path="/agenda" element={<SchedulePage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
