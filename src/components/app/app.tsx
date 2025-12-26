import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AccessMode, ProtectedRoute } from '../protected-route/protected-route';
import { useEffect } from 'react';
import { fetchUser } from '../../slices/user';
import { useDispatch } from '../../services/store';

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={
          <ProtectedRoute accessMode={AccessMode.UnauthenticatedOnly}>
            <Login />
          </ProtectedRoute>
          } />
        <Route path='/register' element={
          <ProtectedRoute accessMode={AccessMode.UnauthenticatedOnly}>
            <Register />
          </ProtectedRoute>
          } />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile'>
          <Route index element={<Profile />} />
          <Route path='orders' element={<ProfileOrders />} />
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='' onClose={() => {}}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='' onClose={() => {}}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='' onClose={() => {}}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
