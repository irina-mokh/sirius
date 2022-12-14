import styled from '@emotion/styled';
import Head from 'next/head';
import { Button } from '../components/Button';
import { colors } from '../styles/variables';
import Link from 'next/link';
import bgSrc from '../assets/images/bg-settings.png';

const Main = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${bgSrc.src});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  text-align: center;
  .title {
    margin: 0 0 10px 0;
    font-size: 40px;
    color: #ffffff;
    margin: 0 0 40px 0;
  }
`

export default function Home() {
  return (
    <div>
      <Head>
        <title>Sirius App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <h1 className='title'>Тренажер "Порядок"</h1>
        <Link href="/settings">
          <Button bg={colors.green} type='button'>Играть</Button>
        </Link>
      </Main>
    </div>
  );
}
