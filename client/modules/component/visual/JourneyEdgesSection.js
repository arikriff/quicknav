import React, { useEffect, useState } from 'react'
import {TouchableOpacity, Text} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {Row, Column} from './Container'
import AlignedTextInput from './EdgeTextInput'
import styles from '../styles'
import { toCollege, fromCollege } from '../../info/Direction'

export default props => {

	const [direction, setDirection] = useState(toCollege)
	const [journeyStop, setJourneyStop] = useState(null)
	
	useEffect(() => {

		if (props.direction !== undefined && props.journeyStop != null) {
			setDirection(props.direction)
			setJourneyStop(props.journeyStop)
		}

	})

	return (
		<Column>
		</Column>
	)
}
