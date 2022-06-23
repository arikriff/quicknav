import React, { useEffect } from 'react'
import { TextInput } from 'react-native'
import { getContext } from '../invisual/Context'
import { origin } from '../../info/StopUse'
import { fromCollege } from '../../info/Direction'
import styles from '../invisual/styles'

export default ({navigation, stopUse, collegeStopName}) => {

	let context = getContext()

	const onPressIn = () => {navigation.navigate('StopList', {stopUse})}
	
	return (
		<TextInput
			placeholder={stopUse === origin ? 'תחנת המוצא' : 'תחנת היעד'}
			editable={true}
			value={
				((stopUse === origin) === (context.state.direction === fromCollege)) ?
				collegeStopName :
				(context.state.stop ? context.state.stop.name : '')
			}
			onPressIn={onPressIn}
			style={[styles.componentInColumn, styles.visual]}
		/>
	)
}