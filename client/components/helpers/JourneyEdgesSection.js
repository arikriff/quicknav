import React, { useEffect, useState } from 'react'
import {TouchableOpacity, Text} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {Row, Column} from './Container'
import AlignedTextInput from './AlignedTextInput'
import styles from '../styles'

export default props => {

	const [direction, setDirection] = useState(true)
	const [journeyStop, setJourneyStop] = useState(null)
	
	useEffect(() => {

		if (props.direction !== undefined && props.journeyStop != null) {
			const 
		}


		if (journeyStop != null && props.direction ^ direction)
			setDirection(!direction)
	})

	return (
		<Column>
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
}
