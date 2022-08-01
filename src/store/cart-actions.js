import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

// Action Creators Thunks:

// Function to fetch Cart data in Firebase
export const fetchCartData = () => {
  return async (dispatch) => {
    // GET request to Firebase
    const fetchData = async () => {
      // Firebase URL
      const response = await fetch(
        "https://react-http-4b011-default-rtdb.europe-west1.firebasedatabase.app/cart.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();
      return data;
    };

    try {
      // In case of success fetching
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData?.items || [],
          totalQuantity: cartData?.totalQuantity || 0,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};

// Function to send Cart data to Firebase
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    // PUT request to Firebase
    const sendRequest = async () => {
      // Firebase URL
      const response = await fetch(
        "https://react-http-4b011-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    // In case of no error: sends the request & shows success notification
    // otherwise error notification
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};
