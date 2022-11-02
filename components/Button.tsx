import styled from '@emotion/styled';
import React from 'react';
import { Shades } from '../styles/variables';
import { colors } from '../styles/variables';

type ButtonProps = {
	children: React.ReactNode,
	bg: Shades,
}

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
	filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.1));
	padding: 5px 74px;
  margin: 0 auto;
  background-color: ${({bg}) => bg.default};
  font-weight: 400;
  font-size: 32px;
  line-height: 44px;
  border: none;
  transition: color 0.2s ease;
  color: ${colors.black.default};
  border-radius: 20px;
  font-family: 'Helvetica';
  font-weight: 400;
  height: 60px;

  &:hover {
    background-color: ${({bg}) => bg.hover};
  }

  &:active {
    background-color: ${({bg}) => bg.active};
  }
`;

export const Button = (props: ButtonProps) => <StyledButton bg={props.bg}>{props.children}</StyledButton>

