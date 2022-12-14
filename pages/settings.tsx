import Link from 'next/link';
import styled from '@emotion/styled';
import { amounts, colors, intervals } from '../styles/variables';
import { RangeInput } from '../components/RangeInput';
import { Button } from '../components/Button';
import bgSrc from '../assets/images/bg-settings.png';
import React from 'react';
import { useForm, FormProvider } from "react-hook-form";

type Inputs = {
  amountIndex: number;
  intervalIndex: number;
  sort: string;
}

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
  height: 90%;
  width: 699px;
  @media (max-width: 980px) {
    min-width: 400px;
  }
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
  @media (max-width: 980px) {
    padding: 10px;
  }
  
`;

const Label = styled.label`
  margin: 0 0 16px 0;
  color: ${colors.black.default};
  font-weight: 600;
  font-size: 32px;
  @media (max-width: 980px) {
    font-size: 26px;
  }
`

const Sort = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  @media (max-width: 980px) {
    margin: 8px 0;
  }
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
    @media (max-width: 980px) {
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

const INITIAL_SET = {
  sort: 'ascending',
  intervalsIndex: 0,
  amountIndex: 0,
};

export default function Settings() {
  const methods = useForm<Inputs>({defaultValues:{...INITIAL_SET}})
  const { register, watch } = methods;

  return (
    <Wrapper>
      <Menu>
        <FormProvider {...methods}>
          <Form>
            <div>
              <Label>??????-???? ??????????????????</Label>
              <RangeInput data={amounts} name="amountIndex" />
            </div>
            <div>
              <Label>????????????????</Label>
              <RangeInput data={intervals} name="intervalsIndex" />
            </div>
            <Sort>
              <SortBtn>
                <input type="radio" value='ascending' id="ascending" {...register("sort")} defaultChecked />
                <label htmlFor='ascending' className="label">???? ??????????????????????</label>
              </SortBtn>
              <SortBtn>            
                <input type="radio" id="descending" {...register("sort")} value="descending" />
                <label className="label" htmlFor='descending'>???? ????????????????</label>
              </SortBtn>
            </Sort>
            <Link href={{
              pathname: '/game',
              query: {...watch()},
            }}>
              <Button type="submit" bg={colors.green}>????????????</Button>
            </Link>
          </Form>
        </FormProvider>
      </Menu>
    </Wrapper>
  )
}
