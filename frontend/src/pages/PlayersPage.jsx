import { useEffect, useState } from 'react';
import playerService from '../services/player.service';
import PlayerForm from '../components/players/PlayerForm';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import Loading from '../components/common/Loading';
import Button from '../components/common/Button';
import { useToast } from '../hooks/useToast';
import styles from './PlayersPage.module.css';

export default function PlayersPage() {
  const toast = useToast();
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(null); // null | {} | player
  const [deleting, setDeleting] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const load = () => {
    setLoading(true);
    playerService
      .list()
      .then(setPlayers)
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const filtered = players.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      if (editing?.id) {
        await playerService.update(editing.id, values);
        toast.success('Jogador atualizado com sucesso.');
      } else {
        await playerService.create(values);
        toast.success('Jogador cadastrado com sucesso.');
      }
      setEditing(null);
      load();
    } catch (err) {
      toast.error(err?.response?.data?.error?.message || 'Não foi possível salvar o jogador.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setSubmitting(true);
    try {
      await playerService.remove(deleting.id);
      toast.success('Jogador removido com sucesso.');
      setDeleting(null);
      load();
    } catch (err) {
      toast.error(err?.response?.data?.error?.message || 'Não foi possível remover o jogador.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`container ${styles.page}`}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Jogadores</h1>
          <p className={styles.subtitle}>Cadastre e gerencie os jogadores do sistema.</p>
        </div>
        <Button onClick={() => setEditing({})}>+ Novo jogador</Button>
      </div>

      <input
        className={`input ${styles.search}`}
        placeholder="Buscar por nome..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <Loading label="Carregando jogadores..." />
      ) : filtered.length === 0 ? (
        <p className={styles.empty}>Nenhum jogador encontrado. Cadastre o primeiro acima.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th aria-label="Ações" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.email}</td>
                <td>{p.phone}</td>
                <td className={styles.actionsCell}>
                  <button className={styles.link} onClick={() => setEditing(p)}>
                    Editar
                  </button>
                  <button
                    className={`${styles.link} ${styles.linkDanger}`}
                    onClick={() => setDeleting(p)}
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
        <Modal title={editing.id ? 'Editar jogador' : 'Novo jogador'} onClose={() => setEditing(null)}>
          <PlayerForm
            initialValues={editing}
            onSubmit={handleSubmit}
            onCancel={() => setEditing(null)}
            submitting={submitting}
          />
        </Modal>
      ) : null}

      {deleting ? (
        <ConfirmDialog
          title="Excluir jogador"
          message={`Tem certeza que deseja excluir "${deleting.name}"? Essa ação não pode ser desfeita.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleting(null)}
          loading={submitting}
        />
      ) : null}
    </div>
  );
}
