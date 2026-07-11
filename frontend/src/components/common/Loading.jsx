import styles from './Loading.module.css';

export default function Loading({ label = 'Carregando...' }) {
  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <span className={styles.ring} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
    </div>
  );
}
