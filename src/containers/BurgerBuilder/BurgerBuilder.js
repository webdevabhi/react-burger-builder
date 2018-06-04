import React, { Component } from 'react';
import axios from '../../axios-orders';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice : 4,
    purchasable: false,
    purchasing: false,
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({purchasable: sum > 0});
  }

  addIngredientsHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientsHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;

    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  }

  purcharseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancleHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    // alert("You Continue !");
    const order = {
      ingredients : this.state.ingredients,
      price: this.state.totalPrice,
      customer : {
        name: 'Abhishek Patel',
        adress: {
          street: 'test street 1',
          zipCode: '460001',
          country: 'India'
        },
        email: 'test@firebase.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(res => { console.log(res); })
      .catch(err => { console.error(err); });
  }

  render() {
    const disbaledInfo = {
      ...this.state.ingredients
    };
    for (let key in disbaledInfo) {
      disbaledInfo[key] = disbaledInfo[key] <= 0;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancleHandler}>
          <OrderSummary 
            ingredients={this.state.ingredients} 
            price={this.state.totalPrice}
            purchaseCanceled={this.purchaseCancleHandler} 
            purchaseContinued={this.purchaseContinueHandler} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls 
          ingredientAdded={this.addIngredientsHandler} 
          ingredientRemoved={this.removeIngredientsHandler} 
          disabled={disbaledInfo}  
          purchasable={this.state.purchasable}
          ordered={this.purcharseHandler}
          price={this.state.totalPrice} />
      </Aux>
    );
  }
}

export default BurgerBuilder;