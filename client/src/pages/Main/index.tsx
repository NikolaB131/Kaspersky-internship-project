import { useRef } from 'react';
import { Link, Outlet } from 'react-router-dom';
import searchSvg from '../../assets/search.svg';
import listSvg from '../../assets/list.svg';
import avatarSvg from '../../assets/avatar.svg';
import kanbanSvg from '../../assets/kanban.svg';
import styles from './Main.module.css';

function Main() {
  const searchRef = useRef<HTMLInputElement>(null);

  function handleSearchClick() {
    searchRef.current?.focus();
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.search} onClick={handleSearchClick}>
          <img src={searchSvg} alt="" />
          <input type="text" ref={searchRef} placeholder="Поиск" />
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
      <Outlet />
    </div>
  );
}

export default Main;
