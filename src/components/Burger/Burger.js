import React from 'react';
import classes from './Burger.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  let transformIngredients = Object.keys(props.ingredients)
    .map(igkey => {
      return [...Array(props.ingredients[igkey])].map((_, i) => {
        return <BurgerIngredient key={i + 1} type={igkey} />
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  console.log(transformIngredients);
  if (transformIngredients.length === 0) {
    transformIngredients = <p>Please start adding ingredients!</p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type={'bread-top'} />
      <BurgerIngredient type={'seeds'} />
      {transformIngredients}
      <BurgerIngredient type={'bread-bottom'} />
    </div>
  )
}

export default burger;