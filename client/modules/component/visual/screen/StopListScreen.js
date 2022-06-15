import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { getContext } from '../../Context';
import { Column } from '../Container';

const Item = props => {

  const context = getContext()

  return (
    <TouchableOpacity
      onPress={() => {
        
      }}
    >

    </TouchableOpacity>
  )
}

export default props => {

  const context = getContext()

  return (
    <Column>
    </Column>
  )
}

