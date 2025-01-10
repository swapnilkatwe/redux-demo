import { uiActions } from "./ui-slice";

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