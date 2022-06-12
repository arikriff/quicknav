import React from 'react'
import {TouchableOpacity, Text} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {Row, Column} from './Container'
import AlignedTextInput from './AlignedTextInput'
import styles from '../styles'

export default ({origin, destination}) => (
	<Column>
		<Row style={[styles.journeyEdgesRow]}>
			<AlignedTextInput
				placeholder='מהיכן נוסעים?'
				defaultValue={origin ? origin : undefined}
				
				style={styles.journeyEdgesPaddedInput}
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
			<AlignedTextInput
				placeholder='לאן נוסעים?'
				defaultValue={destination ? destination : undefined}
			/>
		</Row>
	</Column>
)