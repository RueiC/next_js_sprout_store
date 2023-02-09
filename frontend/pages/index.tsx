import { GetStaticProps, NextPage } from 'next';
import type { Product, SanityImage } from '../types';
import { Hero, HomeSection, Delivery, WhatIsNew } from '../components';
import {
  getDiscountProducts,
  getTopTenNewProducts,
  getBackendImages,
} from '../utils/queries';
import { client } from '../utils/client';

interface ServerSideProps {
  props: {
    discountProducts: Product[];
    topTenNewProducts: Product[];
    backendImages: SanityImage[];
  };
}

interface Props {
  discountProducts: Product[];
  topTenNewProducts: Product[];
  backendImages: SanityImage[];
}

export const getStaticProps: GetStaticProps =
  async (): Promise<ServerSideProps> => {
    // Get discount product
    const discountProducts: Product[] = await client.fetch(getDiscountProducts);
    // Get top 10 new item
    const topTenNewProducts: Product[] = await client.fetch(
      getTopTenNewProducts,
    );
    // Get banners
    const backendImages: SanityImage[] = await client.fetch(getBackendImages);

    return {
      props: { discountProducts, topTenNewProducts, backendImages },
    };
  };

const Home: NextPage<Props> = ({
  discountProducts,
  topTenNewProducts,
  backendImages,
}) => {
  return (
    <main>
      <Hero backendImages={backendImages} />

      {discountProducts?.length > 0 && (
        <HomeSection heading={'特價商品'} products={discountProducts} />
      )}

      <HomeSection heading={'有什麼新鮮事?'} component={<WhatIsNew />} />

      {discountProducts?.length > 0 && (
        <HomeSection heading={'最新到貨'} products={topTenNewProducts} />
      )}

      <HomeSection heading={'我們如何配送?'} component={<Delivery />} />
    </main>
  );
};

export default Home;
