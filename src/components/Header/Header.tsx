import cn from 'classnames';
import { Link, NavLink } from 'react-router-dom';

import styles from './header.module.scss';

const setActive = ({ isActive }: { isActive: boolean }): string => (isActive ? 'active-link' : '');
const setLoginButton = ({ isActive }: { isActive: boolean }) => ({ display: isActive ? 'none' : 'block' });

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header__inner}>
          <div className={styles.header__top}>
            <Link to="/">
              <svg
                width="132"
                height="24"
                viewBox="0 0 132 24"
                fill="none"
                stroke="white"
                strokeWidth="2.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.899 7C11.9144 6.03533 10.667 5.38281 9.31305 5.12426C7.95913 4.8657 6.55901 5.01262 5.28825 5.5466C4.0175 6.08058 2.93267 6.97784 2.16981 8.12587C1.40695 9.27391 1 10.6216 1 12C1 13.3784 1.40695 14.7261 2.16981 15.8741C2.93267 17.0222 4.0175 17.9194 5.28825 18.4534C6.55901 18.9874 7.95913 19.1343 9.31305 18.8758C10.667 18.6172 11.9144 17.9647 12.899 17M77.899 5H68.899V19H77.899M68.899 12H74.899M85.899 13H91.899C92.9598 13 93.9773 12.5786 94.7274 11.8284C95.4776 11.0783 95.899 10.0609 95.899 9C95.899 7.93914 95.4776 6.92172 94.7274 6.17158C93.9773 5.42143 92.9598 5 91.899 5H85.899V19M111.899 5H102.899V19H111.899M102.899 12H108.899M119.899 19V5L130.899 19V5M49.899 5H54.899C56.7555 5 58.536 5.7375 59.8487 7.05026C61.1615 8.36301 61.899 10.1435 61.899 12C61.899 13.8565 61.1615 15.637 59.8487 16.9497C58.536 18.2625 56.7555 19 54.899 19H49.899V5Z" />
                <path d="M19.899 8.3L30.899 1M19.899 8.3V15.7M19.899 8.3L30.899 15.7M30.899 1L41.899 8.3M30.899 1V8.3M41.899 8.3V15.7M41.899 8.3L30.899 15.7M41.899 15.7L30.899 23M41.899 15.7L30.899 8.3M30.899 23L19.899 15.7M30.899 23V15.7M19.899 15.7L30.899 8.3" />
              </svg>
            </Link>
            <nav>
              <ul className={styles.nav__list}>
                <li className={styles.nav__item}>
                  <NavLink className={setActive} to="/">
                    Home
                  </NavLink>
                </li>
                <li className={styles.nav__item}>
                  <NavLink className={setActive} to="/workspace">
                    Posts
                  </NavLink>
                </li>
              </ul>
            </nav>
            <div className={styles.header__buttons}>
              <NavLink className={cn(styles.header__button, 'button')} style={setLoginButton} to="/account">
                Sign Up
              </NavLink>
              <NavLink className="button" style={setLoginButton} to="/login">
                Log In
              </NavLink>
              {/* <button className={classnames(styles.header__button, 'button')}></button>
              <button className={styles.header__button}></button> */}
            </div>
          </div>
          <div className={styles.header__bottom}>
            <form action="" className={styles.header__form}>
              <label className={styles['header__form-label']}>
                <svg className={styles['header__form-icon']} viewBox="0 0 56.7 56.7">
                  <path d="M42.8 7.3C33-2.4 17.1-2.4 7.3 7.3c-9.8 9.8-9.8 25.7 0 35.5 8.7 8.7 22.2 9.7 32 2.9l9.6 9.6c1.8 1.8 4.7 1.8 6.4 0 1.8-1.8 1.8-4.7 0-6.4l-9.6-9.6c6.8-9.8 5.8-23.3-2.9-32zm-6.2 29.3c-6.4 6.4-16.7 6.4-23.1 0s-6.4-16.7 0-23.1c6.4-6.4 16.7-6.4 23.1 0 6.4 6.4 6.4 16.8 0 23.1z"></path>
                </svg>
                <input className={styles.header__input} type="text" placeholder="Search CodePen..." />
              </label>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};
