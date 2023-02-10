import { Dispatch, SetStateAction, useState } from 'react';
import { BiCategory, BiLogOutCircle } from 'react-icons/bi';
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiOutlineMenu,
} from 'react-icons/ai';

import Link from 'next/link';
import {
  CredentialResponse,
  GoogleLogin,
  googleLogout,
} from '@react-oauth/google';

import { createOrGetUser } from '../utils/getAuthInfo';
import image from '../assets/index';
import ShoppingCart from './ShoppingCart';
import { useStateContext } from '../context/StateContext';

interface Props {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  // eslint-disable-next-line no-unused-vars
  submitSearch: (searchTerm: string) => void;
  logout: () => Promise<void>;
}

const MobileNavbar = ({
  searchTerm,
  setSearchTerm,
  submitSearch,
  logout,
}: Props) => {
  const [showNavbar, setShowNavbar] = useState<boolean>(false);
  const { user, showCart, setShowCart, totalQty, getUser } = useStateContext();

  return (
    <>
      <nav
        className={`fixed top-0 left-0 sm:hidden flex flex-col gap-[1.5rem] w-full h-[100vh] bg-background-brown-1 px-[3rem] py-[2rem] translate-x-[100%] transition-all duration-500 ease-in-out z-50 ${
          showNavbar && 'translate-x-0'
        }`}
      >
        {showNavbar ? (
          <>
            <div className='flex items-center justify-between'>
              <img
                className='w-[17.5rem] h-[8.5rem] cursor-pointer'
                src={image.logo_1}
                alt='Logo'
                loading='lazy'
              />
              <AiFillCloseCircle
                className='text-[3.5rem] hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer'
                onClick={() => setShowNavbar(false)}
              />
            </div>

            <div className='flex flex-col gap-[3rem]'>
              <form
                className='w-full h-[5rem]'
                onSubmit={(e) => {
                  e.preventDefault();
                  submitSearch(searchTerm);
                }}
              >
                <input
                  className='bg-white text-text-1 rounded-[1.5rem] w-full h-full shadow-md placeholder:text-[1.5rem] px-[2rem] py-[2rem] outline-none'
                  placeholder='搜尋'
                  type='text'
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </form>

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

              <Link href='/products'>
                <button
                  className='flex items-center gap-[1rem] justify-center text-[1.5rem] shadow-md h-full px-[3rem] py-[1rem] rounded-[1.5rem] bg-white'
                  type='button'
                >
                  <BiCategory className='text-[2rem]' />
                  瀏覽商品
                </button>
              </Link>

              <button
                className={`flex items-center gap-[1rem] justify-center text-[1.5rem] shadow-md h-full px-[3rem] py-[1rem] rounded-[1.5rem] bg-white ${
                  !showCart &&
                  'hover:scale-105 transition-all duration-200 ease-in-out'
                }`}
                type='button'
                onClick={() => setShowCart((prev: boolean) => !prev)}
              >
                <AiOutlineShoppingCart className='text-[2rem]' />
                購物車
                <span className='text-[1.5rem]'>{totalQty}</span>
              </button>

              {showCart ? <ShoppingCart mode={'mobile'} /> : null}
            </div>
          </>
        ) : null}
      </nav>

      {!showNavbar ? (
        <div className='flex sm:hidden justify-between items-center w-full px-[3rem] pt-[1.5rem]'>
          <img
            className='w-[17.5rem] h-[8.5rem] cursor-pointer'
            src={image.logo_1}
            alt='Logo'
            loading='lazy'
          />
          <AiOutlineMenu
            className='text-[3.5rem] cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out'
            onClick={() => setShowNavbar(true)}
          />
        </div>
      ) : null}
    </>
  );
};

export default MobileNavbar;
