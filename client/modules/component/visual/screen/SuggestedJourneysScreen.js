import React, {useState} from 'react'

import {
	Text,
	TouchableOpacity,
	FlatList,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

import {
	Menu,
	MenuItem,
} from 'react-native-material-menu'

import moment from 'moment'
import {Row, Column} from '../helpers/Container'
import JourneyEdgesSection from '../helpers/JourneyEdgesSection'
import styles from '../../styles'
import {SectionHeader} from '../helpers/ListComponent'

const TimePreferencesMenu = () => {

	const [visible, setVisible] = useState(false)

	const hideMenu = () => setVisible(false)
	const showMenu = () => setVisible(true)

	return (
		<Menu
			visible={visible}
			anchor={
				<TouchableOpacity onPress={showMenu}>
					<Row>
						<Icon name='time'/>
						<Text>
							Departs now
						</Text>
						<Icon name='caret-down-sharp'/>
					</Row>
				</TouchableOpacity>
			}
			onRequestClose={hideMenu}
		>
			<MenuItem>
				Depart Now
			</MenuItem>
			<MenuItem>
				Future departure time
			</MenuItem>
			<MenuItem>
				Desired arrival time
			</MenuItem>
			<MenuItem>
				Last lines for today
			</MenuItem>
		</Menu>
	)
}

const JuorneyPreferencesTouchable = () => (
	<TouchableOpacity>
		<Row>
			<Icon
				name='funnel'
				style={styles.itemIcon}/>
			<Text style={styles.itemTitle}>
				Preferences
			</Text>
		</Row>
	</TouchableOpacity>
)

const JourneySegment  = ({segment, isAlone}) => (
	segment.type == 'walk' ?
	(
		<Row>
			<Icon
				name='walk'
				style={styles.flippable}
			/>
			{
				isAlone ?
				null :
				<Text>
					{segment.arrivalTime.from(segment.departureTime, true)}
				</Text>
			}
		</Row>
	) :
	(
		<FlatList
			horizontal={true}
			data={segment.lineNames}
			renderItem={({item}) => (
				<Row>
					<Icon
						name={
							segment.type == 'bus' ?
							'bus' :
							(segment.type == 'tram' ? 'tram' : 'train')
						}
					/>
					<Text>
						{item}
					</Text>
				</Row>
			)}
			ItemSeparatorComponent={
				<Text>
					or
				</Text>
			}
		/>
	)
)

const JourneyDurationText = ({departureTime, arrivalTime}) => {

	const diff = moment.utc(arrivalTime.diff(departureTime))
	
	const hours = diff.format('H')
	const minutes = diff.format('m')

	const hoursText = hours == 0 ? '' : `${hours} h.`
	const minutesText = minutes == 0 ? '' : `${minutes} min.`

	const text = hoursText + (hours && minutes ? ' and ' : '') + minutesText

	return (
		<Text>
			{text}
		</Text>
	)
}

const SuggestedJourneyItem = ({journeyData}) => (
	<TouchableOpacity>
		<Column>
			<Row>
				<JourneyDurationText
					departureTime={journeyData.departureTime}
					arrivalTime={journeyData.arrivalTime}
				/>
				<Text>
					{journeyData.departureTime.format('HH:mm')}-{journeyData.arrivalTime.format('HH:mm')}
				</Text>
			</Row>
			<Row>
				<FlatList
					horizontal={true}
					data={journeyData.segments}
					renderItem={({item}) => (
						<JourneySegment
							segment={item}
							isAlone={journeyData.segments.length === 1}
						/>
					)}
					ItemSeparatorComponent = {
						<Icon
							name='caret-forward-sharp'
							style={styles.flippable}
						/>
					}
				/>
			</Row>
		</Column>
	</TouchableOpacity>
) 

export default ({suggestedJourneys}) => (
	<Column>
		<Column>
			<Row>
				<TimePreferencesMenu/>
				<JuorneyPreferencesTouchable/>
			</Row>
		</Column>
		<FlatList
			data={suggestedJourneys}
			ListHeaderComponent={
				<SectionHeader
					section={{
						data: suggestedJourneys,
						title: 'Suggested Routes'
					}}
				/>
			}
			renderItem={({item}) => (
				<SuggestedJourneyItem journeyData={item}/>
			)}
			ListEmptyComponent={
				<Row>
					<Text>
						There isn't route is suitable for your search.
					</Text>
				</Row>
			}
		/>
	</Column>
)