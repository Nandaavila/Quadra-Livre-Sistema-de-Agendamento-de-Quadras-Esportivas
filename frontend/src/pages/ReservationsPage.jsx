import { useEffect, useState } from 'react';
import reservationService from '../services/reservation.service';
import playerService from '../services/player.service';
import courtService, { SPORT_TYPES } from '../services/court.service';
import ReservationForm from '../components/reservations/ReservationForm';
import ReservationCard from '../components/reservations/ReservationCard';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import Loading from '../components/common/Loading';
import Button from '../components/common/Button';
import { useToast } from '../hooks/useToast';
import styles from './ReservationsPage.module.css';

export default function ReservationsPage() {
  const toast = useToast();
  const [reservations, setReservations] = useState([]);
  const [players, setPlayers] = useState([]);
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [dateFilter, setDateFilter] = useState('');
  const [courtFilter, setCourtFilter] = useState('');
  const [sportFilter, setSportFilter] = useState('');

  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const load = () => {
    setLoading(true);
    Promise.all([
      reservationService.list({ date: dateFilter || undefined, courtId: courtFilter || undefined }),
      playerService.list(),
      courtService.list(),
    ])
      .then(([r, p, c]) => {
        setReservations(r);
        setPlayers(p);
        setCourts(c);
      })
      .finally(() => setLoading(false));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(load, [dateFilter, courtFilter]);

  const filtered = sportFilter
    ? reservations.filter((r) => r.court?.sport === sportFilter)
    : reservations;

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      if (editing?.id) {
        await reservationService.update(editing.id, values);
        toast.success('Reserva atualizada com sucesso.');
      } else {
        await reservationService.create(values);
        toast.success('Reserva criada com sucesso.');
      }
      setEditing(null);
      load();
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setSubmitting(true);
    try {
      await reservationService.remove(deleting.id);
      toast.success('Reserva removida com sucesso.');
      setDeleting(null);
      load();
    } catch (err) {
      toast.error(err?.response?.data?.error?.message || 'Não foi possível remover a reserva.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`container ${styles.page}`}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Reservas</h1>
          <p className={styles.subtitle}>Cadastre, edite e remova reservas de horário.</p>
        </div>
        <Button onClick={() => setEditing({})}>+ Nova reserva</Button>
      </div>

      <div className={styles.filters}>
        <input
          type="date"
          className="input"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
        <select className="input" value={courtFilter} onChange={(e) => setCourtFilter(e.target.value)}>
          <option value="">Todas as quadras</option>
          {courts.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <select className="input" value={sportFilter} onChange={(e) => setSportFilter(e.target.value)}>
          <option value="">Todas as modalidades</option>
          {SPORT_TYPES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        {(dateFilter || courtFilter || sportFilter) && (
          <button
            className={styles.clearFilters}
            onClick={() => {
              setDateFilter('');
              setCourtFilter('');
              setSportFilter('');
            }}
          >
            Limpar filtros
          </button>
        )}
      </div>

      {loading ? (
        <Loading label="Carregando reservas..." />
      ) : filtered.length === 0 ? (
        <p className={styles.empty}>Nenhuma reserva encontrada para os filtros selecionados.</p>
      ) : (
        <div className={styles.list}>
          {filtered
            .sort((a, b) => (a.date + a.startTime).localeCompare(b.date + b.startTime))
            .map((r) => (
              <ReservationCard
                key={r.id}
                reservation={r}
                onEdit={() => setEditing(r)}
                onDelete={() => setDeleting(r)}
              />
            ))}
        </div>
      )}

      {editing ? (
        <Modal title={editing.id ? 'Editar reserva' : 'Nova reserva'} onClose={() => setEditing(null)}>
          <ReservationForm
            players={players}
            courts={courts}
            initialValues={editing}
            onSubmit={handleSubmit}
            onCancel={() => setEditing(null)}
            submitting={submitting}
          />
        </Modal>
      ) : null}

      {deleting ? (
        <ConfirmDialog
          title="Excluir reserva"
          message="Tem certeza que deseja excluir esta reserva? Essa ação não pode ser desfeita."
          onConfirm={handleDelete}
          onCancel={() => setDeleting(null)}
          loading={submitting}
        />
      ) : null}
    </div>
  );
}
