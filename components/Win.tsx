import styled from '@emotion/styled';
import Link from 'next/link';
import { colors } from '../styles/variables';
import { Button } from './Button';
import star from '../assets/images/star.png';

type WinProps = {
	show: boolean;
}

const Overlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(32, 21, 54, 0.6);
	z-index: 5;
	display: flex;
	justify-content: center;
	align-items: center;
`

const Popup = styled.div`
	max-width: 621px;
	height: 480px;
	padding: 20px;
	border-radius: 40px;
	background: 
		linear-gradient(to bottom, #67DF89, transparent),
		linear-gradient(to bottom, transparent, #8D67DF);
	;
	box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
	text-align: center;
	position: relative;
	&::before, &::after {
		content: '';
		position: absolute;
		z-index: 6;
		transform: rotate(-17.58deg);
		width: 216px;
		height: 223px;
		background: url(${star.src}) 0 0 no-repeat;

	}
	&::before {
		top: -40px;
		left: -20px;
		background-size: 55%;
	}
	&::after {
		bottom: -90px;
		left: -90px;
		background-size: 85%;
	}

	.content {
		height: 100%;
		width: 100%;
		border-radius: 20px;
		padding: 23px 60px 29px 42px;
		background-color: ${colors.white.default};
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative;
		&::before, &::after {
			content: '';
			position: absolute;
			z-index: 10;
			transform: rotate(-17.58deg);
			width: 216px;
			height: 223px;
			background: url(${star.src}) 100% 100% no-repeat;
		}
		&::before {
				top: 60px;
				right: -90px;
				background-size: 85%;
			}
			&::after {
				bottom: -50px;
				right: -40px;
				background-size: 45%;
			}
	}

	.title {
		font-family: 'Circle Rounded Alt';
		font-size: 128px;
		background: linear-gradient(180deg, #FFF9D8 8.65%, #FFE44F 69.58%);
		background-clip: text;
		-webkit-background-clip: text;
		text-fill-color: transparent;
		-webkit-text-fill-color: transparent;
		filter: 
			drop-shadow(0 0  15px #1E813A)
			drop-shadow(0 0  10px #1E813A)
			drop-shadow(0 0  5px #1E813A);
	}

	.text {
		color: #5F40A1;
		font-weight: 400;
		font-size: 40px;
		line-height: 51px;
	}
`
export const Win = ({show} : WinProps) => {

	return (
		<>
			{show &&
				<Overlay>
					<Popup>
						<div className="content">
							<h2 className="title">Победа!</h2>
							<p className="text">Молодец! Ты успешно справился с заданием!</p>
							<Link href={{
									pathname: '/settings',
								}}>
									<Button type="submit" bg={colors.green}>Заново</Button>
							</Link>
						</div>
					</Popup>
				</Overlay>
			}
		</>
	)
}