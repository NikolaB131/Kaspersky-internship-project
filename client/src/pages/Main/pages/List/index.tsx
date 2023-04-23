import { useOutletContext } from 'react-router-dom';
import Row from './components/Row';
import Employee from './components/Row/employee';

type Props = {
  data: Employee[] | undefined,
  isLoading: boolean,
  error: string | undefined,
};

function List() {
  const { data, isLoading, error }: Props = useOutletContext();

  return (
    <div>
      <Row index={-1} name="Полное имя" group="Группа" email="Электронная почта" phone="Номер телефона" isHeader />
      {isLoading && <span style={{ textAlign: 'center' }}>Загрузка...</span>}
      {error && 'Ошибка!'}
      {data && data.map(elem => (
        <Row
          key={elem.index}
          index={elem.index}
          name={elem.name}
          group={elem.group}
          email={elem.email}
          phone={elem.phone}
        />
      ))}
    </div>
  );
}

export default List;
