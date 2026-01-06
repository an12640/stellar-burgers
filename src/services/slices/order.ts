import { getFeedsApi, getOrderByNumberApi, getOrdersApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@store";
import { TOrder } from "@utils-types";

type OrderState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  currentOrder: TOrder | null;
};

const initialState: OrderState = {
  orders: [],
  total: 0,
  totalToday: 0,
  currentOrder: null,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getFeeds.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
    builder.addCase(getOrderByNumber.fulfilled, (state, action) => {
      if (action.payload.orders.length !== 0)
        state.currentOrder = action.payload.orders[0];
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  }
});

export const getFeeds = createAsyncThunk(
  'feeds',
  async () => await getFeedsApi()
);

export const getOrders = createAsyncThunk(
  'user/orders',
  async () => await getOrdersApi()
);

export const getOrderByNumber = createAsyncThunk(
  'user/orderByNumber',
  async (number: number) => await getOrderByNumberApi(number)
);

export const ordersSelector = (state: RootState): OrderState =>
  state.order;
