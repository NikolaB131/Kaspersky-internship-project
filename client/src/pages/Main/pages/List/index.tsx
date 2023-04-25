import { ForwardedRef, forwardRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import Row from './components/Row';
import isEven from '../../../../helpers/isEven';
import Employee from './components/Row/employee';

type Props = {
  data: Employee[] | undefined,
  isLoading: boolean,
  error: string | undefined,
  ref: ForwardedRef<HTMLDivElement>,
};

const List = forwardRef(function List() {
  const { data, isLoading, error, ref }: Props = useOutletContext();

  return (
    <div>
      <Row index={-1} name="Полное имя" group="Группа" email="Электронная почта" phone="Номер телефона" isHeader />
      {isLoading && <p style={{ textAlign: 'center' }}>Загрузка...</p>}
      {error && <p style={{ textAlign: 'center' }}>Ошибка!</p>}
      {data && data.map((elem, i) => {
        let tempRef = null;
        if (data.length - 20 === i) {
          tempRef = ref;
        }
        return (
          <Row
            isEven={isEven(i)}
            ref={tempRef}
            key={elem.index}
            name={elem.name}
            group={elem.group}
            email={elem.email}
            phone={elem.phone}
          />
        );
      })}
    </div>
  );
});

export default List;
