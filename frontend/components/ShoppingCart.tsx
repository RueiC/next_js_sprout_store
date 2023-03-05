import React from 'react';
import { useRouter } from 'next/router';

import { useStateContext } from '../context/StateContext';
import CartItem from './CartItem';
import { AiFillCloseCircle } from 'react-icons/ai';

const ShoppingCart = ({ mode }: { mode: string }) => {
  const { cartItems, totalPrice, setShowCart } = useStateContext();
  const router = useRouter();

  return (
    <div
      className={`absolute bg-white px-[3rem] py-[4rem] z-10 ${
        mode === 'mobile'
          ? 'top-[12rem] w-full h-[100vh] ss:px-[10rem] left-0'
          : 'top-[7rem] right-0 w-[50rem] rounded-[1.5rem] shadow-md'
      }`}
    >
      {cartItems?.length > 0 ? (
        <>
          {cartItems.map((item) => (
            <CartItem item={item} key={item._id} />
          ))}

          <div className='flex items-center justify-between'>
            <p className='inline-block'>總額： {`$ ${totalPrice}`}</p>
            <button
              className='text-[2rem] font-medium bg-asparagus-3 text-white px-10 py-5 rounded-[1.5rem] hover:scale-105 hover:opacity-90 transition-all duration-200 ease-in-out'
              onClick={() => {
                setShowCart((prevState: boolean) => !prevState);
                router.push('/checkout');
              }}
            >
              手刀購買
            </button>
          </div>
        </>
      ) : (
        <p className='flex items-center justify-center text-[2rem] font-medium'>
          購物車尚未有商品
        </p>
      )}

      {mode === 'mobile' ? (
        <AiFillCloseCircle
          className='absolute top-[3.5rem] right-[5rem] text-[3.5rem] hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer'
          onClick={() => setShowCart((prevState: boolean) => !prevState)}
        />
      ) : null}
    </div>
  );
};

export default ShoppingCart;
