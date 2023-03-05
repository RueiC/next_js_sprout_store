import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useStateContext } from '../context/StateContext';
import { MobileNavbar, DesktopNavbar } from './index';

const Navbar = () => {
  const { setUser } = useStateContext();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const submitSearch = (search: string): void => {
    if (!router || search === '') return;

    router.push(`/products?query=${search}`);
  };

  const logout = async (): Promise<void> => {
    await axios.get('/api/logout').then(() => setUser(null));
  };

  return (
    <>
      <DesktopNavbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        submitSearch={submitSearch}
        logout={logout}
      />

      <MobileNavbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        submitSearch={submitSearch}
        logout={logout}
      />
    </>
  );
};

export default Navbar;
