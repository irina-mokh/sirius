import Link from 'next/link';
import styled from '@emotion/styled';
import { amounts, colors, values } from '../styles/variables';
import { RangeInput } from '../components/RangeInput';
import { Button } from '../components/Button';
import bgSrc from '../assets/images/bg-settings.png';
import React from 'react';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${bgSrc.src});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`

const Menu = styled.div`
  padding: 20px;
  min-width: 400px;
  @media (min-width: 768px) {
    width: 699px;
    min-width: 600px;
  }
  height: 90%;
  background: linear-gradient( #7F75F0, #101F32);
  border-radius: 40px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 29px;
  background: ${colors.white.default};
  border-radius: 20px;
  text-align: center;
  
`;

const Label = styled.label`
  color: ${colors.black.default};
  font-weight: 600;
  font-size: 32px;
  margin: 0 0 16px 0;
`

const Sort = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`

const SortBtn = styled.div`
  .label {
    display: block;
    padding: 6px 21px;
    background-color: ${colors.yellow.default};
    border-radius: 20px;
    font-family: 'Calibri';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    opacity: 0.56;
    @media (max-width: 650px) {
      font-size: 24px;
    }
  }

  input {
    display: none;
  }
  input:checked + label{
    opacity: 1;
  }
  
`;

export default function OrderSettings() {
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    console.log(e.target);
  }
  return (
    <Wrapper>
      <Menu>
        <Form onSubmit={handleSubmit}>
          <div>
            <Label>Кол-во предметов</Label>
            <RangeInput data={amounts} name="amount" />
          </div>
          <div>
            <Label>Значения</Label>
            <RangeInput data={values} name="value" />
          </div>
          <Sort>
            <SortBtn>
              <input type="radio" value='ascending' id="ascending" name="sort" checked />
              <label htmlFor='ascending' className="label">По возрастанию</label>
            </SortBtn>
            <SortBtn>            
              <input type="radio" id="descending" name="sort" value="descending" />
              <label className="label" htmlFor='descending'>По убыванию</label>
            </SortBtn>
          </Sort>
          <Link href="/order">
            <Button bg={colors.green}>Играть</Button>
          </Link>
        </Form>
      </Menu>
    </Wrapper>
  )
}
