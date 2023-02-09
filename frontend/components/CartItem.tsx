import React from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';

import { Product } from '../types';
import { urlFor } from '../utils/client';
import { calcFianlPrice } from '../utils/utilFns';
import { useStateContext } from '../context/StateContext';

const CartItem = ({ item }: { item: Product }) => {
  const { updateQty } = useStateContext();

  return (
    <div className='mb-[5rem]'>
      <div className='flex items-center'>
        <img
          className='w-[7.5rem] h-[7.5rem] mr-[3rem] rounded-full shadow-lg'
          src={urlFor(item.image).url()}
          alt='item image'
        />

        <div className='flex flex-col justify-between w-full gap-4 text-text-3'>
          <p className='text-[2rem] font-medium'>{item.name}</p>

          <div className='flex items-center justify-between'>
            <div className='flex items-center justify-between bg-white text-text-3 border-[1.5px] rounded-[0.6rem] w-[10rem] h-[3rem] px-[1.2rem] py-[1.5rem]'>
              <span onClick={() => updateQty(item, -1)}>
                <FiMinus className='font-semibold cursor-pointer' />
              </span>
              <span className='font-medium'>{item.qty}</span>
              <span onClick={() => updateQty(item, 1)}>
                <FiPlus className='font-semibold cursor-pointer' />
              </span>
            </div>

            <p className='text-[1.5rem]'>{calcFianlPrice(item)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
