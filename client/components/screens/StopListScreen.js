import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Column, Row } from '../helpers/Container';

export default props => (
  <FlatList
    data={props.data}
    renderItem={item => (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('JourneyPlanning', {stopId: item.id})
        }}
      >
        <Column>
          <Row>
            <Text>
              {item.name}
            </Text>
          </Row>
        </Column>
      </TouchableOpacity>
    )}
  />
)

