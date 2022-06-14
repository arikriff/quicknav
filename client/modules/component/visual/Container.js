import React from 'react'
import {View} from 'react-native'
import styles from '../styles'


const Container = props => (
  <View
    style={[
      styles[props.type],
      props.style ? props.style : null,
      styles.container ? styles.container : null
    ]}
  >
    {props.children}
  </View>
)

const Row = props => (
  <Container
    type='row'
    style={props.style}
  >
    {props.children}
  </Container>
)

const Column = props => (
  <Container
    type='column'
    style={props.style}
  >
    {props.children}
  </Container>
)
export {Row, Column}