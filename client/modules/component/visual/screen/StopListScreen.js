import React, { useEffect } from 'react';
import { FlatList, TouchableOpacity } from 'react-native'
import { getJourneyStopsData } from '../../../info/Data';
import { fromCollege, toCollege } from '../../../info/Direction';
import { origin } from '../../../info/StopUse'
import { getContext } from '../../Context'
import { Column, Row } from '../Container'


const Item = ({stopItem, navigation, stopUse}) => {
  
  const onPress = () => {

    context.setState({
      data: context.state.data,
      direction: stopUse === origin ? toCollege : fromCollege,
      stopId: stopItem.id
    })

    navigation.goBack()

  }

  return (
    <TouchableOpacity onPress={onPress}>
      <Row>
        <Text>
          {stopItem.name}
        </Text>
      </Row>
    </TouchableOpacity>
  )
}

export default ({route}) => {

  const context = getContext()
  let navigation, stopUse
  let journeyStopsData

  useEffect(() => {

    navigation = route.params.navigation
    stopUse = route.params.stopUse

    journeyStopsData = getJourneyStopsData(
      context.state.data.line.stops,
      context.state.data.stops.features,
      stopUse
    )

  })

  const renderItem = ({stopItem, navigation, stopUse}) => (
    <Item
      stopItem={stopItem}
      navigation={navigation}
      stopUse={stopUse}
    />
  )

  return (
    <Column>
      <FlatList
        data={journeyStopsData}
        renderItem={renderItem}
      />
    </Column>
  )
}

