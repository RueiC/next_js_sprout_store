import { useState, useEffect } from 'react';

import { Product } from '../types';
import Good from './Good';

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

const GoodsLayout = ({ products }: { products: Product[] }) => {
  const [colsNum, setColsNum] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = (): void => {
      const screenSize: number = getWindowDimensions().width;

      if (screenSize < 700) setColsNum('grid-cols-1');
      if (screenSize >= 700) setColsNum('grid-cols-2');
      if (screenSize >= 1300) setColsNum('grid-cols-3');
      if (screenSize >= 1500) setColsNum('grid-cols-4');
      if (screenSize >= 1800) setColsNum('grid-cols-5');
    };

    if (!colsNum) {
      handleResize();
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`grid ${colsNum} gap-[5rem]`}>
      {products
        ? products.map((product) => (
            <Good product={product} key={product._id} />
          ))
        : null}
    </div>
  );
};

export default GoodsLayout;
