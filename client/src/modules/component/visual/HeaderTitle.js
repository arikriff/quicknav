import React from 'react'
import styles from '../invisual/styles'

export default ({title}) => (
  <Row style={styles.componentInColumn}>
    <Text style={styles.screenHeaderTitle}>
      {title}
    </Text>
  </Row>
)