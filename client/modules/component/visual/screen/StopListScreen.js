import React, { useEffect } from 'react';
import { FlatList, TouchableOpacity } from 'react-native'
import { getJourneyStopsData } from '../../../info/Data';
import { fromCollege, toCollege } from '../../../info/Direction';
import { origin } from '../../../info/StopUse'
import { getContext } from '../../Context'
import { Column, Row } from '../Container'

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

  const Item = ({stopItem}) => {
  
    const onPress = () => {
  
      context.setState({
        data: context.state.data,
        direction: stopUse === origin ? toCollege : fromCollege,
        stop: stopId
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

  const renderItem = ({StopItem}) => (
    <Item stopItem={stopItem}/>
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

