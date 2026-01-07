import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { getUserState } from '@slices';

export const AppHeader: FC = () => {
  const user = useSelector(getUserState).user;
  return <AppHeaderUI userName={user ? user.name : ''} />;
};
