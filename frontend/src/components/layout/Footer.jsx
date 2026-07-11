import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <span className={styles.brand}>Quadra Livre</span>
        <span className={styles.tagline}>
          Projeto DFS-2026.2 — Atlântico Avanti · Desenvolvimento Full Stack Básico
        </span>
      </div>
    </footer>
  );
}
