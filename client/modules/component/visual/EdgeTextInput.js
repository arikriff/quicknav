import React from 'react'
import {TextInput} from 'react-native'
import Direction from '../../dataInfo/Direction'
import Use from '../../dataInfo/Use'
import { getContext } from '../Context'

import styles from '../styles'

export default props => {

	const context = getContext()

	return (
		<TextInput
			placeholder={props.state == Use.origin ? 'מאיפה נוסעים?' : 'לאן נוסעים?'}
			editable={false}
		/>
	)
}