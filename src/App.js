import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import NotificationBar from "./components/UI/NotificationBar";
import { fetchCartData, sendCartData } from "./store/cart-actions";

// var initialRun = true;

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart); // useSelector subscriptions to redux. so when cart changes, app component rerenders. hence below api call re-executes.
  const notificaton = useSelector((state) => state.ui.notificationData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartData());
  },[dispatch]);

  useEffect(() => {
    // if (initialRun) {
    //   initialRun = false;
    //   return;
    // } 

  if(cart.changed) {
    dispatch(sendCartData(cart));
  }

  }, [cart, dispatch]);

  /* // CALLING API IN COMPONENT
  useEffect(() => {
    async function updateCart() {
      
      dispatch(
        uiActions.showNotification({
          status: "Pending",
          title: "Sending...",
          message: "Sending cart Data!",
        })
      );

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

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Cart updated successfully!",
        })
      );
    }

    if (initialRun) {
      initialRun = false;
      return;
    }
    updateCart().catch((error) => {
      console.log(error);
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Failed!",
          message: "Cart updated Failure!",
        })
      );
    });
  }, [cart, dispatch]);
  */

  return (
    <>
      {notificaton && (
        <NotificationBar
          status={notificaton.status}
          title={notificaton.status}
          message={notificaton.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
