import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { amounts, intervals } from '../styles/variables';
import { Item, ItemProps, ItemStyled } from '../components/Item';
import { getRandom, getRandomSymbol } from '../utils';
import { colors } from '../styles/variables';
import { GetServerSidePropsContext } from 'next';
import { Slot } from '../components/Slot';

const GameStyled = styled.main`
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
const Items = styled.ul`
  display: flex;
  margin: 0 auto;
  align-items: center;
  flex-grow: 1;  
`
const Sort = styled.div<SortProps>`
  height: 69px;
  width: 357px;
  position: relative;
  display: flex;
  align-items: center;
  margin: 0 0 10px ${({sort}) => sort == 'descending' ? 'auto' : '0'};
  justify-content: ${({sort}) => sort == 'descending' ? 'end' : 'start'};
  &::before {
    content: '';
    position: absolute;
    background: url('/images/sort-arrow.svg') no-repeat;
    transform: ${({sort}) => sort == 'ascending' ? 'none' : 'rotate(180deg)'};
    background-position: 100% 0;
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
  values: Array<number | string>;
  sort: string;
  correct: Array<number | string>;
}
type SortProps = {
  sort: string;
}

function getSize() {
  if (window) {
    return Math.min(131, window.innerWidth / 7);
  } else {
    return 131;
  }
}

export default function Game(props: GameProps) {
  // change items size on screen resize
  const [size, setSize ] = useState(115);
  useEffect(() => {
    
    window.addEventListener('resize', () => setSize(getSize()));
    return () => window.removeEventListener('resize', () => setSize(getSize()));
  },[]);

  const {values, theme, sort, correct} = props;
  const amount = values.length;

  // generate items show-state to change after DnD
  const INITIAL_SHOW_ARR = Array(amount).fill(true);
  const [itemsShow, setItemsShow] = useState(INITIAL_SHOW_ARR);

  // generate correct res state
  const [res, setRes] = useState(Array(amount + 1));

  console.log('correct in component', correct);
  if (sort == 'ascending') {
    res[0] = correct[0];
  } else {
    res[amount] = correct[amount];
  }
  
  // render items
  const [items, setItems] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const elements = values.map((value, i) => (
      <Item key={i} theme={theme} value={String(value)} n={amount} i={i+1} size={size} show={itemsShow[i]}></Item>))
    setItems(elements)
  }, [itemsShow]);

  // prepare sounds 
  const  [audioErr, setAudioErr ] = useState<HTMLAudioElement | null>(null);
  const  [audioWin, setAudioWin ] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    setAudioErr(new Audio('./audio/err.mp3'));
    setAudioWin(new Audio('./audio/success.mp3'))
  }, [])
  

  // check for all correct answers
  useEffect(() => {
    if (JSON.stringify(res) == JSON.stringify(correct)) {
      console.log('WIN!!!!');
      audioWin?.play();
    }
  }, [res])

  // render slots
  const slots: JSX.Element[] = [];
  for (let i = 0; i <= amount; i++){
    // state to get i for BG image from unsorted values
    const [ dropI, setDropI] = useState(6);
    slots.push(
      <Slot key={i} n={amount + 1} size={size} dropHandle={(item : ItemProps) => {
        if (correct[i] == item.value) {
          // update i for the same bg-image
          setDropI(item.i);

          const newRes = [...res];
          newRes[i] = item.value;

          // update slot bar results
          setRes(newRes);

          // hide item from the list
          const showArr = [...itemsShow];
          showArr[item.i - 1] = false;
          setItemsShow(showArr);
        } else {
          audioErr?.play();
        }
      }}>
        {res[i] &&
        <Item
          key={i}
          theme={theme}
          n={amount}
          i={dropI}
          size={size}
          value={String(res[i])}
          show={true}
        ></Item>
        }
      </Slot>
    )
  } 

  return (
    <GameStyled theme={props.theme}>
      <Items>
        {items}
      </Items>
      <Sort sort={sort}>
        {sort === 'ascending' ? 'По возрастанию' : 'По убыванию'}
      </Sort>
      <SlotBar theme={props.theme}>
        {slots}
      </SlotBar>
    </GameStyled>
  )
};

export const getServerSideProps = (context : GetServerSidePropsContext) => {
  // get random theme
  const themes = 4;
  const theme = Math.floor(Math.random() * themes) + 1;

  // get form values
  const amountIndex = Number(context.query.amountIndex);
  const intervalsIndex = Number(context.query.intervalsIndex);
  const sort = context.query.sort;

  // getting data according to settings
  let min: string, max : string;
  const amount = Number(amounts[amountIndex].value);
  const interval = intervals[intervalsIndex].value;

  let values: Array<string | number> = [];

  function getValue () {
    let res = (intervalsIndex == 0) ? getRandomSymbol() : String(getRandom(+min, +max));
    return res;
  };

  //  get min max for numbers
  if (intervalsIndex != 0) {
    [min, max] = interval.slice(1, interval.length - 1).split(',');
  } 

  for (let i = 1; i <= amount + 1; i++) {
    let value;
    while (!value) {
      let v = getValue();
      if (values.includes(v)) {
        v = getValue();
      } else {
        value = v;
      }
    }
    values.push(value);
  }

  const correct = [...values].sort();
  const start = sort == 'ascending' ? correct[0] : correct[correct.length - 1];
  values.splice(values.findIndex((i) => i == start), 1);

  return {
    props: {theme, values, sort, correct}
  }
}