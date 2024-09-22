import { Theme } from '@aws-amplify/ui-react';

export const theme: Theme = {
	name: 'custom-theme',
	tokens: {
		colors: {
			primary: {
				'10': '#23A6F0',
				'20': '#23A6F0',
				'40': '#23A6F0',
				'60': '#23A6F0',
				'80': '#23A6F0',
				'90': '#23A6F0',
				'100': '#23A6F0',
			},
		},
		components: {
			button: {
				primary: {
					backgroundColor: '#23A6F0',
					color: 'white',
					_hover: {
						backgroundColor: 'white',
						borderColor: '#23A6F0',
						color: '#23A6F0',
					},
				},
				_hover: {
					color: 'white',
				},
				_focus: {
					color: 'white',
				},
				link: {
					_hover: {
						backgroundColor: 'white',
						borderColor: '#23A6F0',
						color: '#23A6F0',
					},
				},
			},
		},
	},
};
