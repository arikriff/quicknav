import React from 'react'
import { TextInput } from 'react-native'
import { getContext } from '../Context'
import { origin } from '../../info/StopUse'

import { fromCollege } from '../../info/Direction'
import styles from '../styles'

export default ({navigation, stopUse, collegeStopName}) => {

	const context = getContext()

	const onPressIn = () => {navigation.navigate(
		'StopList',
		{
			navigation,
			stopUse
		}
	)}
	
	return (
		<TextInput
			placeholder={stopUse === origin ? 'תחנת המוצא' : 'תחנת היעד'}
			editable={false}
			value={
				(stopUse === origin) == (context.state.direction === fromCollege) ?
				collegeStopName : (
					context.state.stop ? context.state.stop.name : ''
				)
			}
			onPressIn={() => {navigation.navigate('StopList', {navigation, stopUse})}}
		/>
	)
}