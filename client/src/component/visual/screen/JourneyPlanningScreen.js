import React from 'react'
import { TouchableOpacity } from 'react-native'
import MapView from 'react-native-maps'
import { Column } from '../Container'
import JourneyPlanningSection from '../helper/JourneyPlanningSection'
import styles from '../../unvisual/styles'

export default ({navigation}) => {

	const context = getContext()

	return (
		<Column>
			<MapView>
				<Geojson
					geojson={context.state.route}
				/>
				<Geojson
					geojson={context.state.stops}
				/>
			</MapView>
			<JourneyPlanningSection navigation={navigation}/>
			<TouchableOpacity>
				<Text>
					נווט
				</Text>
			</TouchableOpacity>
		</Column>
	)
}