import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { TbDiscount2 } from 'react-icons/tb';
import Link from 'next/link';
import { GoodsSlick } from './index';
import type { Product } from '../types';

interface Props {
  heading: string;
  products?: Product[];
  component?: JSX.Element;
}

const HomeSection = ({ heading, products, component }: Props) => {
  return (
    <section className='px-[5rem] sm:px-[10rem] py-[10rem] mb-[3rem] w-full'>
      <div className='flex items-center justify-between mb-[8rem]'>
        <h2 className='flex items-center justify-center gap-4 text-[3.5rem] sm:text-[4rem] text-heading-1 font-bold'>
          <TbDiscount2 className='text-[4rem]' />
          {heading}
        </h2>

        {products ? (
          <Link href='/products'>
            <button
              className='flex items-center justify-center gap-4 text-[2rem] text-text-3 font-medium hover:scale-105 transition-all duration-200 ease-in-out'
              type='button'
            >
              查看更多
              <IoIosArrowForward className='text-[2rem]' />
            </button>
          </Link>
        ) : null}
      </div>

      {products ? <GoodsSlick products={products} /> : component}
    </section>
  );
};

export default HomeSection;
