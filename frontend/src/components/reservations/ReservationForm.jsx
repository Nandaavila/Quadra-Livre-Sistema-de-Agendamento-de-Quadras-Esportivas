import { useState } from 'react';
import Field from '../common/Field';
import Button from '../common/Button';
import formStyles from '../players/PlayerForm.module.css';
import styles from './ReservationForm.module.css';

const EMPTY = { playerId: '', courtId: '', date: '', startTime: '', endTime: '' };

export default function ReservationForm({
  players,
  courts,
  initialValues = EMPTY,
  onSubmit,
  onCancel,
  submitting,
}) {
  const [values, setValues] = useState({ ...EMPTY, ...initialValues });
  const [errors, setErrors] = useState({});
  const [conflictMessage, setConflictMessage] = useState(null);

  const handleChange = (field) => (e) => {
    setConflictMessage(null);
    setValues((v) => ({ ...v, [field]: e.target.value }));
  };

  const validate = () => {
    const next = {};
    if (!values.playerId) next.playerId = 'Selecione o jogador.';
    if (!values.courtId) next.courtId = 'Selecione a quadra.';
    if (!values.date) next.date = 'Selecione a data.';
    if (!values.startTime) next.startTime = 'Informe o horário de início.';
    if (!values.endTime) next.endTime = 'Informe o horário de fim.';
    if (values.startTime && values.endTime && values.startTime >= values.endTime) {
      next.endTime = 'O fim deve ser depois do início.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setConflictMessage(null);
    if (!validate()) return;

    try {
      await onSubmit(values);
    } catch (err) {
      const apiError = err?.response?.data?.error;
      if (apiError?.code === 'RESERVATION_CONFLICT') {
        setConflictMessage(apiError.message);
      } else if (apiError?.message) {
        setConflictMessage(apiError.message);
      } else {
        setConflictMessage('Não foi possível salvar a reserva. Tente novamente.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={formStyles.form}>
      {conflictMessage ? <div className={styles.conflictBanner}>⚠ {conflictMessage}</div> : null}

      <Field label="Jogador" error={errors.playerId} htmlFor="playerId">
        <select
          id="playerId"
          className={`input ${errors.playerId ? 'invalid' : ''}`}
          value={values.playerId}
          onChange={handleChange('playerId')}
        >
          <option value="">Selecione...</option>
          {players.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Quadra" error={errors.courtId} htmlFor="courtId">
        <select
          id="courtId"
          className={`input ${errors.courtId ? 'invalid' : ''}`}
          value={values.courtId}
          onChange={handleChange('courtId')}
        >
          <option value="">Selecione...</option>
          {courts.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Data" error={errors.date} htmlFor="date">
        <input
          id="date"
          type="date"
          className={`input ${errors.date ? 'invalid' : ''}`}
          value={values.date}
          onChange={handleChange('date')}
        />
      </Field>

      <div className={styles.timeRow}>
        <Field label="Início" error={errors.startTime} htmlFor="startTime">
          <input
            id="startTime"
            type="time"
            className={`input ${errors.startTime ? 'invalid' : ''}`}
            value={values.startTime}
            onChange={handleChange('startTime')}
          />
        </Field>

        <Field label="Fim" error={errors.endTime} htmlFor="endTime">
          <input
            id="endTime"
            type="time"
            className={`input ${errors.endTime ? 'invalid' : ''}`}
            value={values.endTime}
            onChange={handleChange('endTime')}
          />
        </Field>
      </div>

      <div className={formStyles.actions}>
        <Button variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" loading={submitting}>
          Salvar
        </Button>
      </div>
    </form>
  );
}
