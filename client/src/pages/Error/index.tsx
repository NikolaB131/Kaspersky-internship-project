import styles from './Error.module.css';

function Error() {
  return (
    <section className={styles.container}>
      <h1>Произошла ошибка</h1>
      <p>Указан несуществующий адрес!</p>
    </section>
  );
}

export default Error;
