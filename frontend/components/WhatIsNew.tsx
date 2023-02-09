import React from 'react';
import image from '../assets/index';

const WhatIsNew = () => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-center gap-[4rem]'>
      <div className='flex flex-col items-center justify-between py-[7rem] w-[44.4rem] h-[54.5rem] rounded-[3rem] bg-watermelon-1'>
        <div className='text-center'>
          <p className='text-[3rem] text-watermelon-2 mb-[3rem] font-bold'>
            鮮萃西瓜糖
          </p>
          <p className='text-[2rem] font-medium text-text-2'>
            給你100%的西瓜鮮甜
          </p>
        </div>

        <img
          className='block w-[20rem]'
          src={image.watermelon}
          alt='Watermelon'
        />
        <div>
          <button className='text-[2rem] text-watermelon-2 border-2 border-watermelon-2 bg-watermelon-1 rounded-[1.5rem] px-14 py-5 font-medium'>
            瞭解更多
          </button>
        </div>
      </div>

      <div className='flex flex-col items-center justify-between py-[7rem] w-[44.4rem] h-[54.5rem] rounded-[3rem] bg-asparagus-1'>
        <div className='text-center'>
          <p className='text-[3rem] text-asparagus-2 mb-[3rem] font-bold'>
            鮮萃蘆薈糖
          </p>
          <p className='text-[2rem] font-medium text-text-2'>
            給你100%的蘆薈原味
          </p>
        </div>

        <img
          className='block w-[20rem]'
          src={image.asparagus}
          alt='Watermelon'
        />
        <div>
          <button className='text-[2rem] text-asparagus-2 border-2 border-asparagus-2 bg-asparagus-1 rounded-[1.5rem] px-14 py-5 font-medium'>
            瞭解更多
          </button>
        </div>
      </div>

      <div className='flex flex-col justify-between h-[54.5rem]'>
        <div className='flex flex-col justify-between bg-asparagus-3 w-[44.5rem] h-[25.5rem] px-[5.5rem] py-[3rem] rounded-[3rem] gap-[2rem]'>
          <div>
            <p className='text-white text-[4rem] font-semibold'>200+</p>
            <p className='text-white text-[2rem] font-medium'>
              新鮮健康嚴選糖果
            </p>
          </div>
          <div>
            <button
              className='text-white text-2rem font-medium border-2 border-white px-[5rem] py-[1.5rem] rounded-[1.5rem]'
              type='button'
            >
              查看更多
            </button>
          </div>
        </div>

        <div className='flex flex-col gap-6 px-[5.5rem] py-[4rem] bg-cafe-1 rounded-[3rem]'>
          <p className='block text-center w-full text-[2rem] font-medium'>
            不要錯過我們的最新消息
          </p>
          <input
            className='w-full h-[5.3rem] bg-white text-text-1 px-[4rem] rounded-[1.5rem]'
            type='text'
            placeholder='Email'
          />
          <button
            className='w-full h-[5.3rem] text-center bg-cafe-2 text-white rounded-[1.5rem]'
            type='button'
          >
            現在訂閱
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhatIsNew;
