
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

	textInput: {
		color: 'black',
	},

	stopItemText: {
		color: 'green'
	},

	screenHeader: {
		backgroundColor: 'green'
	},

	screenHeaderTitle: {
		fontWeight: 'bold',
		color: 'white'
	},

	nextTrip: {
		fontWeight: 'bold',
		fontSize: 10
	},

	duration: {
		fontSize: 10
	},

	nextDepartures: {
		fontSize: 8
	},

	fromCollege: {
		color: 'black'
	},

	toCollege: {
		color: 'green'
	},

	noTrips: {
		fontSize: 10,
		color: 'black'
	},

	nextDepartureSeparator: {
		color: 'black',
	},

	nextTripsSaparator: {
		paddingEnd: 4
	},

	lineNameView: {
		color: 'green',
		padding: 2,
		height: 'auto',
		width: 'auto',
		justifyContent: 'center',
		alignItems: 'center'
	},

	lineNameText: {
		fontWeight: 'bold',
		color: 'white',
		fontSize: 10
	}
	
})