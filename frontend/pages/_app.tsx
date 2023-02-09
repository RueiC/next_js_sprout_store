import type { AppProps } from 'next/app';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';

import { StateProvider } from '../context/StateContext';
import { Navbar, Footer } from '../components';
import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}>
      <StateProvider>
        <div className='flex flex-col justify-between min-h-screen'>
          <Navbar />

          <ToastContainer
            position='top-center'
            autoClose={4000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='light'
          />
          <Component {...pageProps} />

          <Footer />
        </div>
      </StateProvider>
    </GoogleOAuthProvider>
  );
};

export default MyApp;
