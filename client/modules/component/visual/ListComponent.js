import React from 'react'
import {Text} from 'react-native'
import {Row} from './Container'
import styles from '../styles'

const SectionHeader = ({section}) => (
	(
		section.data !== undefined &&
		section.data.length !== undefined &&
		section.data.length === 0
	) ?
	null :
	(
		<Row style={styles.item}>
			<Text style={styles.sectionTitle}>
				{section.title}
			</Text>
		</Row>
	)
)

export {SectionHeader}