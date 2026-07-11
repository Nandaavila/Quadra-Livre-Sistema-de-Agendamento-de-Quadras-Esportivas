import styles from './Field.module.css';

export default function Field({ label, error, children, htmlFor }) {
  return (
    <div className={styles.field}>
      <label htmlFor={htmlFor} className={styles.label}>
        {label}
      </label>
      {children}
      {error ? <span className={styles.error}>{error}</span> : null}
    </div>
  );
}
