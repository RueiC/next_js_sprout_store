import { FiMinus, FiPlus, FiCheckCircle } from 'react-icons/fi';
import { GetStaticProps, NextPage } from 'next';

import type { ProductDetail, Product } from '../../types';
import { HomeSection, CommentFiled } from '../../components';
import { client, urlFor } from '../../utils/client';
import { calcFianlPrice } from '../../utils/utilFns';
import { getProduct, getProducts, getProductPaths } from '../../utils/queries';
import { useStateContext } from '../../context/StateContext';

type ProductPath = {
  params: {
    id: string;
  };
};

interface StaticPaths {
  paths: ProductPath[];
  fallback: string;
}

interface StaticProps {
  props: {
    product: ProductDetail;
    otherProducts: Product[];
  };
  revalidate: number;
}

interface Props {
  product: ProductDetail;
  otherProducts: Product[];
}

export const getStaticPaths = async (): Promise<StaticPaths> => {
  const productPaths: ProductPath[] = await client
    .fetch(getProductPaths)
    .then((paths) =>
      paths.map((path: { _id: string }) => {
        return {
          params: {
            productId: path._id,
          },
        };
      }),
    );

  return { paths: productPaths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}): Promise<StaticProps> => {
  const productId = params!.productId as string;

  const query: string = getProduct(productId);

  const product: ProductDetail = await client
    .fetch(query)
    .then((data) => data[0]);

  const otherProducts: Product[] = await client
    .fetch(getProducts)
    .then((data) => data);

  return {
    props: {
      product,
      otherProducts,
    },
    revalidate: 60 * 60,
  };
};

const ProductDetailPage: NextPage<Props> = ({ product, otherProducts }) => {
  const { qty, incQty, decQty, addToCart } = useStateContext();

  return (
    <>
      {product ? (
        <div className='flex flex-col gap-[14rem] px-[8rem] md:px-[16rem]'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-[5rem] md:gap-[5rem]'>
            <div className='flex items-center justify-center w-full'>
              <img
                className='w-[30rem] h-[30rem] md:w-[45rem] md:h-[45rem]  rounded-full shadow-xl hover:scale-105 transition-all duration-300 ease-in-out'
                src={urlFor(product.image).url()}
                alt='product image'
              />
            </div>

            <div className='flex flex-col gap-[4rem] w-full'>
              <h1 className='text-[5.5rem] font-bold text-heading-1'>
                {product.name}
              </h1>

              <div className='flex flex-col gap-[3rem]'>
                <div className='flex items-center justify-start gap-[3rem]'>
                  <div className='flex items-center justify-center gap-4 rounded-[1.5rem] border-[1.5px] px-[2rem] py-[1rem] text-asparagus-3 border-asparagus-3'>
                    <p className='font-medium text-[1.5rem]'>有庫存</p>
                    <FiCheckCircle className='font-semibold text-[2rem]' />
                  </div>
                  <span className='text-text-1'>運送： 1-3 個工作天</span>
                </div>

                <div className='flex items-center justify-start gap-[5rem] text-text-2'>
                  <div className='flex flex-col gap-[2.5rem] text-[2rem] font-medium'>
                    <p>國家：</p>
                    <p>品牌：</p>
                  </div>
                  <div className='flex flex-col gap-[2.5rem] text-[2rem] font-medium'>
                    <p>{product.country}</p>
                    <p>{product.brand}</p>
                  </div>
                </div>
              </div>

              <div className='flex flex-col ss:flex-row items-center justify-between w-full px-[5rem] py-[3rem] bg-white rounded-[2.5rem] shadow-sm gap-[3rem] md:gap-0'>
                <div className='flex flex-col items-center justify-center h-full ss:items-start'>
                  <p className='text-[2.5rem] font-medium text-text-3'>
                    總額: {calcFianlPrice(product, qty)}
                  </p>
                  <p className='text-[1.5rem] font-bold text-text-1'>
                    {`${calcFianlPrice(product, qty)} / ${product.amount} g`}
                  </p>
                </div>

                <div className='flex flex-col ss:flex-row items-center justify-center gap-[3rem] h-full'>
                  <div className='flex items-center justify-between bg-white text-text-3 border-[1.5px] rounded-[1.5rem] w-[16.5rem] h-full px-[2.5rem] py-[1.5rem]'>
                    <span
                      className='text-[2rem] font-semibold cursor-pointer hover:scale-125 transition-all duration-200 ease-in-out'
                      onClick={decQty}
                    >
                      <FiMinus />
                    </span>
                    <span className='font-medium'>{qty}</span>
                    <span
                      className='text-[2rem] font-semibold cursor-pointer hover:scale-125 transition-all duration-200 ease-in-out'
                      onClick={incQty}
                    >
                      <FiPlus />
                    </span>
                  </div>

                  <div
                    className='flex items-center justify-center'
                    onClick={() => addToCart(product, qty)}
                  >
                    <button
                      className='rounded-[1.5rem] bg-asparagus-3 text-white px-[3rem] py-[1.5rem] hover:scale-105 transition-all duration-300 ease-in-out'
                      type='button'
                    >
                      加入購物車
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <p className='text-[2.5rem] font-bold mb-4 text-text-3'>
                  描述:
                </p>
                <p className='text-[2rem] font-medium leading-[4rem] text-text-2'>
                  {product.details}
                </p>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-[4rem]'>
            <h2 className='text-[2.5rem] font-bold text-text-3'>顧客評論</h2>

            <CommentFiled id={product._id} />
          </div>

          {otherProducts ? (
            <div className='mb-[25rem]'>
              <HomeSection heading={'其他人也買了'} products={otherProducts} />
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default ProductDetailPage;
