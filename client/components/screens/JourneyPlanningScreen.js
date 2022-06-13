import React, { useState } from 'react'
import {TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import MapView from 'react-native-maps'
import {Column, Row} from '../helpers/Container'
import JourneyEdgesSection from '../helpers/JourneyEdgesSection'
import styles from '../styles'

export default props => (
	<Column>
		<MapView>
			<Geojson
				geojson={props.data.route}
			/>
			<Geojson
				geojson={props.data.stops}
			/>
		</MapView>
		
	</Column>
)
		<TouchableOpacity>
			<Row>
				<Text>
					בדוק זמני נסיעה
				</Text>
			</Row>
		</TouchableOpacity>
		<Row></Row>
	</Column>
)