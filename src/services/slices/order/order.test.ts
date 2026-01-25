import { TOrder } from '@utils-types';
import {
  getFeeds,
  getOrderByNumber,
  getOrders,
  orderSlice,
  OrderState
} from './order';
import { TOrderResponse } from '@api';

describe('Тесты редьюсеров слайса заказов', () => {
  const initialState: OrderState = {
    orders: [],
    total: 0,
    totalToday: 0,
    currentOrder: null
  };

  const orderMock: TOrder = {
    _id: '696ced5ea64177001b327cc5',
    status: 'done',
    name: 'Фалленианский антарианский флюоресцентный бургер',
    createdAt: '2026-01-18T14:25:34.918Z',
    updatedAt: '2026-01-18T14:25:35.142Z',
    number: 99145,
    ingredients: [
      '643d69a5c3f7b9001cfa093d', // bun
      '643d69a5c3f7b9001cfa0947', // main
      '643d69a5c3f7b9001cfa0945', // sauce
      '643d69a5c3f7b9001cfa093d' // bun (вторая)
    ]
  };
  const ordersMock: TOrder[] = [
    {
      _id: '69760919a64177001b328912',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Био-марсианский краторный бургер',
      createdAt: '2026-01-25T12:14:17.723Z',
      updatedAt: '2026-01-25T12:14:18.040Z',
      number: 99547
    },
    {
      _id: '697607b7a64177001b32890d',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Био-марсианский флюоресцентный бургер',
      createdAt: '2026-01-25T12:08:23.472Z',
      updatedAt: '2026-01-25T12:08:23.826Z',
      number: 99546
    },
    {
      _id: '69760740a64177001b32890b',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093f',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Метеоритный бессмертный краторный бургер',
      createdAt: '2026-01-25T12:06:24.524Z',
      updatedAt: '2026-01-25T12:06:24.805Z',
      number: 99545
    }
  ];

  test('Получение ленты всех заказов', () => {
    const feeds = {
      success: true,
      orders: ordersMock,
      total: 12345,
      totalToday: 3
    };

    const nextState = orderSlice.reducer(
      initialState,
      getFeeds.fulfilled(feeds, 'fulfilled')
    );
    expect(nextState.currentOrder).toBe(null);
    expect(nextState.orders).toEqual(ordersMock);
    expect(nextState.total).toBe(12345);
    expect(nextState.totalToday).toBe(3);
  });

  test('Получение заказов пользователя', () => {
    const nextState = orderSlice.reducer(
      initialState,
      getOrders.fulfilled(ordersMock, 'fulfilled')
    );
    expect(nextState.currentOrder).toBe(null);
    expect(nextState.orders).toEqual(ordersMock);
    expect(nextState.total).toBe(0);
    expect(nextState.totalToday).toBe(0);
  });

  test('Получение информации о заказе', () => {
    const orderInfo: TOrderResponse = {
      success: true,
      orders: [orderMock]
    };

    const nextState = orderSlice.reducer(
      initialState,
      getOrderByNumber.fulfilled(orderInfo, 'fulfilled', 1)
    );
    expect(nextState.currentOrder).toBe(orderMock);
    expect(nextState.orders).toEqual([]);
    expect(nextState.total).toBe(0);
    expect(nextState.totalToday).toBe(0);
  });
});
