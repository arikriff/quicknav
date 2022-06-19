import React, { useState } from 'react'
import {TouchableOpacity} from 'react-native'
import MapView from 'react-native-maps'
import {Column, Row} from '../Container'
import JourneyEdgesSection from '../JourneyEdgesSection'
import styles from '../../styles'

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