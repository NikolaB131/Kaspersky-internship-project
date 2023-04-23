import { NavLink, Outlet } from 'react-router-dom';
import styles from './Root.module.css';

function Root() {
  return (
    <>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <NavLink to="welcome">Welcome</NavLink>
          </li>
          <li>
            <NavLink to="main">Main</NavLink>
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
