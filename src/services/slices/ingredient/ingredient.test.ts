import { fetchIngredients, ingredientSlice, IngredientState } from '@slices';
import { TIngredient } from '@utils-types';

describe('Тесты редьюсеров слайса ингредиентов', () => {
  const initialState: IngredientState = {
    ingredients: [],
    isIngredientsLoading: false
  };

  const bun: TIngredient = {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200igogo',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };

  const mainIngredient: TIngredient = {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  };

  const sauceIngredient: TIngredient = {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  };

  test('Ожидание загрузки ингредиентов', () => {
    const nextState = ingredientSlice.reducer(
      initialState,
      fetchIngredients.pending('pending')
    );
    expect(nextState.ingredients).toEqual([]);
    expect(nextState.isIngredientsLoading).toBe(true);
  });

  test('Отклонение загрузки ингредиентов', () => {
    const nextState = ingredientSlice.reducer(
      initialState,
      fetchIngredients.rejected(null, 'rejected')
    );
    expect(nextState.ingredients).toEqual([]);
    expect(nextState.isIngredientsLoading).toBe(false);
  });

  test('Успешная загрузка ингредиентов', () => {
    const testIngredients = [bun, mainIngredient, sauceIngredient];
    const nextState = ingredientSlice.reducer(
      initialState,
      fetchIngredients.fulfilled(testIngredients, 'fulfilled')
    );
    expect(nextState.ingredients).toEqual(testIngredients);
    expect(nextState.isIngredientsLoading).toBe(false);
  });
});
