import axios from 'axios';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import { toast } from 'react-toastify';
import type { User, Product } from '../types';

interface defaultValue {
  user: User | null;
  showCart: boolean;
  cartItems: Product[];
  totalPrice: number;
  qty: number;
  totalQty: number;
  incQty: () => void;
  decQty: () => void;
  clearCart: () => void;
  // eslint-disable-next-line no-unused-vars
  updateQty: (product: Product, amount: number) => void;
  // eslint-disable-next-line no-unused-vars
  addToCart: (product: Product, qty: number) => void;
  setShowCart: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<React.SetStateAction<User | null>>;
  getUser: () => Promise<void>;
}

const Context = createContext({} as defaultValue);

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [qty, setQty] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQty, setTotalQty] = useState<number>(0);

  useEffect(() => {
    if (!cartItems) return;

    const sum = cartItems.reduce((prev: number, cur: Product): number => {
      if (cur.isDiscount) {
        return prev + cur!.discountPrice! * cur.qty;
      } else {
        return prev + cur.price * cur.qty;
      }
    }, 0);

    setTotalPrice(sum);
  }, [cartItems]);

  const getUser = async () => {
    const userRes = await axios
      .get('/api/get-user')
      .then((data) => JSON.parse(data.data.body));

    if (userRes) setUser(userRes);
  };

  useEffect(() => {
    if (user === null) getUser();
  }, []);

  const clearCart = (): void => {
    setCartItems([]);
    setQty(1);
    setTotalPrice(0);
    setTotalQty(0);
  };

  const checkProductInCart = (product: Product): Product | undefined => {
    return cartItems.find((item: Product): boolean => item._id === product._id);
  };

  const addToCart = (product: Product, qty: number): void => {
    if (!product || !qty) return;
    // check if exist
    toast('已新增商品至購物車', { type: 'success' });

    if (checkProductInCart(product)) {
      updateCart(product, qty);
      return;
    }

    // set item qty
    product.qty = qty;

    // set totalQty
    setTotalQty((prevTotalQty) => prevTotalQty + qty);

    // push Item
    setCartItems((prevItems) => [{ ...product }, ...prevItems]);

    // clear Qty
    setQty(1);
  };

  const updateCart = (product: Product, qty: number): void => {
    if (!product || !qty) return;

    // set item qty
    product.qty = product.qty + qty;

    // set totalQty
    setTotalQty((prevTotalQty) => prevTotalQty + qty);

    // filter old cartItems
    const newCartItems: Product[] = cartItems.filter(
      (cartItem) => cartItem._id !== product._id,
    );

    // new cartItems
    newCartItems.push({ ...product });

    // push Item
    setCartItems(newCartItems);

    // clear Qty
    setQty(1);
  };

  const incQty = (): void => {
    setQty((prevQty: number) => prevQty + 1);
  };

  const decQty = (): void => {
    setQty((prevQty): number => prevQty - 1);
  };

  const updateQty = (product: Product, amount: number): void => {
    if (product.qty < 0) return;

    // update item qty
    product.qty = product.qty + amount;

    // set totalQty
    setTotalQty((prevTotalQty: number) => prevTotalQty + amount);

    // filter old cartItems
    const newCartItems: Product[] = cartItems.filter(
      (cartItem) => cartItem._id !== product._id,
    );

    if (product.qty === 0) {
      setCartItems(newCartItems);
      return;
    }

    // new cartItems
    newCartItems.push({ ...product });

    // push Item
    setCartItems(newCartItems);
  };

  return (
    <Context.Provider
      value={{
        user,
        showCart,
        cartItems,
        totalPrice,
        qty,
        totalQty,
        incQty,
        decQty,
        updateQty,
        addToCart,
        setShowCart,
        clearCart,
        setUser,
        getUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
