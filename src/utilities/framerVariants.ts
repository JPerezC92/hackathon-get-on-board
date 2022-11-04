export const modalError = {
	initialState: {
		opacity: 0.15,
		scale: 0.75,
		display: 'flex',
	},
	animateState: {
		opacity: 1,
		scale: 1,
		display: 'flex',
		transition: {
			duration: 0.5,
		},
	},
	exitState: {
		opacity: 0,
		scale: 0,
		display: 'none',
		transition: {
			duration: 1,
			display: {
				delay: 1,
			},
		},
	},
};
