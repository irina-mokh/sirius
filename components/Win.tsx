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
	overflow: hidden;
`

const Popup = styled.div`
	max-width: 661px;
	height: 520px;
	padding: 20px;
	border-radius: 60px;
	background: 
		linear-gradient(to bottom, #67DF89, transparent),
		linear-gradient(to bottom, transparent, #8D67DF);
	;
	box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
	text-align: center;
	position: relative;
	font-family: 'Circle Rounded Alt';
	@media (max-width: 980px) {
		width: 80%;
		height: 80%;
		padding: 10px;
		border-radius: 40px;
	}
	// stars left
	&::before, &::after {
		content: '';
		position: absolute;
		z-index: 6;
		transform: rotate(-17.58deg);
		width: 216px;
		height: 223px;
		background: url(${star.src}) 0 0 no-repeat;
		background-clip: padding-box;
	}
	&::before {
		top: -43px;
		left: -30px;
		background-size: 65%;
	}
	&::after {
		bottom: -35px;
		left: -105px;
		background-size: 100%;
	}

	.content {
		height: 100%;
		width: 100%;
		border-radius: 40px;
		padding: 23px 60px 29px 42px;
		background-color: ${colors.white.default};
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative;

		//stars right
		&::before, &::after {
			content: '';
			position: absolute;
			z-index: 10;
			transform: rotate(-17.58deg);
			width: 216px;
			height: 223px;
			background: url(${star.src}) 100% 100% no-repeat;
			background-clip: padding-box;
		}
		&::before {
				top: 65px;
				right: -105px;
				background-size: 100%;
			}
			&::after {
				bottom: -45px;
				right: -50px;
				background-size: 53%;
			}
	}

	button {
		font-family: inherit;
		font-size: 40px;
		@media (max-width: 800px) {
			font-size: 24px;
		}
	}

	.title {
		background: linear-gradient(180deg, #FFF9D8 8.65%, #FFE44F 69.58%);
		background-clip: text;
		-webkit-background-clip: text;
		text-fill-color: transparent;
		-webkit-text-fill-color: transparent;
		filter: 
		drop-shadow(0 0  15px #1E813A)
		drop-shadow(0 0  10px #1E813A)
		drop-shadow(0 0  5px #1E813A);
		font-size: 128px;
		@media (max-width: 800px) {
			font-size: 60px;
		}
	}

	.text {
		font-family: 'Circle Rounded';
		color: #5F40A1;
		font-weight: 400;
		font-size: 40px;
		line-height: 51px;
		flex-grow: 1;
		margin-top: 22px;
		@media (max-width: 800px) {
			font-size: 32px;
		}
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