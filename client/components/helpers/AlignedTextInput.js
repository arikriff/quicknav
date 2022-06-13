import React from 'react'
import {TextInput} from 'react-native'
//
import styles from '../styles'

export default props => {
	
}
	<TextInput
		placeholder={props.placeholder}
		defaultValue={props.defaultValue}
		onPressIn={props.onPressIn}
		value={props.value}
		style={[
			styles.alignedTextInput,
			props.styles ? props.styles : null
		]}
	/>
)