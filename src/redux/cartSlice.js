"use client";

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    // reducer to add a product
    add: (state, action) => {
      state.push(action.payload);
    },
    // reducer to remove a product
    remove: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
    // reducer to increase the amount of quantity of a product
    increaseQuantity: (state, action) => {
      const productQuantity = state.find(
        (product) => product.id === action.payload
      );
      productQuantity.quantity += 1;
    },
    // reducer to decrease the amount of quantity of a product
    decreaseQuantity: (state, action) => {
      const productQuantity = state.find(
        (product) => product.id === action.payload
      );
      if (productQuantity.quantity > 1) {
        productQuantity.quantity -= 1;
      }
    },
  },
});

export const { add, remove, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
