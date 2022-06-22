import React from 'react'
import {View} from 'react-native'
import styles from '../invisual/styles'

export const Row = ({style, children}) => (
  <View style={[styles.row, style]}>
    {children}
  </View>
)

export const Column = ({style, children}) => (
  <View style={[styles.column, style]}>
    {children}
  </View>
)