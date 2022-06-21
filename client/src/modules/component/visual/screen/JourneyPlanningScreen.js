import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import Map from '../helper/Map' 
import { Column } from '../helper/Container'
import JourneyPlanningSection from '../helper/JourneyPlanningSection'
import { getContext } from '../../unvisual/Context'
import styles from '../../unvisual/styles'

export default ({navigation}) => {

	return (
		<Column>
			<Map/>
			<JourneyPlanningSection navigation={navigation}/>
			<TouchableOpacity>
				<Text>
					נווט
				</Text>
			</TouchableOpacity>
		</Column>
	)
}