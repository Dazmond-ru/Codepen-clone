import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import cn from 'classnames';
import { useRef, useState } from 'react';
import { MdMenu, MdMenuOpen } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { ReactComponent as LogoDesktop } from '../../assets/svg/logoDesktop.svg';
import { ReactComponent as LogoMobile } from '../../assets/svg/logoMobile.svg';
import { ReactComponent as Magnifier } from '../../assets/svg/magnifier.svg';
import { PenInfo } from '../../components/index';
import { fetchAuthLogout, logout, selectIsAuth, selectUserAvatarUrl } from '../../redux/slices/auth';
import { useAppDispatch } from '../../redux/store';
import { EditorControls } from '../EditorControls/EditorControls';
import styles from './Header.module.scss';

const setLoginButton = ({ isActive }: { isActive: boolean }) => ({ display: isActive ? 'none' : 'block' });

export const Header = () => {
  const [burger, setBurger] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const isAuth = useSelector(selectIsAuth);
  const [width, setWidth] = useState(window.innerWidth);

  const homeLinkRef = useRef<HTMLAnchorElement>(null);

  const handleWindowResize = () => setWidth(window.innerWidth);
  window.addEventListener('resize', handleWindowResize);

  const onClickLogout = () => setOpen(true);

  const handleConfirmLogout = async () => {
    await dispatch(fetchAuthLogout());
    homeLinkRef.current?.click();
    dispatch(logout());
    setOpen(false);
  };

  const userAvatar = useSelector(selectUserAvatarUrl);
  const locationRouter = useLocation();

  const clearPath = locationRouter.pathname.slice(0, 7);

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header__inner}>
          <Link to={clearPath !== '/editin' ? '/' : '/editor'}>
            {width > 700 && clearPath !== '/editor' ? <LogoDesktop /> : <LogoMobile />}
          </Link>
          <div onClick={() => setBurger(!burger)} className={styles.header__burger}>
            {burger ? <MdMenuOpen size={22} /> : <MdMenu size={22} />}
          </div>
          {clearPath === '/editor' && (
            <>
              <PenInfo />
              <EditorControls />
            </>
          )}
          {clearPath === '/editin' && <EditorControls />}
          {clearPath !== '/editor' && clearPath !== '/editin' && (
            <form className={styles.header__form}>
              <label className={styles['header__form-label']}>
                <Magnifier className={styles['header__form-icon']} />
                <input className={styles.header__input} type="text" placeholder="Search CodePen..." />
              </label>
            </form>
          )}
          {clearPath !== '/editin' && (
            <div className={styles.header__buttons}>
              {isAuth ? (
                <>
                  <div onClick={() => onClickLogout()} className="button">
                    Log Out
                  </div>
                  <NavLink ref={homeLinkRef} to="/" hidden></NavLink>
                  <NavLink to="/profile">
                    <img className={styles.header__avatar} src={userAvatar} title="Profile" alt="avatar" />
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink className={cn(styles.header__button, 'button')} style={setLoginButton} to="/register">
                    Sign Up
                  </NavLink>
                  <NavLink className="button" style={setLoginButton} to="/login">
                    Log In
                  </NavLink>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ style: { backgroundColor: '#1e1f26', color: 'white', paddingBottom: '20px' } }}
      >
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>Are you sure you want to Log Out?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} sx={{ minWidth: '105px' }}>
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} sx={{ minWidth: '105px' }}>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </header>
  );
};
