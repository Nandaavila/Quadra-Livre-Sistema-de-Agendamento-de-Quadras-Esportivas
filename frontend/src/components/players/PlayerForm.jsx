import { useState } from 'react';
import Field from '../common/Field';
import Button from '../common/Button';
import styles from './PlayerForm.module.css';

const EMPTY = { name: '', email: '', phone: '' };

export default function PlayerForm({ initialValues = EMPTY, onSubmit, onCancel, submitting }) {
  const [values, setValues] = useState({ ...EMPTY, ...initialValues });
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = 'Informe o nome completo.';
    if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = 'Informe um e-mail válido.';
    if (!values.phone.trim()) next.phone = 'Informe um telefone.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Field label="Nome completo" error={errors.name} htmlFor="name">
        <input
          id="name"
          className={`input ${errors.name ? 'invalid' : ''}`}
          value={values.name}
          onChange={handleChange('name')}
          placeholder="Ex.: Fernanda Ávila"
        />
      </Field>

      <Field label="E-mail" error={errors.email} htmlFor="email">
        <input
          id="email"
          type="email"
          className={`input ${errors.email ? 'invalid' : ''}`}
          value={values.email}
          onChange={handleChange('email')}
          placeholder="nome@exemplo.com"
        />
      </Field>

      <Field label="Telefone" error={errors.phone} htmlFor="phone">
        <input
          id="phone"
          className={`input ${errors.phone ? 'invalid' : ''}`}
          value={values.phone}
          onChange={handleChange('phone')}
          placeholder="(81) 99999-9999"
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
