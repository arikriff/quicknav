import React from 'react'
import {TouchableOpacity, Text} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {Row, Column} from './Container'
import AlignedTextInput from './AlignedTextInput'
import styles from '../styles'

export default props => (
	<Column>
		<Row style={[styles.journeyEdgesRow]}>
			<AlignedTextInput
				placeholder='מהיכן נוסעים?'
				defaultValue={props.origin ? props.origin : undefined}
				onPressIn={() => {
					
				}}
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
				defaultValue={props.destination ? props.destination : undefined}
			/>
		</Row>
	</Column>
)