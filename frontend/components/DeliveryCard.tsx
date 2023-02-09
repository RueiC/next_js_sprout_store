import React from 'react';

interface Props {
  imgUrl: string;
  title: string;
  text: string;
}

const DeliveryCard = ({ imgUrl, title, text }: Props) => {
  return (
    <div className='flex items-center justify-between w-[30rem] gap-16 hover:scale-110 transition-all duration-200 ease-in-out'>
      <img className='w-[8rem]' src={imgUrl} alt='image' />
      <div>
        <p className='text-[2.5rem] font-bold mb-4'>{title}</p>
        <p className='text-[1.8rem] font-medium'>{text}</p>
      </div>
    </div>
  );
};

export default DeliveryCard;
