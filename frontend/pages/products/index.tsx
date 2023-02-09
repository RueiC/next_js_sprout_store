import { useState, useEffect, ChangeEvent } from 'react';
import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import type { Product } from '../../types';
import { GoodsLayout } from '../../components';
import { getProducts } from '../../utils/queries';
import { client } from '../../utils/client';
import { countries, amounts, sorting } from '../../utils/data';
import useSendQuery from '../../hooks/useSendQuery';

interface ServerSideProps {
  props: {
    data: Product[];
  };
}
interface Props {
  data: Product[];
}

export const getStaticProps: GetStaticProps =
  async (): Promise<ServerSideProps> => {
    const data = await client.fetch(getProducts);

    return {
      props: { data },
    };
  };

const Browse: NextPage<Props> = ({ data }) => {
  const [countryOption, setCountryOption] = useState<string[]>(['不限']);
  const [amountOption, setAmountOption] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('無');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [products, setProducts] = useState<Product[]>(data);
  const router = useRouter();

  const handleCountryFilter = (e: ChangeEvent<HTMLInputElement>): void => {
    const { checked, value } = e.target;

    if (checked && value !== '不限') {
      setCountryOption((pre) => {
        return [...pre, value].filter((opt) => {
          return opt !== '不限';
        });
      });
    } else {
      setCountryOption((pre) => {
        return [...pre.filter((option) => option !== value)];
      });
    }

    if (checked && value === '不限') {
      setCountryOption(['不限']);
    }
  };

  const handleAmountFilter = (e: ChangeEvent<HTMLInputElement>): void => {
    const { checked, value } = e.target;

    const filteredValue = amounts.find((item) => item.value === value)!;

    if (checked && filteredValue.name !== '不限') {
      setAmountOption(filteredValue.value);
    } else if (checked && filteredValue.name === '不限') {
      setAmountOption('');
    }
  };

  useSendQuery({
    countryOption,
    amountOption,
    sortOption,
    searchQuery,
    setProducts,
  });

  useEffect(() => {
    if (!router) return;

    const query = router.query.query as string;
    if (query) setSearchQuery(query);
  }, [router]);

  return (
    <div className='flex gap-[8rem] justify-center px-[5rem] md:px-[16rem]'>
      <div className='md:flex flex-col gap-[4.5rem] justify-start w-[32.5rem] hidden'>
        <h2 className='block text-[2.8rem] font-bold text-text-3'>篩選</h2>
        <div className='flex flex-col gap-[2rem]'>
          <p className='block text-[2rem] text-text-2'>產地</p>
          <input
            className='block w-[32rem] h-[5rem] bg-white border-2 rounded-[1.2rem] px-6 outline-none text-black/60'
            type='text'
            placeholder='品牌名稱'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <ul className='flex flex-col gap-[1.5rem]'>
            <li>
              <input
                className='mr-6 cursor-pointer'
                type='checkbox'
                name='不限'
                value='不限'
                checked={countryOption.includes('不限') ? true : false}
                onChange={handleCountryFilter}
              />
              <label
                className='text=[1.5rem] text-text-2 cursor-pointer'
                htmlFor=''
              >
                {'不限'}
              </label>
            </li>
            {countries.map((country) => (
              <li key={country.name}>
                <input
                  className='mr-6 cursor-pointer'
                  type='checkbox'
                  name={country.name}
                  value={country.name}
                  checked={countryOption.includes(country.name) ? true : false}
                  onChange={handleCountryFilter}
                />
                <label
                  className='text=[1.5rem] text-text-2 cursor-pointer'
                  htmlFor=''
                >
                  {country.name}
                </label>
              </li>
            ))}
          </ul>
          <hr className='mt-10' />
        </div>

        <div className='flex flex-col gap-[2rem]'>
          <p className='block text-[2rem] text-text-2'>重量</p>
          <ul className='flex flex-col gap-[1.5rem]'>
            <li>
              <input
                className='mr-6 cursor-pointer'
                type='checkbox'
                name='不限'
                value='不限'
                checked={amountOption === '' ? true : false}
                onChange={handleAmountFilter}
              />
              <label
                className='text=[1.5rem] text-text-2 cursor-pointer'
                htmlFor=''
              >
                {'不限'}
              </label>
            </li>
            {amounts.map((amount) => (
              <li key={amount.name}>
                <input
                  className='mr-6 cursor-pointer'
                  type='checkbox'
                  name={amount.name}
                  value={amount.value}
                  checked={amountOption === amount.value ? true : false}
                  onChange={handleAmountFilter}
                />
                <label
                  className='text=[1.5rem] text-text-2 cursor-pointer'
                  htmlFor=''
                >
                  {amount.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='flex flex-col gap-[5rem] w-full'>
        <h2 className='block text-[5.5rem] font-bold text-right md:text-left text-heading-1'>
          特選糖果
        </h2>

        <div className='flex items-center justify-between mb-[8rem]'>
          <p className='block text-[2rem] font-medium text-text-2'>
            {products.length} 件商品
          </p>

          <div>
            <label
              className='text-[1.5rem] font-medium mr-8 text-text-2'
              htmlFor=''
            >
              排列
            </label>
            <select
              className='w-[18rem] h-[5rem] bg-white border-[1.5px] rounded-[1.2rem] px-6 cursor-pointer outline-none'
              name=''
              id=''
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option
                className='text-[1.5rem] font-medium text-text-2'
                value='無'
              >
                無
              </option>
              {sorting.map((option) => (
                <option
                  className='text-[1.5rem] font-medium text-text-2'
                  value={option.name}
                  key={option.name}
                >
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {products ? <GoodsLayout products={products} /> : null}
      </div>
    </div>
  );
};

export default Browse;
