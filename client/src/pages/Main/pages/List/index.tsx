import useFetch from '../../../../hooks/useFetch';
import Row from './components/Row';
import Employee from './components/Row/employee';

function List() {
  const { data, isLoading, error } = useFetch('http://localhost:4000/api/staff');

  return (
    <div>
      <Row index={-1} name="Полное имя" group="Группа" email="Электронная почта" phone="Номер телефона" isHeader />
      {isLoading && <span style={{ textAlign: 'center' }}>Загрузка...</span>}
      {error && 'Ошибка!'}
      {data && (data as Employee[]).map(elem => (
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
