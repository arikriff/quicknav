import React from 'react'
import { Column } from './Container'
import JourneyTextInput from './JourneyTextInput'
import {origin, destination } from '../../../info/StopUse'
import { getContext } from '../../unvisual/Context'
import { getCollegeStopData } from '../../../info/Data'


export default ({navigation}) => {

	const context = getContext()

	const collegeStopData = getCollegeStopData(
		context.state.data.line.stops,
		context.state.data.stops.features
	)
	
	const collegeStopName = collegeStopData.name

	return (
		<Column>
			<JourneyTextInput
				navigation={navigation}
				stopUse={origin}
				collegeStopName={collegeStopName}
			/>
			<JourneyTextInput
				navigation={navigation}
				stopUse={destination}
				collegeStopName={collegeStopName}
			/>
		</Column>
	)

}
