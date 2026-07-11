import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

const STEPS = [
  {
    n: '01',
    title: 'Cadastre',
    text: 'Registre jogadores e quadras esportivas do seu bairro, escola ou condomínio.',
  },
  {
    n: '02',
    title: 'Reserve',
    text: 'Escolha a quadra, a data e o horário. O sistema barra qualquer sobreposição automaticamente.',
  },
  {
    n: '03',
    title: 'Jogue',
    text: 'Consulte a agenda a qualquer momento e veja o que está livre ou ocupado.',
  },
];

const SPORTS = ['Futebol', 'Vôlei', 'Basquete', 'Tênis', 'Futsal', 'Beach Tennis'];

export default function LandingPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <svg className={styles.courtLines} viewBox="0 0 600 600" aria-hidden="true">
          <circle cx="300" cy="300" r="260" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="300" cy="300" r="90" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="300" y1="0" x2="300" y2="600" stroke="currentColor" strokeWidth="2" />
          <path d="M 40 150 A 260 260 0 0 1 40 450" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M 560 150 A 260 260 0 0 0 560 450" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>

        <div className={`container ${styles.heroContent}`}>
          <span className={styles.eyebrow}>Agendamento de quadras esportivas</span>
          <h1 className={styles.headline}>
            SUA QUADRA.
            <br />
            SEU HORÁRIO.
            <br />
            SEM CONFLITO.
          </h1>
          <p className={styles.subhead}>
            Chega de caderno, grupo de WhatsApp e reserva por ordem de chegada. Cadastre jogadores,
            quadras e reservas — o sistema verifica automaticamente se o horário já está ocupado.
          </p>
          <div className={styles.heroActions}>
            <Link to="/agenda" className={styles.primaryCta}>
              Ver agenda
            </Link>
            <Link to="/reservas" className={styles.secondaryCta}>
              Fazer uma reserva
            </Link>
          </div>
        </div>
      </section>

      <section className={`container ${styles.steps}`}>
        <h2 className={styles.sectionTitle}>Como funciona</h2>
        <div className={styles.stepsGrid}>
          {STEPS.map((step) => (
            <div key={step.n} className={styles.step}>
              <span className={styles.stepNumber}>{step.n}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepText}>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`container ${styles.sportsSection}`}>
        <h2 className={styles.sectionTitle}>Modalidades</h2>
        <div className={styles.sportsGrid}>
          {SPORTS.map((sport) => (
            <span key={sport} className={styles.sportChip}>
              {sport}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.ctaBanner}>
        <div className={`container ${styles.ctaBannerContent}`}>
          <h2 className={styles.ctaBannerTitle}>Bora organizar a quadra do seu bairro?</h2>
          <Link to="/quadras" className={styles.primaryCta}>
            Cadastrar quadra
          </Link>
        </div>
      </section>
    </div>
  );
}
