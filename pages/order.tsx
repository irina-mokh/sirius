import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { amounts, intervals } from '../styles/variables';
import { Item } from '../components/Item';
import { getRandom, getRandomSymbol } from '../utils';
import { colors } from '../styles/variables';

const Game = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-image: url(${({theme})=> `/images/bg/${theme}.png`});
  background-size: cover;
`
const SlotBar = styled.ul`
  position: relative;
  margin: 0 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 45px 50px;
  border-radius: 50px;
  overflow: hidden;
  background: ${({theme}) => theme == 1 ? 'radial-gradient(238.96% 238.96% at 50% 54.28%, #FAF9F9 0%, #C09F9B 100%)' : 'transparent'};
  box-shadow: ${({theme}) => theme == 1 ?'0px 4px 4px rgba(0, 0, 0, 0.25)' : 'none'};
  @media (max-width: 980px) {
    padding: 15px 20px;
    border-radius: 30px;
    margin: 0 20px;
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${({theme})=> `/images/bar-${theme}.svg`});
    background-size: cover;
    opacity: ${({theme}) => theme == 1 ? '0.1' : '1'};
  }
  
`
const Slot = styled.li<SlotProps>`
  list-style: none;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  margin: 0 4px 0 0;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.06);
  box-shadow: inset 0px 4px 25px rgba(0, 0, 0, 0.25);
  z-index: 2;
`
const Items = styled.ul`
  display: flex;
  margin: 0 auto;
  align-items: center;
  flex-grow: 1;  
`

const Sort = styled.div<SortProps>`
  height: 69px;
  position: relative;
  display: flex;
  align-items: center;
  margin: 0 ${({sort})=> sort == 'descending' ? 'auto' : '0'} 10px 0;
  &::before {
    content: '';
    position: absolute;
    background: url('/images/sort-arrow.svg') no-repeat;
    transform: ${props => props.sort == 'ascending' ? 'none' : 'rotate(180deg)'};
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

  }
  font-family: 'Calibri';
  font-weight: 700;
  font-size: 36px;
  line-height: 36px;
  color: ${colors.white.default};
	-webkit-text-stroke: 2px ${colors.blue.active};
`
type GameProps = {
  theme: number;
}

type SlotProps = {
  n: number;
  size: number;
}

type Settings = {
  amountIndex: number;
  intervalsIndex: number;
  sort: string;
}

type SortProps = {
  sort: string;
}

const INITIAL_SETTINGS = {
  amountIndex: 2,
  intervalsIndex: 1,
  sort: 'ascending',
};

export default function Order(props: GameProps) {
  const [ sets, setSets ] = useState<Settings>(INITIAL_SETTINGS);

  useEffect(() => {
    if (localStorage.getItem('sets')) {
      const setsLS = JSON.parse(localStorage.getItem('sets') || `${INITIAL_SETTINGS}`);
      setSets(setsLS);
    }
  }, []);

  const [size, setSize ] = useState(131);
  useEffect(() => {
    function updateSize() {
      const {innerWidth, innerHeight} = window;
      const newSize =  innerWidth / 7;
      setSize(Math.min(131, newSize));
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  },[]);

  const { amountIndex, intervalsIndex, sort} = sets;
  const amount = Number(amounts[amountIndex].value);
  const interval = intervals[intervalsIndex].value;

  // generate values for Items
  const values: Array<string | number> = [];
  let min, max;
  if (intervalsIndex != 0) {
    [min, max] = interval.slice(1, interval.length - 1).split(',');
  } 

  for (let i = 1; i <= amount; i++){
    let value = '';
    if (intervalsIndex == 0) {
      value = getRandomSymbol();
      while (values.includes(value)) {
        value = getRandomSymbol();
      };
    } else {
      if (min && max) {
        value = String(getRandom(+min, +max));
        while (values.includes(value)) {
          value = String(getRandom(+min, +max));
        };
      }
    } 
    values.push(value)
  }

  // render Items
  const items = [];
  for (let i = 1; i <= amount; i++){
    items.push(<Item key={i} theme={props.theme} value={String(values[i - 1])} n={amount} i={i} size={size}></Item>)
  } 
  const slots = [];
  for (let i = 1; i <= amount + 1; i++){
    slots.push(<Slot key={i} theme={props.theme} n={amount + 1} size={size}></Slot>)
  } 
  return (
    <Game theme={props.theme}>
      <Items>
        {items}
      </Items>
      <Sort sort={sort}>
        {sort === 'ascending' ? 'По возрастанию' : 'По убыванию'}
      </Sort>
      <SlotBar theme={props.theme}>
        {slots}
      </SlotBar>
    </Game>
  )
};

export async function getStaticProps() {
  const themes = 4;
  const theme = Math.floor(Math.random() * themes) + 1;
  return {
    props: {theme},
  }
}