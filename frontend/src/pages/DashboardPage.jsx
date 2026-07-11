import { useEffect, useState } from 'react';
import playerService from '../services/player.service';
import courtService from '../services/court.service';
import reservationService from '../services/reservation.service';
import { sportLabel } from '../services/court.service';
import Loading from '../components/common/Loading';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState([]);
  const [courts, setCourts] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    Promise.all([playerService.list(), courtService.list(), reservationService.list()])
      .then(([p, c, r]) => {
        setPlayers(p);
        setCourts(c);
        setReservations(r);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading label="Carregando indicadores..." />;

  const today = new Date().toISOString().slice(0, 10);
  const todayReservations = reservations.filter((r) => r.date === today);

  const bySport = courts.reduce((acc, c) => {
    const label = sportLabel(c.sport);
    acc[label] = (acc[label] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className={`container ${styles.page}`}>
      <h1 className={styles.title}>Dashboard</h1>
      <p className={styles.subtitle}>Visão geral do uso das quadras.</p>

      <div className={styles.kpiGrid}>
        <KpiCard label="Jogadores cadastrados" value={players.length} accent="green" />
        <KpiCard label="Quadras cadastradas" value={courts.length} accent="blue" />
        <KpiCard label="Reservas totais" value={reservations.length} accent="amber" />
        <KpiCard label="Reservas hoje" value={todayReservations.length} accent="coral" />
      </div>

      <div className={styles.sectionRow}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Quadras por modalidade</h2>
          {Object.keys(bySport).length === 0 ? (
            <p className={styles.empty}>Nenhuma quadra cadastrada ainda.</p>
          ) : (
            <ul className={styles.barList}>
              {Object.entries(bySport).map(([label, count]) => (
                <li key={label} className={styles.barRow}>
                  <span className={styles.barLabel}>{label}</span>
                  <div className={styles.barTrack}>
                    <div
                      className={styles.barFill}
                      style={{ width: `${(count / courts.length) * 100}%` }}
                    />
                  </div>
                  <span className={styles.barValue}>{count}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Agenda de hoje</h2>
          {todayReservations.length === 0 ? (
            <p className={styles.empty}>Nenhuma reserva para hoje.</p>
          ) : (
            <ul className={styles.todayList}>
              {todayReservations
                .sort((a, b) => a.startTime.localeCompare(b.startTime))
                .map((r) => (
                  <li key={r.id} className={styles.todayItem}>
                    <span className={styles.todayTime}>{r.startTime}</span>
                    <span>
                      {r.court?.name} · {r.player?.name}
                    </span>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function KpiCard({ label, value, accent }) {
  return (
    <div className={`${styles.kpiCard} ${styles[`accent-${accent}`]}`}>
      <span className={styles.kpiValue}>{value}</span>
      <span className={styles.kpiLabel}>{label}</span>
    </div>
  );
}
