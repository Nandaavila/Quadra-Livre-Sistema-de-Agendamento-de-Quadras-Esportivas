import { useEffect, useState } from 'react';
import courtService from '../services/court.service';
import reservationService from '../services/reservation.service';
import Loading from '../components/common/Loading';
import styles from './SchedulePage.module.css';

const HOURS = Array.from({ length: 17 }, (_, i) => i + 6); // 06h às 22h

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function SchedulePage() {
  const [courts, setCourts] = useState([]);
  const [courtId, setCourtId] = useState('');
  const [date, setDate] = useState(todayISO());
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    courtService.list().then((list) => {
      setCourts(list);
      if (list.length > 0) setCourtId(list[0].id);
    });
  }, []);

  useEffect(() => {
    if (!courtId || !date) return;
    setLoading(true);
    reservationService
      .list({ courtId, date })
      .then(setReservations)
      .finally(() => setLoading(false));
  }, [courtId, date]);

  // Função ajustada para evitar duplicação de slots em horários quebrados
  const isOccupied = (hour) => {
    const hourString = `${String(hour).padStart(2, '0')}:00`;
    return reservations.find((r) => r.startTime <= hourString && r.endTime > hourString);
  };

  const selectedCourt = courts.find((c) => c.id === courtId);

  return (
    <div className={`container ${styles.page}`}>
      <h1 className={styles.title}>Agenda</h1>
      <p className={styles.subtitle}>Consulte os horários livres e ocupados por quadra e data.</p>

      <div className={styles.filters}>
        <select className="input" value={courtId} onChange={(e) => setCourtId(e.target.value)}>
          {courts.length === 0 && <option value="">Nenhuma quadra cadastrada</option>}
          {courts.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <input type="date" className="input" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      {!courtId ? (
        <p className={styles.empty}>Cadastre uma quadra para visualizar a agenda.</p>
      ) : loading ? (
        <Loading label="Carregando agenda..." />
      ) : (
        <div className={styles.scheduleCard}>
          <div className={styles.scheduleHeader}>
            <span className={styles.courtName}>{selectedCourt?.name}</span>
            <div className={styles.legend}>
              <span className={styles.legendItem}>
                <span className={`${styles.legendDot} ${styles.free}`} /> Livre
              </span>
              <span className={styles.legendItem}>
                <span className={`${styles.legendDot} ${styles.occupied}`} /> Ocupado
              </span>
            </div>
          </div>

          <div className={styles.grid}>
            {HOURS.map((hour) => {
              const reservation = isOccupied(hour);
              return (
                <div
                  key={hour}
                  className={`${styles.cell} ${reservation ? styles.cellOccupied : styles.cellFree}`}
                >
                  <span className={styles.cellHour}>
                    {reservation
                      ? `${reservation.startTime} - ${reservation.endTime}`
                      : `${String(hour).padStart(2, '0')}:00`}
                  </span>
                  <span className={styles.cellStatus}>
                    {reservation ? reservation.player?.name : 'Livre'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}