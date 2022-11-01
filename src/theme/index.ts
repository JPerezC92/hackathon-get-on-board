import { extendTheme } from '@chakra-ui/react';

// const fonts = {
//   heading: "PT Sans, sans-serif",
//   body: "PT Sans, sans-serif",
// };

const styles = {
	global: {
		'html, body': {
			color: '#392453',
			bg: '#F3F3F3',
			height: '100vh',
		},
		'#root': {
			maxWidth: '100vw',
			minHeight: '100vh',
			overflowX: 'hidden',
		},
	},
};

const colors = {
	primary: {
		50: '#d8f9ff',
		100: '#abe9ff',
		200: '#7bd8ff',
		300: '#49c9ff',
		400: '#1ab9ff',
		500: '#00a0e6',
		600: '#007cb4',
		700: '#005982',
		800: '#003651',
		900: '#001421',
	},
	['primary-ligth']: {
		50: '#ddfaff',
		100: '#b6ebf9',
		200: '#8ddcf1',
		300: '#62ceea',
		400: '#3bbfe3',
		500: '#24a6c9',
		600: '#15819d',
		700: '#075c71',
		800: '#003845',
		900: '#00141b',
	},
	secondary: {
		50: '#ffe5e5',
		100: '#fcb8b9',
		200: '#f48a8d',
		300: '#ef5d60',
		400: '#ea3032',
		500: '#d1181a',
		600: '#a21113',
		700: '#750b0d',
		800: '#470406',
		900: '#1d0000',
	},
	['secondary-ligth']: {
		50: '#feeaec',
		100: '#eac7c8',
		200: '#daa3a5',
		300: '#cc7f81',
		400: '#bd5b5d',
		500: '#a44144',
		600: '#7f3234',
		700: '#5b2425',
		800: '#381516',
		900: '#180505',
	},
	['neutral-light']: {
		50: '#dafcff',
		100: '#aff0ff',
		200: '#80e5ff',
		300: '#52dbfe',
		400: '#2fcffd',
		500: '#21b7e4',
		600: '#108eb2',
		700: '#006680',
		800: '#003d4f',
		900: '#00151e',
	},
	['neutral-medium']: {
		50: '#e5ecff',
		100: '#b6c6fa',
		200: '#859ff7',
		300: '#5679f7',
		400: '#2f54f6',
		500: '#203bdd',
		600: '#172eac',
		700: '#0f217a',
		800: '#061349',
		900: '#00061a',
	},
	special1: {
		50: '#ffe6ec',
		100: '#f5bfc8',
		200: '#e897a5',
		300: '#dd6e82',
		400: '#d2465e',
		500: '#b92d44',
		600: '#912235',
		700: '#691725',
		800: '#410b16',
		900: '#1d0007',
	},
	special2: {
		50: '#ececff',
		100: '#c7c8ef',
		200: '#a2a4de',
		300: '#7e7fcf',
		400: '#595bc0',
		500: '#3f41a6',
		600: '#303382',
		700: '#22245e',
		800: '#13163b',
		900: '#06061a',
	},
	brand: {
		900: '#392453',
		700: '#6136FF',
	},
	bgBody: {
		200: '#F3F3F3',
	},
} as const;

const breakpoints = {
	xs: '15em',
	sm: '30em',
	md: '48em',
	lg: '62em',
	xl: '80em',
	'2xl': '96em',
};

// Components

const Select = {
	variants: {
		outline: {},
	},
};

const Button = {
	variants: {
		solid: {
			color: 'white',
			bg: '#6136FF',
			_hover: {
				color: 'white',
				bg: '#392453',
			},
			_active: {
				color: 'white',
				bg: '#392453',
			},
		},
		outline: {
			color: 'brand.700',
			bg: 'white',
			borderColor: 'brand.700',
			focusBorderColor: 'brand.900',
			_hover: {
				borderColor: 'brand.900',
				bg: 'white',
			},
			_active: {
				borderSize: '1px',
				borderColor: 'brand.900',
				bg: 'white',
			},
		},

		ghost: {
			_hover: {
				bg: 'transparent',
			},
			_active: {
				bg: 'transparent',
			},
		},
	},
};

export default extendTheme({
	styles,
	colors,
	breakpoints,
	components: { Button, Select },
});
