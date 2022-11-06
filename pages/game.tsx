import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { amounts, intervals } from '../styles/variables';
import { Item, ItemProps } from '../components/Item';
import { getValue } from '../utils';
import { GetServerSidePropsContext } from 'next';
import { Slot } from '../components/Slot';
import { SlotBar } from '../components/SlotBar';
import { Win } from '../components/Win';
import { Sort } from '../components/Sort';

const GameStyled = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-image: url(${({theme})=> `/images/bg/${theme}.png`});
  background-size: cover;
`
const Items = styled.ul`
  display: flex;
  margin: 0 auto;
  align-items: center;
  flex-grow: 1;  
`
type GameProps = {
  theme: number;
  values: Array<number | string>;
  sort: string;
  correct: Array<number | string>;
}

export default function Game(props: GameProps) {
  // prepare sounds 
  const  [audioErr, setAudioErr ] = useState<HTMLAudioElement | null>(null);
  const  [audioWin, setAudioWin ] = useState<HTMLAudioElement | null>(null);
  const  [audioBg, setAudioBg ] = useState<HTMLAudioElement | null>(null);
  const  [audioDrop, setAudioDrop ] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    setAudioErr(new Audio('./audio/err.mp3'));
    setAudioWin(new Audio('./audio/success.mp3'));
    setAudioBg(new Audio('./audio/music.mp3'));
    setAudioDrop(new Audio('./audio/drop.mp3'));
  }, []);

  audioBg?.addEventListener('ended', function () {
    this.currentTime = 0;
    this.play();
  }, false);

  useEffect(() => {
    audioBg?.play();
    return () => { audioBg?.pause()}
  },[audioBg]);

  const {values, theme, sort, correct} = props;
  const amount = values.length;

  // generate items show-state to change after DnD
  const INITIAL_SHOW_ARR = Array(amount).fill(true);
  const [itemsShow, setItemsShow] = useState(INITIAL_SHOW_ARR);

  // generate correct res state
  const [res, setRes] = useState(Array(amount + 1));

  if (sort == 'ascending') {
    res[0] = correct[0];
  } else {
    res[amount] = correct[amount];
  }
  
  // render items
  const [items, setItems] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const elements = values.map((value, i) => (
      <Item key={i} theme={theme} value={String(value)} n={amount} i={i+1} show={itemsShow[i]}></Item>))
    setItems(elements)
  }, [itemsShow]);


  // success modal
  const [showModal, setShowModal] = useState(false);
  // check for all correct answers
  useEffect(() => {
    if (JSON.stringify(res) == JSON.stringify(correct)) {
      audioBg?.pause();
      audioWin?.play();
      setShowModal(true);
    }
  }, [res])

  // render slots
  const slots: JSX.Element[] = [];
  for (let i = 0; i <= amount; i++){
    // state to get i for BG image from unsorted values
    const [ dropI, setDropI] = useState(6);
    slots.push(
      <Slot key={i} n={amount + 1} dropHandle={(item : ItemProps) => {
        if (correct[i] == item.value) {
          // update i for the same bg-image
          setDropI(item.i);
          audioDrop?.play();
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
      <Sort sort={sort}></Sort>
      <SlotBar theme={props.theme}>
        {slots}
      </SlotBar>
      <Win show={showModal}></Win>
    </GameStyled>
  )
};

export const getServerSideProps = async (context : GetServerSidePropsContext) => {

  // get random theme
  const themes = 4;
  const theme = Math.floor(Math.random() * themes) + 1;
  // get form values
  const amountIndex = Number(context.query.amountIndex);
  const intervalsIndex = Number(context.query.intervalsIndex);
  const sort = context.query.sort;

  // getting data according to settings
  let min: string = '0';
  let max : string = '1';
  const amount = Number(amounts[amountIndex].value);
  const interval = intervals[intervalsIndex].value;

  let values: Array<string | number> = [];

  //  get min max for numbers
  if (intervalsIndex !== 0) {
    [min, max] = interval.slice(1, interval.length - 1).split(',');
  } 

  for (let i = 1; i <= amount + 1; i++) {
    let value = getValue(intervalsIndex, min, max);
    while (values.includes(value)) {
      value = getValue(intervalsIndex, min, max);
    };
    values.push(value);
  }

  const correct = [...values].sort();
  const start = sort == 'ascending' ? correct[0] : correct[correct.length - 1];
  values.splice(values.findIndex((i) => i == start), 1);

  return {
    props: {theme, values, sort, correct}
  }
}