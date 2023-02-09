import { Product } from '../types';

export const calcFianlPrice = (item: Product, qty?: number): string => {
  if (qty) {
    return `$ ${
      item.isDiscount ? item!.discountPrice! * qty : item.price * qty
    }`;
  } else {
    return `$ ${
      item.isDiscount ? item!.discountPrice! * item.qty : item.price * item.qty
    }`;
  }
};
