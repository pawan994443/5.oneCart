import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { authDataContext } from "./authContext";
import { userDataContext } from "./UserContext";

export const shopDataContext = createContext();

function ShopContext({ children }) {
  let [products, setProducts] = useState([]);
  let [search, setSearch] = useState("");
  let { userData } = useContext(userDataContext);
  let [showSearch, setShowSearch] = useState(false);
  let { serverUrl } = useContext(authDataContext);
  let [cartItem, setCartItem] = useState({});
  let currency = "₹";
  let delivery_fee = 40;

  //  Products fetch
  const getProducts = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/product/list");
      setProducts(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  //  Add to cart
  const addtoCart = async (itemId, size) => {
    if (!size) {
      console.log("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItem);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItem(cartData);

    if (userData) {
      try {
        let res = await axios.post(
          serverUrl + "/api/cart/add",
          { itemId, size },
          { withCredentials: true }
        );
        console.log("Saved in DB:", res.data);
      } catch (error) {
        console.error(
          "Error saving cart:",
          error.response?.data || error.message
        );
      }
    } else {
      console.log("User not logged in, cart only local.");
    }
  };

  //  Get user cart from DB
  const getUserCart = async () => {
    try {
      const result = await axios.post(
        serverUrl + "/api/cart/get",
        {},
        { withCredentials: true }
      );
      setCartItem(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  //  Update quantity
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItem);
    cartData[itemId][size] = quantity;
    setCartItem(cartData);

    if (userData) {
      try {
        await axios.post(serverUrl + "/api/cart/update", {
          itemId,
          size,
          quantity,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  //  Get total items count
  const getCartCount = () => {
    let totalCount = 0;
    for (const productId in cartItem) {
      for (const size in cartItem[productId]) {
        try {
          if (cartItem[productId][size] > 0) {
            totalCount += cartItem[productId][size];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  // FIXED getCartAmount
  const getCartAmount = () => {
    let totalAmount = 0;

    for (const productId in cartItem) {
      const itemInfo = products.find((product) => product._id === productId);

      if (!itemInfo) continue; // agar product load nahi hua

      for (const size in cartItem[productId]) {
        try {
          const quantity = cartItem[productId][size];
          if (quantity > 0) {
            totalAmount += itemInfo.price * quantity;
          }
        } catch (error) {
          console.error("Error calculating cart amount:", error);
        }
      }
    }

    return totalAmount;
  };

  //  Fetch products
  useEffect(() => {
    getProducts();
  }, []);

  //  Fetch cart
  useEffect(() => {
    getUserCart();
  }, []);

  let value = {
    products,
    currency,
    delivery_fee,
    getProducts,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItem,
    addtoCart,
    getCartCount,
    setCartItem,
    updateQuantity,
    getCartAmount,
  };

  return (
    <shopDataContext.Provider value={value}>
      {children}
    </shopDataContext.Provider>
  );
}

export default ShopContext;
