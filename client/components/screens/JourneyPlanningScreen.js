import React, { useState } from 'react'
import {TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import MapView from 'react-native-maps'
import {Column, Row} from '../helpers/Container'
import JourneyEdgesSection from '../helpers/JourneyEdgesSection'
import styles from '../styles'
	
export default props => {

	const [use, setUse] = useState(true)

	const setToCollege = setUse(true)
	const setFromCollege = setUse(false)

	const collegeStopName = props.data.stops.features.find (
		stop1 =>
		stop1.properties.stop_id ==
		(
			props.data.line.stops.find(stop2 => stop2.use.college).id
		)
	).properties.stop_name

	
	
	return (
	<Column>
		<MapView>
			<Geojson
				geojson={props.data.route}
			/>
			<Geojson
				geojson={props.data.stops}
			/>
		</MapView>
		<Row style={[styles.journeyEdgesRow]}>
			<TextInput
				editable={false}
				placeholder='לאן נוסעים?'
				onPressIn={() => {
					props.navigation.navigate('StopList', {
						stops: props.data.line.stops.filter(stop => !stop.use.college && stop.use.origin),
						toCollege: true
					})
				}}
				value={
					props.toCollege === undefined ?
					null :
					(
						props.toCollege === true ?
						(
							props.data.stops.features.find (
								stop => stop.properties.stop_id == props.stopId
							).properties.stop_name
						) :
						(
							props.data.stops.features.find (
								stop1 =>
								stop1.properties.stop_id ==
								(
									props.data.line.stops.find(stop2 => stop2.use.college).id
								)
							).properties.stop_name
						)
					)
				}
				style={[styles.journeyEdgesPaddedInput, styles.alignedTextInput]}
			/>
			<TouchableOpacity style={styles.container}>
				<Icon
					name='swap-vertical'
					style={[
						styles.padded,
						styles.smallIcon
					]}
				/>
			</TouchableOpacity>
		</Row>
		<Row style={[styles.journeyEdgesRow]}>
			<TextInput
				editable={false}
				placeholder='לאן נוסעים?'
				onPressIn={() => {
					props.navigation.navigate('StopList', {
						stops: props.data.line.stops.filter(stop => !stop.use.college && stop.use.origin),
						toCollege: false
					})
				}}
				value={
					props.toCollege === undefined || props.toCollege === true ?
					null :
					(
						props.data.stops.features.find (
							stop => stop.properties.stop_id == props.stopId
						).properties.stop_name
					)
				}
			/>
		</Row>
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
)}