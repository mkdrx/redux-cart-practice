import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      // No matter if there is an existing item or not, the quantity increases and sets the changed state
      state.totalQuantity++;
      state.changed = true;

      // Check if added item already exists, if it doesn't => push the object to the cart array
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
        // If item is already in the basket, updates the quantity by 1 and the total price
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      // Checks if the item already exists
      const existingItem = state.items.find((item) => item.id === id);

      state.totalQuantity--;
      state.changed = true;

      // Remove item if there's only one item
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      }
      // Reduce item by 1 from the cart array & update the total price
      else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
