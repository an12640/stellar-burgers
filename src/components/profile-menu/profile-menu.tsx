import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';import { ProfileMenuUI } from '@ui';
import { logoutUser } from '@slices';
import { useDispatch } from '@store';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
