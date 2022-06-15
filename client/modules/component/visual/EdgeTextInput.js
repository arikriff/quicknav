import React from 'react'
import {TextInput} from 'react-native'
import { getContext } from '../Context'
import { origin } from '../../info/StopUse'

import { fromCollege } from '../../info/Direction'
import styles from '../styles'

export default props => {

	const context = getContext()

	return (
		<TextInput
			placeholder={props.stopUse === origin ? 'תחנת המוצא' : 'תחנת היעד'}
			editable={false}
			value={
				(props.stopUse === origin) == (context.state.direction === fromCollege) ?
				props.collegeStopName : (
					context.state.stop ? context.state.stop.name : ''
				)
			}
			onPressIn={() => {
				const {navigation, stopUse} = props
				navigation.navigate('StopList', {navigation, stopUse})
			}}
		/>
	)
}