import { sportLabel } from '../../services/court.service';
import styles from './ReservationCard.module.css';

export default function ReservationCard({ reservation, onEdit, onDelete }) {
  const { player, court, date, startTime, endTime } = reservation;

  return (
    <div className={styles.card}>
      <div className={styles.time}>
        <span className={styles.timeValue}>{startTime}</span>
        <span className={styles.timeDash}>–</span>
        <span className={styles.timeValue}>{endTime}</span>
      </div>

      <div className={styles.info}>
        <span className={styles.court}>{court?.name}</span>
        <span className={styles.meta}>
          {sportLabel(court?.sport)} · {player?.name} · {formatDate(date)}
        </span>
      </div>

      <div className={styles.actions}>
        <button className={styles.actionButton} onClick={onEdit} aria-label="Editar reserva">
          Editar
        </button>
        <button
          className={`${styles.actionButton} ${styles.deleteButton}`}
          onClick={onDelete}
          aria-label="Excluir reserva"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}

function formatDate(dateString) {
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}
