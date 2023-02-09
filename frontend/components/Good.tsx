import React from 'react';
import { HiPlusSm } from 'react-icons/hi';
import { AiFillStar } from 'react-icons/ai';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { Product } from '../types';
import { urlFor } from '../utils/client';

const Good = ({ product }: { product: Product }) => {
  const router = useRouter();

  return (
    <div className='relative flex justify-end bg-white shadow-lg w-full h-[27rem] rounded-[2.5rem] p-[3.5rem] mb-[5rem] hover:scale-105 hover:-rotate-1 transition-all duration-200 ease-in-out'>
      <div className='absolute -top-[4rem] left-[4.5rem] rounded-full overflow-hidden'>
        <Image
          className='rounded-full shadow-lg'
          src={urlFor(product.image).url()}
          blurDataURL={urlFor(product.image).url()}
          alt='product'
          placeholder='blur'
          width={100}
          height={100}
        />
      </div>

      {product.isDiscount ? (
        <div className='absolute top-[7.5rem] right-[3rem] flex items-center justify-center rotate-6 bg-red-500 text-white px-4 py-2 rounded-[1rem] font-bold'>
          ON SALE
        </div>
      ) : null}

      <div className='absolute left-[3.5rem] bottom-[3.5rem]'>
        <p className='mb-10 text-[2rem] font-medium text-text-3'>
          {product.name}
        </p>

        <button
          className='flex items-center justify-center text-[1.5rem] w-[10.6rem] h-[4.5rem] rounded-2xl border-[1.5px] border-gray-200 text-text-3 font-medium'
          onClick={() => router.push(`/products/${product.slug.current}`)}
        >
          加入
          <HiPlusSm className='text-[2rem] ml-4 text-text-3' />
        </button>
      </div>

      <div className='flex flex-col items-end justify-between'>
        <div className='flex items-center gap-3 text-asparagus-3'>
          <AiFillStar className='text-[1.8rem] text-bold' />
          <span className='text-[1.8rem] font-medium'>{product.rating}/5</span>
        </div>

        <div className='flex flex-col items-end'>
          <span
            className={`${
              !product.isDiscount
                ? 'text-red-600 text-[2.2rem] font-bold'
                : 'text-[1.5rem] font-medium text-3 line-through text-text-1'
            }`}
          >
            {`$ ${product.price}`}
          </span>
          {product.isDiscount ? (
            <span className='text-red-600 text-[2.2rem] font-bold'>
              {`$ ${product.discountPrice}`}
            </span>
          ) : null}
          <span className='text-[1.5rem] font-medium text-gray-400'>
            {`/ ${product.amount} g`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Good;
