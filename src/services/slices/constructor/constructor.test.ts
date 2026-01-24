import { TIngredient } from "@utils-types";
import reducer, { addIngredient, ConstructorState, deleteIngredient, moveDownIngredient, moveUpIngredient } from "./constructor";

describe('Тесты редьюсеров слайса конструктора', () => {
  const initialState: ConstructorState = {
    constructorItems: {
      bun: null,
      ingredients: []
    },
    orderRequest: false,
    orderModalData: null,
    loading: false,
    error: null
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
  const mainIngredient = {
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

  const sauceIngredient = {
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

  const stateWithIngredients: ConstructorState = {
    constructorItems: {
      bun: {
        id: 'id1', 
        ...bun
      },
      ingredients: [
        {
          id: 'id2',
          ...mainIngredient
        },
        {
          id: 'id3',
          ...sauceIngredient
        }
      ]
    },
    orderRequest: false,
    orderModalData: null,
    loading: false,
    error: null
  };

  test('Добавление ингредиента)', () => {
    const nextState = reducer(initialState, addIngredient(mainIngredient));
    expect(nextState.constructorItems.bun).toEqual(null);
    expect(nextState.constructorItems.ingredients).toHaveLength(1);
    expect(nextState.constructorItems.ingredients[0]).toMatchObject(mainIngredient);
  });

  test('Добавление булки)', () => {
    const nextState = reducer(initialState, addIngredient(bun));
    expect(nextState.constructorItems.bun).toMatchObject(bun);
    expect(nextState.constructorItems.ingredients).toHaveLength(0);
  });

  test('Удаление ингредиента', () => {
    const nextState = reducer(stateWithIngredients, deleteIngredient('id2'));
    expect(nextState.constructorItems.ingredients).toHaveLength(1);
    expect(nextState.constructorItems.bun).toMatchObject(bun);
  });

  test('Изменение порядка ингредиентов в начинке', () => {
    const nextState = reducer(stateWithIngredients, moveUpIngredient('id3'));
    expect(nextState.constructorItems.ingredients.map(i => i.id))
      .toEqual(['id3', 'id2']);

    const nextState2 = reducer(stateWithIngredients, moveDownIngredient('id2'));
    expect(nextState2.constructorItems.ingredients.map(i => i.id))
      .toEqual(['id3', 'id2']);
  });
});
