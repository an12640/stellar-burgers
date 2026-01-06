import { getFeedsApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@store";
import { TOrder } from "@utils-types";

type OrderState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

const initialState: OrderState = {
  orders: [],
  total: 0,
  totalToday: 0
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
  }
});

export const getOrders = createAsyncThunk(
  'user/orders',
  async () => await getFeedsApi()
);

export const ordersSelector = (state: RootState): OrderState =>
  state.order;
