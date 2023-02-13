import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import cartService from "../service/cart.service";
import { useAuthContext } from "./auth";

const initialState = {
  cartData: {
    records: [],
    totalRecords: 0,
  },
  updateCart: () => {},
  emptyCart: () => {},
};

export const CartContext = createContext(initialState);

export const CartWrapper = ({ children }) => {
  const authContext = useAuthContext();

  const [cartData, setCartData] = useState({
    totalRecords: 0,
    records: [],
  });
  useEffect(() => {
    updateCart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext.user.id]);

  const updateCart = () => {
    if (authContext.user.id) {
      cartService.getList(authContext.user.id).then((res) => setCartData(res));
    }
  };
  const emptyCart = () => {
    setCartData({
      totalRecords: 0,
      records: [],
    });
  };
  let value = {
    cartData,
    updateCart,
    emptyCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  return useContext(CartContext);
};
