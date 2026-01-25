import { combineReducers } from "@reduxjs/toolkit";
import { constructorSlice, ingredientSlice, orderSlice, userSlice } from "@slices";
import { rootReducer } from "@store";

describe('Тестирование rootReducer', () => {
  test('RootReducer инициирован undefined состоянием, unknown action', () => {
    const initialState = rootReducer(undefined, {type: 'UNKNOWN_ACTION'});
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
  });

  test('RootReducer инициирован состоянием, unknown action', () => {
    const rootState = {
      user: {
        user: {
          email: 'user@gmail.com',
          name: 'testuser'
        },
        isAuthenticated: true
      },
      ingredient: {
        ingredients: [
          {
            _id: '1',
            name: 'Тестовая булка',
            type: 'bun',
            proteins: 10,
            fat: 10,
            carbohydrates: 10,
            calories: 100,
            price: 100,
            image: 'img',
            image_mobile: 'img',
            image_large: 'img'
          }
        ],
        isIngredientsLoading: false
      },
      constructorItems: {
        constructorItems: {
          bun: null,
          ingredients: []
        },
        orderRequest: false,
        orderModalData: null,
        loading: false,
        error: null
      },

      order: {
        orders: [
          {
            _id: 'order-1',
            status: 'done',
            name: 'Тестовый бургер',
            createdAt: '2026-01-01',
            updatedAt: '2026-01-01',
            number: 1,
            ingredients: ['1', '2']
          }
        ],
        total: 1,
        totalToday: 1,
        currentOrder: null
      }
    };

    const nextState = rootReducer(rootState, {type: 'UNKNOWN_ACTION'});
    expect(nextState).toEqual(rootState);
  })
});
