import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import image from '../assets/index';
import { urlFor } from '../utils/client';

import { SanityImage } from '../types';

const Hero = ({ backendImages }: { backendImages: SanityImage[] }) => {
  return (
    <section>
      <div className='relative sm:flex sm:items-center sm:justify-center sm:gap-8 px-[3rem]'>
        <div className='hidden sm:block'>
          <Image
            className='rounded-[3rem] h-full'
            src={urlFor(backendImages[0].image.asset.url).url()}
            blurDataURL={urlFor(backendImages[0].image.asset.url).url()}
            alt='banner'
            placeholder='blur'
            width={2660}
            height={1256}
          />
        </div>

        <div className='hidden h-full sm:block'>
          <Image
            className='rounded-[3rem]'
            src={urlFor(backendImages[1].image.asset.url).url()}
            blurDataURL={urlFor(backendImages[1].image.asset.url).url()}
            alt='banner'
            placeholder='blur'
            width={1200}
            height={1256}
          />
        </div>

        <div className='sm:absolute sm:top-0 sm:left-0 flex items-center justify-start px-[5rem] sm:pl-[10rem] py-[5rem] w-full h-full'>
          <div className='w-[55rem]'>
            <div className='w-[98px]'>
              <img className='w-full' src={image.logo_3} alt='logo' />
            </div>
            <h1 className='text-[3rem] md:text-[3.8rem] font-semibold mb-[2rem] md:mb-[3.5rem] tracking-widest text-heading-1'>
              初芽時光糖果屋
            </h1>
            <p className='text-[1.8rem] md:text-[2.5rem] font-normal mb-9 tracking-wider text-text-3'>
              精選眾多外國進口商品，滿足挑惕的你！不管是古早懷舊零食，還是現在最新潮的糖果餅乾，我們都都都有供應！
            </p>
            <Link href='/products'>
              <button className='text-[1.5rem] md:text-[2rem] font-medium bg-asparagus-3 text-white px-10 py-5 rounded-[1.5rem]'>
                瀏覽商品
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
