import styled from '@emotion/styled';
import { colors } from '../styles/variables';

type ItemProps = {
	theme: number;
	value: string;
	i: number;
	n: number;
	size: number;
}

const StyledItem = styled.div<ItemProps>`
	width: ${props => props.size + 25}px;
	height: ${props => props.size + 26}px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-image: url(${({theme, i})=> `/images/item${theme}-${i}.svg`});
	background-size: contain;
	background-repeat: no-repeat;
	position: relative;
	.text {
		font-family: Calibri;
		font-weight: 800;
		font-size: 56px;
		line-height: 68px;
		letter-spacing: 2px;
		color: ${colors.white.default};
		-webkit-text-stroke: 4px ${colors.blue.active};
	}

	&:nth-of-type(3) {
		margin: 0 -20px;
	}

	&:nth-of-type(1) {
		bottom: 0;
	}
	&:nth-of-type(2) {
		top: ${({n}) => n > 2 ? '-15%' : '0'};
	}
	&:nth-of-type(3) {
		bottom: ${({n}) => n == 5 ? '-10%' : '0'};
	}
	&:nth-of-type(4) {
		top: ${({n}) => n > 3 ? '-15%' : '0'};
	}
	&:nth-of-type(5) {
		bottom: 0;
	}
`
export const Item = (props: ItemProps) => {
	return (
		<StyledItem {...props}>
			<span className="text">{props.value}</span>
		</StyledItem>
	);
}