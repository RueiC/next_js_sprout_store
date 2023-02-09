import React from 'react';
import { BsCheck } from 'react-icons/bs';

import image from '../assets/index';

const Footer = () => {
  return (
    <footer className='grid grid-cols-1 bg-background-brown-3 px-[4rem] pt-[5rem] pb-[7rem] gap-[5rem] ss:grid-cols-2 md:flex-row w-full md:flex md:justify-center md:items-center md:px-[10rem] md:gap-[15rem]'>
      <div className='flex flex-col items-start justify-center gap-[1.5rem]'>
        <img className='w-[90px]' src={image.logo_3} alt='' />

        <p className='text-[1.5rem] text-text-3'>
          生態友善食物商店
          <br />
          蹦蹦時光糖果屋有限公司
        </p>

        <p className='text-[1.5rem] text-text-2'>2022 © All right reserved</p>
      </div>

      <div className='flex flex-col items-center justify-center text-center'>
        <a className='mb-[3rem] text-[1.6rem] font-bold text-text-3' href='#'>
          公司
        </a>

        <ul className='flex flex-col gap-[1.5rem] text-[1.5rem] text-text-2'>
          <li>
            <a href='#'>關於我們</a>
          </li>
          <li>
            <a href='#'>商店</a>
          </li>
          <li>
            <a href='#'>FAQ</a>
          </li>
        </ul>
      </div>

      <div className='flex flex-col items-center justify-center text-center'>
        <a className='mb-[3rem] text-[1.6rem] font-bold text-text-3' href='#'>
          服務
        </a>

        <ul className='flex flex-col gap-[1.5rem] text-[1.5rem] text-text-2'>
          <li>
            <a href='#'>配送</a>
          </li>
          <li>
            <a href='#'>支付</a>
          </li>
          <li>
            <a href='#'>聯絡我們</a>
          </li>
        </ul>
      </div>

      <div className='flex flex-col items-center justify-center text-center'>
        <a className='mb-[3rem] text-[1.6rem] font-bold text-text-3' href='#'>
          追蹤我們
        </a>

        <ul className='flex flex-col gap-[1.5rem] text-[1.5rem] text-text-2'>
          <li>
            <a href='#'>Instagram</a>
          </li>
          <li>
            <a href='#'>Facebook</a>
          </li>
          <li>
            <a href='#'>Twitter</a>
          </li>
        </ul>
      </div>

      <div className='flex flex-col items-center justify-center text-center ss:col-span-2 gap-[3rem]'>
        <p className='text-[1.6rem] font-bold text-text-3'>我想收到優惠通知</p>

        <form className='relative'>
          <input
            className='w-[32rem] h-[5rem] rounded-[1.2rem] px-[2.5rem] text-text-1'
            type='email'
            placeholder='Email'
          />
          <div className='absolute flex items-center justify-center w-[5rem] h-[5rem] bg-cafe-2 right-0 top-0 rounded-r-[1.2rem]'>
            <BsCheck className='text-white text-[3rem]' />
          </div>
        </form>

        <div className='flex'>
          <a className='text-[1.3rem] text-text-1 block w-full'>相關條款</a>
          <a className='text-[1.3rem] text-text-1 block w-full'>隱私政策</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
