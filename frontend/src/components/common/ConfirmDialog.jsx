import Modal from './Modal';
import Button from './Button';
import styles from './ConfirmDialog.module.css';

export default function ConfirmDialog({ title, message, onConfirm, onCancel, loading = false }) {
  return (
    <Modal title={title} onClose={onCancel}>
      <p className={styles.message}>{message}</p>
      <div className={styles.actions}>
        <Button variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={onConfirm} loading={loading}>
          Excluir
        </Button>
      </div>
    </Modal>
  );
}
