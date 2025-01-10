import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCartData = () => {
    
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://redux-demo-dac39-default-rtdb.firebaseio.com/cart.json"
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch cart data");
      }
      const responseData = response.json();
      return responseData;
    };

    try {
      const cartData = await sendRequest();
      dispatch(cartActions.replaceCart({items: cartData.items || [], totalQuantity: cartData.totalQuantity}));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Failed!",
          message: "Cart Fetching Failure!",
        })
      );
    }
  };
};

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
          body: JSON.stringify({items: cart.items, totalQuantity: cart.totalQuantity}),
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
