
import {StyleSheet, I18nManager} from 'react-native'

export default StyleSheet.create({

  row: {
		flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
		flexWrap: 'wrap'
	},

	column: {
		flexDirection: 'column',
		direction: 'rtl',
	},

	screen: {
		padding: 5
	},

	section: {
		height: '50%',
		width: '100%'
	},

	map: {
		height: '100%',
		width: '100%'
	},

	textInput: {
		height: 'auto',
		width: '100%'
	},

	button: {
		height: 'auto',
		width: '100%'
	},

	visual: {
		margin: 5
	}

})