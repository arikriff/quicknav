import React from 'react'

import {
	Text,
	TouchableOpacity,
	SectionList,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import {Row, Column} from '../helpers/Container'
import AlignedTextInput from '../helpers/AlignedTextInput'
import {SectionHeader} from '../helpers/ListComponent'
import styles from '../styles'

const PlaceItemIcon = ({type}) => (
	<Icon
		name={
			type == 'Home' ?
			'home' :
			(
				type == 'Work' ?
				'briefcase' :
				'location'
			)
		}
		style={styles.itemIcon}
	/>
)

const PlaceItem = ({item}) => (
	<TouchableOpacity style={styles.item}>
		<Row>
			<PlaceItemIcon type={item.type}/>
			<Column style={styles.placeItemContentColumn}>
				<Row>
					<Text style={styles.itemTitle}>
						{item.type}
					</Text>
				</Row>
				<Row>
					<Text style={styles.itemSubtitle}>
						{item.address ? item.address : 'Press to define'}
					</Text>
				</Row>
			</Column>
		</Row>
	</TouchableOpacity>
)

export default ({favorites, lasts}) => {

	let homes = []
	let works = []
	let others = []

	favorites.forEach(favorite => {
		if (favorite.type == 'Home') homes.push(favorite)
		else if (favorite.type == 'Work') works.push(favorite)
		else others.push(favorite)
	})

	const data = [
		{
			title: 'Favorites',
			data: [
				...(homes.length > 0 ? homes : [{type: 'Home'}]),
				...(works.length > 0 ? works : [{type: 'Work'}]),
				...others
			]
		},
		{
			title: 'Last Searches',
			data: lasts
		}
	]

	return (
		<Column>
			<AlignedTextInput placeholder='Address, location or stop search'/>
			<TouchableOpacity style={styles.container}>
				<Row>
					<Icon
						name='map-sharp'
						style={styles.itemIcon}
					/>
					<Text style={styles.itemSubtitle}>
						Choose place from map
					</Text>
				</Row>
			</TouchableOpacity>
			<SectionList
				sections={data}
				renderSectionHeader={({section}) => <SectionHeader section={section}/>}
				renderItem={({item}) => <PlaceItem item={item}/>}
				style={styles.sectionList}
			/>
		</Column>
	)
}

