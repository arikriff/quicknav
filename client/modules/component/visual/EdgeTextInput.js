import React, { useEffect } from 'react'
import {TextInput} from 'react-native'
import { toCollege } from '../../dataInfo/Direction'
import { origin, destination } from '../../dataInfo/Use'
//
import styles from '../styles'

export default props => {

	const [direction, setDirection] = useState(props.direction)

	useEffect(() => {
		if (props.direction !== undefined) setDirection(props.direction)
	})
	
	return (
		
			<TextInput
				placeholder={
					props.use === undefined || props.use === origin ?
					'מאיפה נוסעים?' :
					'לאן נוסעים'
				}
				editable={false}
				value=
				onPressIn={props.onPressIn}
				style={[
					styles.alignedTextInput,
					...(props.styles ? props.styles : null)
				]}
			/>
		</View>
	)
}