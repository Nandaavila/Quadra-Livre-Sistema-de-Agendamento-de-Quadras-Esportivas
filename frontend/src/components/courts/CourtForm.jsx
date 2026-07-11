import { useState } from 'react';
import Field from '../common/Field';
import Button from '../common/Button';
import { SPORT_TYPES } from '../../services/court.service';
import styles from '../players/PlayerForm.module.css';

const EMPTY = { name: '', sport: 'SOCCER', location: '' };

export default function CourtForm({ initialValues = EMPTY, onSubmit, onCancel, submitting }) {
  const [values, setValues] = useState({ ...EMPTY, ...initialValues });
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = 'Informe o nome da quadra.';
    if (!values.location.trim()) next.location = 'Informe a localização.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Field label="Nome da quadra" error={errors.name} htmlFor="courtName">
        <input
          id="courtName"
          className={`input ${errors.name ? 'invalid' : ''}`}
          value={values.name}
          onChange={handleChange('name')}
          placeholder="Ex.: Quadra Society"
        />
      </Field>

      <Field label="Modalidade" htmlFor="sport">
        <select
          id="sport"
          className="input"
          value={values.sport}
          onChange={handleChange('sport')}
        >
          {SPORT_TYPES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Localização" error={errors.location} htmlFor="location">
        <input
          id="location"
          className={`input ${errors.location ? 'invalid' : ''}`}
          value={values.location}
          onChange={handleChange('location')}
          placeholder="Ex.: Bloco A, Térreo"
        />
      </Field>

      <div className={styles.actions}>
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
