import { getOrders, ordersSelector } from '@slices';
import { useDispatch, useSelector } from '@store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(ordersSelector).orders;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);
  
  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => {dispatch(getOrders())}} />;
};
