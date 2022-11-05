import styled from '@emotion/styled';
import { colors } from '../styles/variables';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { ItemProps } from '../components/Item';
import React from 'react';
type SlotProps = {
  n: number;
  size: number;
	children: React.ReactNode;
	dropHandle: (item: ItemProps) => void;
}

type SlotStyledProps = {
	n: number;
  size: number;
	isOver: boolean;
}

const SlotStyled = styled.li<SlotStyledProps>`
  list-style: none;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  margin: 0 4px 0 0;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.06);
  box-shadow: inset 0px 4px 25px rgba(0, 0, 0, 0.25);
  z-index: 2;
  outline: 2px solid ${({isOver}) => isOver ? colors.white.default : "transparent"};
	display: flex;
	justify-items: center;
	align-items: center;
	
`

export const Slot = (props: SlotProps) => {
	// drop to slots
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'item',
      drop: async (drag: ItemProps) => {
				props.dropHandle(drag);
      },
      collect: (monitor: DropTargetMonitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [props]
  );
	return (
		<SlotStyled {...props} ref={drop} isOver={isOver} ></SlotStyled>
	)
}