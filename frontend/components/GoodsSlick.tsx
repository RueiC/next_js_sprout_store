import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

import { Product } from '../types';
import Good from './Good';

const SampleNextArrow = (props: any): JSX.Element => {
  const { className, style, onClick } = props;

  return (
    <div
      className={className}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props: any): JSX.Element => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    />
  );
};

const getWindowDimensions = (): { width: number; height: number } => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

const GoodsSlick = ({ products }: { products: Product[] }) => {
  const [slidesToShowNum, setSlidesToShowNum] = useState<number | undefined>(
    undefined,
  );

  useEffect(() => {
    const handleResize = (): void => {
      const screenSize = getWindowDimensions().width;
      if (screenSize <= 690) setSlidesToShowNum(1);
      if (screenSize >= 880) setSlidesToShowNum(2);
      if (screenSize >= 900) setSlidesToShowNum(3);
      if (screenSize >= 1100) setSlidesToShowNum(4);
      if (screenSize >= 1400) setSlidesToShowNum(5);
      if (screenSize >= 1600) setSlidesToShowNum(6);
    };

    if (!slidesToShowNum) {
      handleResize();
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    // slidesToShow: products.length < 4 ? products.length : 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <Slider {...settings} slidesToShow={slidesToShowNum}>
      {products
        ? products.map((product) => (
            <div
              className='flex items-center justify-center px-8 py-20'
              key={product.name}
            >
              <Good product={product} key={product._id} />
            </div>
          ))
        : null}
    </Slider>
  );
};

export default GoodsSlick;
