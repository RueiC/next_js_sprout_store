import { FC, useState } from 'react';
import { BiCategory, BiLogOutCircle } from 'react-icons/bi';
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiOutlineMenu,
} from 'react-icons/ai';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
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

const Navbar: FC = () => {
  const { user, setUser, showCart, setShowCart, totalQty, getUser } =
    useStateContext();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showNavbar, setShowNavbar] = useState<boolean>(false);
  const stickNavStyle = useScroll();

  const submitSearch = (searchTerm: string): void => {
    if (!router || searchTerm === '') return;

    router.push(`/products?query=${searchTerm}`);
  };

  const logout = async (): Promise<void> => {
    await axios.get('/api/logout').then(() => setUser(null));
  };

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

      {/* Mobile Nav */}
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

export default Navbar;
