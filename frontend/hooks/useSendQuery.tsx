import { Dispatch, SetStateAction, useEffect } from 'react';
import { Product } from '../types';
import { client } from '../utils/client';
import { filteredByOptions } from '../utils/queries';

interface Props {
  countryOption: string[];
  amountOption: string;
  sortOption: string;
  searchQuery: string;
  setProducts: Dispatch<SetStateAction<Product[]>>;
}

const useSendQuery = ({
  countryOption,
  amountOption,
  sortOption,
  searchQuery,
  setProducts,
}: Props) => {
  const sendQuery = async (
    country: string[],
    amount: string,
    sort: string,
    search: string,
  ): Promise<void> => {
    const filteredResult: Product[] = await client.fetch(
      filteredByOptions(country, amount, sort, search),
    );

    setProducts(filteredResult);
  };

  useEffect(() => {
    sendQuery(countryOption, amountOption, sortOption, searchQuery);
  }, [countryOption, amountOption, sortOption, searchQuery]);

  return null;
};

export default useSendQuery;
