import { Dispatch, SetStateAction } from 'react';
import { BiCategory, BiLogOutCircle } from 'react-icons/bi';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Link from 'next/link';
import {
  CredentialResponse,
  GoogleLogin,
  googleLogout,
} from '@react-oauth/google';

import { createOrGetUser } from '../utils/getAuthInfo';
import { useStateContext } from '../context/StateContext';
import image from '../assets/index';
import ShoppingCart from './ShoppingCart';
import useScroll from '../hooks/useScroll';

interface Props {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  // eslint-disable-next-line no-unused-vars
  submitSearch: (searchTerm: string) => void;
  logout: () => Promise<void>;
}

const DesktopNavbar = ({
  searchTerm,
  setSearchTerm,
  submitSearch,
  logout,
}: Props) => {
  const { user, cartItems, showCart, setShowCart, totalQty, getUser } =
    useStateContext();
  const stickNavStyle = useScroll();

  return (
    <>
      <header
        className={`${stickNavStyle} sm:flex sm:items-center sm:justify-between px-[3rem] py-[3.5rem] hidden bg-background-brown-1`}
      >
        <div className='flex items-center justify-start gap-10'>
          <div className='w-[90px] cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out'>
            <Link href='/'>
              <img className='w-full' src={image.logo_3} alt='logo' />
            </Link>
          </div>
          <form
            className='w-[28rem] h-[5rem]'
            onSubmit={(e) => {
              e.preventDefault();
              submitSearch(searchTerm);
            }}
          >
            <input
              className='bg-white text-text-1 rounded-[1.5rem] w-full h-full shadow-md placeholder:text-[1.5rem] px-[2rem] outline-none'
              placeholder='搜尋'
              type='text'
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
          <div className='w-[15rem] h-full hover:scale-105 transition-all duration-200 ease-in-out'>
            <Link href='/products'>
              <button
                className='flex items-center gap-3 justify-center w-full h-full text-[2rem] text-text-3'
                type='button'
              >
                <BiCategory />
                瀏覽商品
              </button>
            </Link>
          </div>
        </div>

        <div className='relative flex items-center gap-[4rem] h-[5rem] text-text-3 font-medium'>
          {!user ? (
            <GoogleLogin
              onSuccess={async (res: CredentialResponse) => {
                await createOrGetUser(res);
                await getUser();
              }}
              onError={() => console.log('Login Failed')}
            />
          ) : (
            <button
              className={`flex items-center gap-3 justify-center h-full text-[1.5rem] shadow-md px-[3rem] rounded-[1.5rem] bg-white ${
                !showCart &&
                'hover:scale-105 transition-all duration-200 ease-in-out'
              }`}
              type='button'
              onClick={() => {
                googleLogout();
                logout();
              }}
            >
              <BiLogOutCircle className='text-[2rem]' />
              登出
            </button>
          )}

          <button
            className={`flex items-center gap-[1rem] justify-center text-[1.5rem] shadow-md h-full px-[3rem] rounded-[1.5rem] bg-white ${
              !showCart &&
              'hover:scale-105 transition-all duration-200 ease-in-out'
            }`}
            type='button'
            onClick={() => setShowCart((prev: boolean) => !prev)}
          >
            <AiOutlineShoppingCart className='text-[2rem]' />
            購物車
            <span className='text-3xl'>{totalQty}</span>
          </button>

          {showCart ? <ShoppingCart mode={'desktop'} /> : null}
        </div>
      </header>
    </>
  );
};

export default DesktopNavbar;
