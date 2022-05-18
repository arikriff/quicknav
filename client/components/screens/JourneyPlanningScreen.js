import React from 'react'
import {TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import MapView from 'react-native-maps'
import {Column} from '../helpers/Container'
import JourneyEdgesSection from '../helpers/JourneyEdgesSection'
import styles from '../styles'
	
export default () => (
	<Column>
		<TouchableOpacity>
			<Icon name='settings'/>
		</TouchableOpacity>
		<MapView
			style={styles.map}
			initialRegion={{
				latitude: 37.78825,
				longitude: -122.4324,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421,
			}}
		/>
		<JourneyEdgesSection/>
	</Column>
)