import React from 'react'
import styles from '../invisual/styles'
import { Column } from './Container'
import JourneyTextInput from './JourneyTextInput'
import { origin, destination } from '../../info/StopUse'
import { getCollegeStopData } from '../../info/query/StopQuery'
import LineMap from './LineMap'
import { Button } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { getContext } from '../invisual/Context'
import { getNextTrips } from '../../info/Data'
import moment from 'moment'
import NextTripsView from './NextTripsView'

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
				onPress={() => context.setState({
					direction: context.state.direction,
					stop: context.state.stop,
					nextTrips: getNextTrips(context.state.stop.id, context.state.direction),
					now: moment()
				})}
			/>
			<NextTripsView/>
		</Section>
	)

}