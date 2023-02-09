import { useEffect, useState } from 'react';

const useScroll = () => {
  const [stickNavStyle, setStickNavStyle] = useState<string>('');

  useEffect(() => {
    window.addEventListener<'scroll'>('scroll', (): void => {
      if (window.scrollY > 800)
        setStickNavStyle('fixed top-0 left-0 right-0 w-full z-50 shadow-lg');
      else setStickNavStyle('');
    });

    return () => window.removeEventListener('scroll', (): void => {});
  }, []);

  return stickNavStyle;
};

export default useScroll;
