import { ForwardedRef, forwardRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import Card from './components/Card';
import Employee from '../List/components/Row/employee';
import styles from './Cards.module.css';

type Props = {
  data: Employee[] | undefined,
  isLoading: boolean,
  error: string | undefined,
  ref: ForwardedRef<HTMLDivElement>,
};

const Cards = forwardRef(function Cards() {
  const { data, isLoading, error, ref }: Props = useOutletContext();

  return (
    <>
      {isLoading && <p style={{ textAlign: 'center' }}>Загрузка...</p>}
      {error && <p style={{ textAlign: 'center' }}>Ошибка!</p>}
      <div className={styles.container}>
        {data && data.map((elem, i) => {
          let tempRef = null;
          if (data.length - 12 === i) {
            tempRef = ref;
          }
          return (
            <Card
              ref={tempRef}
              key={elem.index}
              index={elem.index}
              name={elem.name}
              group={elem.group}
              email={elem.email}
              phone={elem.phone}
            />
          );
        })}
      </div>
    </>
  );
});

export default Cards;
