import { FilterPosition } from '../styles/variables';
import styled from '@emotion/styled';
import React from 'react';
import { amounts, colors, values } from '../styles/variables';

type RangeInputProps = {
	data: FilterPosition[];
	name: string;
}

const RangeBar = styled.div`
	width: 100%;
	margin: 20px;
	
	.range {
		-webkit-appearance: none;
  	background: ${colors.yellow.default}; 
		width: 90%;
		height: 21px;
		border-radius: 10px;

		&::-webkit-slider-thumb {
			background-color: ${colors.blue.default};
			border: 0;
			border-radius: 50%;
			width: 23px;
			height: 23px;
			transition: background-color 0.15s linear;
			-webkit-appearance: none;
			appearance: none;
			&:hover {
				background-color: ${colors.blue.hover};
			}
			&:active {
				background-color: ${colors.blue.active};
			}
		}

		&:focus {
			outline: none; 
		}
		
	}

	.datalist {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		writing-mode: vertical-lr;
		width: 90%;
	}
	
	.option {
		transform: rotate(-90deg);
		font-family: 'Calibri';
		font-style: normal;
		font-weight: 700;
		font-size: 24px;
		line-height: 29px;
		text-align: center;
	}

`

export const RangeInput = ({data, name}: RangeInputProps) => {
	const options = data.map(radio => (
		<option value={radio.value} label={radio.label} key={radio.value} className='option' />
	))

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const index = Number(e.target.value);
		console.log(data[index].value)
	}
	return (
			<RangeBar>
			<input type="range" list={name} defaultValue={0} className="range" min={0} max={data.length - 1} onChange={handleChange}></input>
			<datalist id={name} className="datalist">
				{options}
			</datalist>
		</RangeBar>
	)
}