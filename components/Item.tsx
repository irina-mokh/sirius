import styled from '@emotion/styled';
import { colors } from '../styles/variables';
import { useDrag } from 'react-dnd';
import { useEffect, useState } from 'react';

export type ItemProps = {
	theme: number;
	value: string;
	i: number;
	n: number;
	size: number;
	show: boolean;
}

type ItemStyledProps = {
	transparency: string;
	size: number;
	i: number;
	n: number;
}

export const ItemStyled = styled.div<ItemStyledProps>`
	opacity: ${({transparency}) => transparency};
	width: ${props => props.size + 25}px;
	aspect-ratio: 1 / 1;
	display: flex;
	justify-content: center;
	align-items: center;
	background-image: url(${({theme, i})=> `/images/item${theme}-${i}.svg`});
	background-size: contain;
	background-repeat: no-repeat;
	background-clip: padding-box;
	position: relative;
	transform: translate(0, 0);
	cursor: grab;
	z-index: 2;

	// stems for flowers in 4 theme
	&::after {
		content: '';
		width: 130px;
		height: 460px;
		background-image: ${({theme, i}) =>theme == 4 ? `url(/images/stem${i}.svg)` : ''};
		background-repeat: no-repeat;
		position: absolute;
		bottom: ${({i}) => i == 3 ? '-420px' : '-430px'};
		right: ${({i}) => i == 1 ? '-90px' : '-40px'};
		top: ${({i}) => i == 4 ? '120px' : ''};
		left: ${({i}) => i == 4 ? '20px' : ''};
		.slot-bar & {
			display: none;
		}
	}

	.text {
		font-family: Calibri;
		font-weight: 800;
		font-size: 56px;
		line-height: 68px;
		letter-spacing: 2px;
		color: ${colors.white.default};
		-webkit-text-stroke: 4px ${colors.blue.active};
	}

	&:nth-of-type(1) {
		bottom: 0;
	}
	&:nth-of-type(2) {
		top: ${({n}) => n > 2 ? '-15%' : '0'};
	}
	&:nth-of-type(3) {
		bottom: ${({n}) => n == 5 ? '-10%' : '0'};
		margin: 0 -20px;
	}
	&:nth-of-type(4) {
		top: ${({n}) => n > 3 ? '-15%' : '0'};
	}
	&:nth-of-type(5) {
		bottom: 0;
	}
`
export const Item = (props: ItemProps) => {
	const { i, show, value} = props;

	const  [audioGrab, setAudioGrab ] = useState<HTMLAudioElement | null>(null);
	useEffect(() => {
		setAudioGrab(new Audio('./audio/grab.mp3'));
	}, []);
	
	const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: 'item',
      item: props,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      })
    }),
    []
  )

	const transparency = (isDragging || !show) ? '0' : '1';

	return (
		<ItemStyled {...props} ref={dragRef} transparency={transparency} onMouseDown={() =>{audioGrab?.play()}} onTouchStart={() =>{audioGrab?.play()}}>
			<span className="text">{value}</span>
		</ItemStyled>
	);
}