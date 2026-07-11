import { useEffect, useState } from 'react';
import courtService, { SPORT_TYPES, sportLabel } from '../services/court.service';
import CourtForm from '../components/courts/CourtForm';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import Loading from '../components/common/Loading';
import Button from '../components/common/Button';
import { useToast } from '../hooks/useToast';
import styles from './PlayersPage.module.css';

export default function CourtsPage() {
  const toast = useToast();
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sportFilter, setSportFilter] = useState('');
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const load = () => {
    setLoading(true);
    courtService
      .list()
      .then(setCourts)
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const filtered = sportFilter ? courts.filter((c) => c.sport === sportFilter) : courts;

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      if (editing?.id) {
        await courtService.update(editing.id, values);
        toast.success('Quadra atualizada com sucesso.');
      } else {
        await courtService.create(values);
        toast.success('Quadra cadastrada com sucesso.');
      }
      setEditing(null);
      load();
    } catch (err) {
      toast.error(err?.response?.data?.error?.message || 'Não foi possível salvar a quadra.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setSubmitting(true);
    try {
      await courtService.remove(deleting.id);
      toast.success('Quadra removida com sucesso.');
      setDeleting(null);
      load();
    } catch (err) {
      toast.error(err?.response?.data?.error?.message || 'Não foi possível remover a quadra.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`container ${styles.page}`}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Quadras</h1>
          <p className={styles.subtitle}>Cadastre e gerencie as quadras esportivas disponíveis.</p>
        </div>
        <Button onClick={() => setEditing({})}>+ Nova quadra</Button>
      </div>

      <select
        className={`input ${styles.search}`}
        value={sportFilter}
        onChange={(e) => setSportFilter(e.target.value)}
      >
        <option value="">Todas as modalidades</option>
        {SPORT_TYPES.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>

      {loading ? (
        <Loading label="Carregando quadras..." />
      ) : filtered.length === 0 ? (
        <p className={styles.empty}>Nenhuma quadra encontrada. Cadastre a primeira acima.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Modalidade</th>
              <th>Localização</th>
              <th aria-label="Ações" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{sportLabel(c.sport)}</td>
                <td>{c.location}</td>
                <td className={styles.actionsCell}>
                  <button className={styles.link} onClick={() => setEditing(c)}>
                    Editar
                  </button>
                  <button
                    className={`${styles.link} ${styles.linkDanger}`}
                    onClick={() => setDeleting(c)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editing ? (
        <Modal title={editing.id ? 'Editar quadra' : 'Nova quadra'} onClose={() => setEditing(null)}>
          <CourtForm
            initialValues={editing}
            onSubmit={handleSubmit}
            onCancel={() => setEditing(null)}
            submitting={submitting}
          />
        </Modal>
      ) : null}

      {deleting ? (
        <ConfirmDialog
          title="Excluir quadra"
          message={`Tem certeza que deseja excluir "${deleting.name}"? Essa ação não pode ser desfeita.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleting(null)}
          loading={submitting}
        />
      ) : null}
    </div>
  );
}
