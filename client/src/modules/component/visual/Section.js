import React from 'react'
import styles from '../invisual/styles'
import { Column } from './Container'
import JourneyTextInput from './JourneyTextInput'
import { origin, destination } from '../../info/StopUse'
import { getContext } from '../invisual/Context'
import { getCollegeStopData } from '../../info/Data'
import LineMap from './LineMap'

const Section = ({children}) => (
  <Column style={styles.section}>
    {children}
  </Column>
)

export const MapSection = () => (
  <Section>
    <LineMap/>
  </Section>
)

export const JourneyPlanningSection = ({navigation}) => {

	const context = getContext()

	const collegeStopData = getCollegeStopData(
		context.state.data.line.stops,
		context.state.data.stops.features
	)
	
	const collegeStopName = collegeStopData.name

	return (
		<Section>
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
		</Section>
	)

}