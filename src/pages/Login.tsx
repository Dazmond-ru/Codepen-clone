import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

import { fetchAuth, selectIsAuth, UserData } from '../redux/slices/auth';
import styles from './auth.module.scss';

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      identifier: 'billy55',
      password: 'qwerty',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values: UserData) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      return alert('Failed to log in');
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <section className={styles.auth}>
      <div className="container">
        <div className={styles.auth__inner}>
          <h1 className={styles.auth__title}>Log In</h1>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.auth__form}>
            <TextField
              label="Name or E-Mail"
              error={Boolean(errors.identifier?.message)}
              helperText={errors.identifier?.message}
              {...register('identifier', {
                required: 'Enter correct login',
                minLength: {
                  value: 6,
                  message: 'Minimum 6 symbols',
                },
              })}
              fullWidth
            />
            <TextField
              label="Password"
              error={Boolean(errors.password?.message)}
              helperText={errors.password?.message}
              {...register('password', {
                required: 'Enter correct password',
                minLength: {
                  value: 6,
                  message: 'Minimum 6 symbols',
                },
              })}
              fullWidth
            />
            <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
              Log In
            </Button>
          </form>

          <Link
            to="https://github.com/login/oauth/authorize?client_id=c7a99918604b2ae5c655&redirect_uri=http://localhost:3033/users/github-auth?path=/&scope=user:email"
            className="button button-github"
          >
            Log In with GitHub
          </Link>
        </div>
      </div>
    </section>
  );
};
