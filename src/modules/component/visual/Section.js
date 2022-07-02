import React, { useEffect } from 'react'
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
import moment from 'moment-timezone'
moment.tz('Israel');

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

	const onPress = () => {
					
		if (context.state.stop) {
			const nextTrips = getNextTrips(
				context.state.stop.id,
				context.state.direction
			)
			
			context.setState({
				direction: context.state.direction,
				stop: context.state.stop,
				nextTrips: nextTrips
			})

		}
	}



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
				onPress={onPress}
			/>
			<NextTripsView/>
		</Section>
	)

}