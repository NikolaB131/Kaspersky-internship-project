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

const LOAD_ROWS_COUNT = 20;

const worker = new Worker(new URL('./../../workers/searchWorker.ts', import.meta.url), { type: 'module' });

function Main() {
  const [rowsCount, setRowsCount] = useState(LOAD_ROWS_COUNT);
  const [data, setData] = useState<Employee[]>([]);
  const fetchedData: Staff = useFetch('http://localhost:4000/api/staff');

  const searchRef = useRef<HTMLInputElement>(null);
  const lastRowRef = useRef(null);
  const observer = useRef<IntersectionObserver | null>(null);

  function handleSearchClick() {
    searchRef.current?.focus();
  }

  useEffect(() => {
    if (fetchedData.data) {
      worker.postMessage({ type: 'init', data: fetchedData.data });
      setData(fetchedData.data.slice(0, LOAD_ROWS_COUNT));
    }
  }, [fetchedData.data]);

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputText = e.target.value;
    worker.postMessage({ type: 'search', data: inputText });
    worker.onmessage = res => {
      setData(res.data.slice(0, rowsCount));
    };
  }

  useEffect(() => {
    const row = lastRowRef.current;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (
        fetchedData.data &&
        entries[0].isIntersecting &&
        rowsCount < fetchedData.data.length &&
        rowsCount <= data.length
      ) {
        const newRowsCount = rowsCount + LOAD_ROWS_COUNT;
        setData(fetchedData.data.slice(0, newRowsCount));
        setRowsCount(newRowsCount);
      }
    });
    if (row) observer.current.observe(row);
  }, [lastRowRef.current, rowsCount]);

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
      <Outlet context={{
        data,
        isLoading: fetchedData.isLoading,
        error: fetchedData.error,
        ref: lastRowRef,
      }}
      />
    </div>
  );
}

export default Main;
