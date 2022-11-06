import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { useEffect } from 'react';


  

export default function App({ Component, pageProps }: AppProps) {
  let DnDBackend = HTML5Backend;
  useEffect(() =>{
    const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);
    DnDBackend = isMobile ? TouchBackend : HTML5Backend;
  }, []);
  return (
    <DndProvider backend={DnDBackend}>
    <Component {...pageProps} />
  </DndProvider>
  )
}
