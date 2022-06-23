
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

	visual: {
		padding: 4
	},

	section: {
		height: '50%',
		width: '100%'
	},

	lineMap: {
		height: '100%',
		width: '100%'
	},

	componentInColumn: {
		height: 'auto',
		width: '100%'
	},


})