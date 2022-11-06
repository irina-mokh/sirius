import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() =>{
    setIsMobile(/Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  return (
    <>
      {!isMobile && <DndProvider backend={HTML5Backend}>
        <Component {...pageProps} />
      </DndProvider>}
      {isMobile && <DndProvider backend={TouchBackend}>
        <Component {...pageProps} />
      </DndProvider>}
    </>
  )
}
