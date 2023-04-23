import styles from './Welcome.module.css';

function Welcome() {
  return (
    <section className={styles.container}>
      <h1>Добро пожаловать!</h1>
      <p>В этом сервисе можно найти основную информацию про сотрудников</p>
    </section>
  );
}

export default Welcome;
