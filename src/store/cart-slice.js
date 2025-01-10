import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], totalQuantity: 0 },
  reducers: {
    addItemToCart(state, action) {
      const payloadItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === payloadItem.id
      );
      state.totalQuantity++;

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
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== payloadId);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "Pending",
        title: "Sending...",
        message: "Sending cart Data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://redux-demo-dac39-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update product to cart!");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Cart updated successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Failed!",
          message: "Cart updated Failure!",
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;
export default cartSlice;
