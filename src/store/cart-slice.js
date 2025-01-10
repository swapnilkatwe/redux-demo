import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], totalQuantity: 0, changed: false },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const payloadItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === payloadItem.id
      );
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          name: payloadItem.title,
          id: payloadItem.id,
          price: payloadItem.price,
          quantity: 1,
          totalPrice: payloadItem.price,
        }); // redux toolkit will manage this push internally by creating seperate object and doing all operations to push in immutable way. Normally we can not and should not directly update the redux object.
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + payloadItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const payloadId = action.payload;
      const existingItem = state.items.find((item) => item.id === payloadId);
      state.totalQuantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== payloadId);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
