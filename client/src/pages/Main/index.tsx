import { useCallback, useEffect, useRef, useState } from 'react';
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

const LOAD_ROWS_COUNT = 20;

const worker = new Worker(new URL('./../../workers/searchWorker.ts', import.meta.url), { type: 'module' });

function Main() {
  const [rowsCount, setRowsCount] = useState(LOAD_ROWS_COUNT);
  const [data, setData] = useState<Employee[]>([]);
  const [visibleData, setVisibleData] = useState<Employee[]>([]);

  const searchRef = useRef<HTMLInputElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchedData: Staff = useFetch('http://localhost:4000/api/staff');

  useEffect(() => {
    if (fetchedData.data) {
      worker.postMessage({ type: 'init', data: fetchedData.data });
      setData(fetchedData.data);
    }
  }, [fetchedData.data]);

  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    worker.postMessage({ type: 'search', data: inputText });
    worker.onmessage = res => {
      setData(res.data);
    };
  }, []);

  const lastRowRef = useCallback((rowRef: HTMLDivElement) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setRowsCount(prevRows => {
          if (fetchedData.data && prevRows < fetchedData.data.length) {
            return prevRows + LOAD_ROWS_COUNT;
          }
          return prevRows;
        });
      }
    });
    if (rowRef) observer.current.observe(rowRef);
  }, [fetchedData.data]);

  useEffect(() => {
    setVisibleData(data.slice(0, rowsCount));
  }, [data, rowsCount]);

  function handleSearchClick() {
    searchRef.current?.focus();
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.search_container}>
          <div className={styles.search} onClick={handleSearchClick}>
            <img src={searchSvg} alt="" />
            <input type="text" placeholder="Поиск" ref={searchRef} onChange={onInputChange} />
          </div>
          <span>Найдено: <b>{data.length}</b></span>
        </div>
        <nav className={styles.navbar_container}>
          <ul className={styles.navbar}>
            <li><Link to="list"><img src={listSvg} alt="" /></Link></li>
            <li><Link to="cards"><img src={avatarSvg} alt="" /></Link></li>
            <li><img src={kanbanSvg} alt="" /></li>
          </ul>
        </nav>
        <div className={styles.dummy} />
      </div>
      <Outlet context={{
        data: visibleData,
        isLoading: fetchedData.isLoading,
        error: fetchedData.error,
        ref: lastRowRef,
      }}
      />
    </div>
  );
}

export default Main;
