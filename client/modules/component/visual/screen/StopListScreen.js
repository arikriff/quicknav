import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Column, Row } from '../Container';

export default props => (
  <FlatList
    data={props.stops}
    renderItem={item => (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('JourneyPlanning', {
            stopId: item.id,
            toCollege: props.toCollege
          })
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

