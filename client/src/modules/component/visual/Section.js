import React from 'react'
import styles from '../invisual/styles'
import { Column } from './Container'
import JourneyTextInput from './JourneyTextInput'
import { origin, destination } from '../../info/StopUse'
import { getCollegeStopData } from '../../info/Data'
import LineMap from './LineMap'
import { Button } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

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
			/>
		</Section>
	)

}