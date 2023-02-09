import image from '../assets/index';
import type { Amount } from '../types';

export const countries = [
  {
    name: '澳洲',
  },
  {
    name: '美國',
  },
  {
    name: '泰國',
  },
  {
    name: '台灣',
  },
];

export const amounts: Amount[] = [
  {
    name: '< 10g',
    value: '&& amount < 10',
  },
  {
    name: '10g - 60g',
    value: '&& 10 < amount && amount < 60',
  },
  {
    name: '60g - 200g',
    value: '&& 60 < amount && amount < 200',
  },
  {
    name: '> 200g',
    value: '&& amount > 200',
  },
];

export const sorting = [
  {
    name: '價格由高到低',
  },
  {
    name: '價格由低到高',
  },
  {
    name: '由新到舊',
  },
  {
    name: '由舊到新',
  },
];

export const cities = [
  { name: '基隆市' },
  { name: '台北市' },
  { name: '新北市' },
  { name: '桃園市' },
  { name: '新竹市' },
  { name: '新竹縣' },
  { name: '苗栗縣' },
  { name: '台中市' },
  { name: '彰化縣' },
  { name: '南投縣' },
  { name: '雲林縣' },
  { name: '嘉義市' },
  { name: '嘉義縣' },
  { name: '台南市' },
  { name: '高雄市' },
  { name: '屏東縣' },
  { name: '台東縣' },
  { name: '花蓮縣' },
  { name: '宜蘭縣' },
  { name: '澎湖縣' },
  { name: '金門縣' },
  { name: '連江縣' },
];

export const deliveries = [
  {
    imgUrl: image.picking,
    title: '挑選',
    text: '從世界各地收集新鮮現在',
  },
  {
    imgUrl: image.transportation,
    title: '集貨',
    text: '挑選最優質的運送系統到我們的倉儲',
  },
  {
    imgUrl: image.packaging,
    title: '包裝',
    text: '細心的包裝你的訂單，並選用對生態友好的包裝材質',
  },
  {
    imgUrl: image.delivering,
    title: '運送',
    text: '我們可以在5個工作天內運送到您的手上',
  },
];
