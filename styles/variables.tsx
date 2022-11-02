export type Shades = {
  default: string;
  hover?: string;
  active?: string;
}

export const colors: {
  [color: string]: Shades,
} = {
	'white': {
    default: '#ffffff',
  },
  'black': {
    default: '#423F45',
  },
  'blue': {
    default:'#104987',
    hover: '#08386E',
    active: '#042A54',
  },
  'green': {
    default:'#38DF7A',
    hover: '#14D562',
    active: '#00BD4C',
  },
  'yellow': {
    default: '#FFD748',
    hover: '#F0C21C',
    active: '#BB940A',
  }
  ,
};

export type FilterPosition = {
  label: string;
  value: string
}
export const amounts = [
  {
    label: '2',
    value: '2',
  }, {
    label: '3',
    value: '3',
  }, {
    label: '4',
    value: '4',
  },{
    label: '5',
    value: '5',
  }
]

export const values = [
  {
    label: 'A',
    value: '[ЁёА-я]',
  }, {
    label: '9',
    value: '[1,9]',
  }, {
    label: '19',
    value: '[10,19]',
  },{
    label: '50',
    value: '[20, 50]',
  },{
    label: '99',
    value: '[51, 99]',
  },{
    label: '999',
    value: '[100, 999]',
  }
]

