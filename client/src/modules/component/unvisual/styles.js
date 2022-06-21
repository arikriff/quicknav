
import {StyleSheet, I18nManager} from 'react-native'

export default StyleSheet.create({

	container: {
		flex: 1
	},

  row: {
		flexDirection : I18nManager.isRTL ? 'row' : 'row-reverse'
	},

	column: {
		flexDirection: 'column'
	},

	alignedTextInput: {
		flex: 1,
		textAlign: I18nManager.isRTL ? 'right' : 'left'
	},

	map: {
		height: 300,
		width: 300
	},

	sectionTitle: {
		fontSize: 16,
		paddingVertical: 8
	},

	itemTitle: {
		fontSize: 18,
		paddingVertical: 8,
		fontWeight: 'bold'
	},

	itemSubtitle: {
		fontSize: 16,
		paddingVertical: 8,
	},

	itemIcon: {
		paddingHorizontal: 15,
		paddingVertical: 8,
		fontSize: 30
	},

	item: {
		paddingVertical: 8
	},

	sectionList: {
		fontSize: 18
	},

	padded: {
		padding: 10
	},

	flippable: {
		transform: [
			{scaleX: I18nManager.isRTL ? -1 : 1}
		]
	},

	journeyEdgesPaddedInput: {
		paddingTop: 10,
		paddingBottom: 10,
		poddingStart: 0,
		paddingEnd: 10
	},

	journeyEdgesRow: {
		justifyContent: 'center',
		alignItems: 'center'
	},

	smallIcon: {
		fontSize: 18
	}

})