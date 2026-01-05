import { getIngredientsApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@store";
import { TIngredient } from "@utils-types";

export type IngredientState = {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
};

const initialState: IngredientState = {
  ingredients: [],
  isIngredientsLoading: false
};

export const fetchIngredients = createAsyncThunk(
  'ingredient/fetch',
  getIngredientsApi
);

export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.ingredients = [];
      state.isIngredientsLoading = true;
    });
    builder.addCase(fetchIngredients.rejected, (state) => {
      state.ingredients = [];
      state.isIngredientsLoading = false;
    });
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload;
      state.isIngredientsLoading = false;
    });
  }
});

export const getIngredientState = (state: RootState): IngredientState => state.ingredient;
