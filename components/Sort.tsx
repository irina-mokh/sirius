import { colors } from '../styles/variables';
import styled from '@emotion/styled';

type SortProps = {
  sort: string;
}

const SortStyled = styled.div<SortProps>`
height: 69px;
width: 357px;
position: relative;
display: flex;
align-items: center;
margin: 0 0 10px ${({sort}) => sort == 'descending' ? 'auto' : '0'};
justify-content: ${({sort}) => sort == 'descending' ? 'end' : 'start'};
@media (max-width: 600px) {
	width:100%;
}
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

export const Sort = (props: SortProps) => {
	return (
	<SortStyled sort={props.sort}>
		{props.sort === 'ascending' ? 'По возрастанию' : 'По убыванию'}
	</SortStyled>
	)
}