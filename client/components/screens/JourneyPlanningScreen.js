import React from 'react'
import {TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import MapView from 'react-native-maps'
import {Column, Row} from '../helpers/Container'
import JourneyEdgesSection from '../helpers/JourneyEdgesSection'
import styles from '../styles'
	
export default ({data}) => (
	<Column>
		<MapView>
			<Geojson
				geojson={data.route}
			/>
			<Geojson
				geojson={data.stops}
			/>
		</MapView>
		<JourneyEdgesSection/>
		<Row></Row>
	</Column>
)