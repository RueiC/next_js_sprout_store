import React from 'react';
import { DeliveryCard } from './index';
import { deliveries } from '../utils/data';

const Delivery = () => {
  return (
    <div className='flex flex-col items-center justify-between gap-20 ss:flex-row ss:flex-wrap'>
      {deliveries.map((delivery) => (
        <DeliveryCard key={delivery.imgUrl} {...delivery} />
      ))}
    </div>
  );
};

export default Delivery;
