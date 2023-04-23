import { NavLink, Outlet } from 'react-router-dom';
import styles from './Root.module.css';

function getLinkStyle({ isActive }: { isActive: boolean }) {
  return isActive ? styles.active : '';
}

function Root() {
  return (
    <>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <NavLink
              to="welcome"
              className={getLinkStyle}
            >
              Welcome
            </NavLink>
          </li>
          <li>
            <NavLink
              to="main"
              className={getLinkStyle}
            >
              Main
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.content}>
        <Outlet />
      </div>
    </>
  );
}

export default Root;
