import React from 'react'
import styles from '../invisual/styles'
import { Column } from './Container'
import JourneyTextInput from './JourneyTextInput'
import { origin, destination } from '../../info/StopUse'
import { getCollegeStopData } from '../../info/Data'
import LineMap from './LineMap'
import { Button, ScrollView } from 'react-native'
import { getContext } from '../invisual/Context'
import { getNextTrips } from '../../info/Data'
import NextTripsView from './NextTripsView'
import moment from 'moment'

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

	const collegeStopData = getCollegeStopData()
	const collegeStopName = collegeStopData.name

	const context = getContext()

	return (
		<Section>
			<ScrollView keyboardShouldPersistTaps='handled'>
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
			</ScrollView>
			<Button
				title='נווט'
				style={[styles.visual, styles.componentInColumn]}
				onPress={() => {
					
					if (context.state.stop) {

						const now = moment()

						const nextTrips = getNextTrips (
							context.state.stop.id,
							context.state.direction,
							now
						)
						
						context.setState({
							direction: context.state.direction,
							stop: context.state.stop,
							nextTrips: nextTrips,
							now
						})

					}
				}}
			/>
			<NextTripsView/>
		</Section>
	)

}