import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '@store';
import { getIngredientState } from '@slices';
import { Params, useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const ingredients = useSelector(getIngredientState).ingredients;
  const params = useParams<{id: string}>();
  const ingredientData = ingredients.find(ingredient => ingredient._id === params.id!);
  
  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
