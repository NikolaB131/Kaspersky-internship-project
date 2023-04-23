import { useEffect, useRef, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Employee from './pages/List/components/Row/employee';
import searchSvg from '../../assets/search.svg';
import listSvg from '../../assets/list.svg';
import avatarSvg from '../../assets/avatar.svg';
import kanbanSvg from '../../assets/kanban.svg';
import styles from './Main.module.css';

type Staff = {
  data: Employee[] | undefined,
  isLoading: boolean,
  error: string | undefined,
};

function Main() {
  const searchRef = useRef<HTMLInputElement>(null);

  function handleSearchClick() {
    searchRef.current?.focus();
  }

  const [data, setData] = useState<Employee[]>([]);
  const fetchedData: Staff = useFetch('http://localhost:4000/api/staff');
  useEffect(() => {
    if (fetchedData.data) {
      setData(fetchedData.data);
    }
  }, [fetchedData.data]);

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputText = e.target.value.toLowerCase();
    if (fetchedData.data) {
      const sortedData = fetchedData.data.filter(elem => {
        if (inputText === '') return true;
        // Если в поиске нет чисел
        if (/\D/g.test(inputText)) {
          return elem.name.toLowerCase().includes(inputText)
          || elem.email.toLowerCase().includes(inputText)
          || elem.group.toLowerCase().includes(inputText);
        }
        return elem.phone.includes(inputText);
      });
      setData(sortedData);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.search} onClick={handleSearchClick}>
          <img src={searchSvg} alt="" />
          <input type="text" placeholder="Поиск" ref={searchRef} onChange={onInputChange} />
        </div>
        <nav className={styles.navbar_container}>
          <ul className={styles.navbar}>
            <li><Link to="list"><img src={listSvg} alt="" /></Link></li>
            <li><img src={avatarSvg} alt="" /></li>
            <li><img src={kanbanSvg} alt="" /></li>
          </ul>
        </nav>
        <div className={styles.dummy} />
      </div>
      <Outlet context={{ data, isLoading: fetchedData.isLoading, error: fetchedData.error }} />
    </div>
  );
}

export default Main;
