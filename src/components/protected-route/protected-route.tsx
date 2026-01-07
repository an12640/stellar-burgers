import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getUserState } from '@slices';

export enum AccessMode {
  AuthenticatedOnly,
  UnauthenticatedOnly
}

type ProtectedRouteProps = {
  children: React.ReactElement;
  accessMode?: AccessMode;
};

export const ProtectedRoute = ({
  children,
  accessMode = AccessMode.AuthenticatedOnly
}: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthenticated = useSelector(getUserState).isAuthenticated;
  if (accessMode == AccessMode.AuthenticatedOnly && !isAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (accessMode == AccessMode.UnauthenticatedOnly && isAuthenticated) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
