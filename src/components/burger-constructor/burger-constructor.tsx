import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { constructorSelector, getOrderModalData, getOrderRequest, getUserState } from '@slices';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '@store';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {ingredients, bun} = useSelector(constructorSelector);
  const isAuthenticated = useSelector(getUserState).isAuthenticated;
  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrderModalData);

  // const ingredientIds = useMemo(
  //   () => ingredients.map((ingredient) => ingredient._id),
  //   [ingredients]
  // );

  // const orderIngredientIds = useMemo(() => {
  //   if (!bun) return null;

  //   return [bun._id, ...ingredientIds, bun._id];
  // }, [bun, ingredientIds]);

  const handleOrderClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // if (!orderIngredientIds) {
    //   return;
    // }

    // dispatch(getOrderBurger(orderIngredientIds));
  };

  const closeOrderModal = () => {
    // TODO: закрытие модалки
  };

  const price = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce(
      (sum: number, ingredient: TConstructorIngredient) =>
        sum + ingredient.price,
      0
    );

    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={{bun, ingredients }}
      orderModalData={orderModalData}
      onOrderClick={handleOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
