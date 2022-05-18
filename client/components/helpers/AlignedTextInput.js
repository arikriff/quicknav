import React from 'react'
import {TextInput} from 'react-native'
//
import styles from '../styles'

export default props => (
	<TextInput
		placeholder={props.placeholder}
		style={[
			styles.alignedTextInput,
			props.styles ? props.styles : null
		]}
	/>
)