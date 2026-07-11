import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const LINKS = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/jogadores', label: 'Jogadores' },
  { to: '/quadras', label: 'Quadras' },
  { to: '/reservas', label: 'Reservas' },
  { to: '/agenda', label: 'Agenda' },
];

export default function Navbar() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <NavLink to="/" className={styles.logo}>
          <svg className={styles.logoMark} viewBox="0 0 32 32" aria-hidden="true">
            <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="16" cy="16" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
            <line x1="16" y1="2" x2="16" y2="30" stroke="currentColor" strokeWidth="2" />
          </svg>
          Quadra Livre
        </NavLink>

        <nav className={styles.nav} aria-label="Navegação principal">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
