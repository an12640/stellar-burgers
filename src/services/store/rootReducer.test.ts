import { combineReducers } from "@reduxjs/toolkit";
import { constructorSlice, ingredientSlice, orderSlice, userSlice } from "@slices";
import { rootReducer } from "@store";

describe('Тестирование rootReducer', () => {
  test('RootReducer инициирован и undefined состоянием', () => {
    const initialState = rootReducer(undefined, {type: ''});
    expect(initialState.ingredient).toEqual(
      ingredientSlice.getInitialState()
    );
    expect(initialState.constructorItems).toEqual(
      constructorSlice.getInitialState()
    );
    expect(initialState.order).toEqual(
      orderSlice.getInitialState()
    );
    expect(initialState.user).toEqual(
      userSlice.getInitialState()
    );
  })
});
