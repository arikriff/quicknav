import React, { useEffect } from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { Column, Row } from './Container'
import { MapSection, JourneyPlanningSection } from './Section'
import { getJourneyStopsData } from '../../info/Data';
import { fromCollege, toCollege } from '../../info/Direction';
import { origin } from '../../info/StopUse'
import { getContext } from '../invisual/Context'
import styles from '../invisual/styles';

const Screen = ({children}) => (
  <Column style={styles.screen}>
    {children}
  </Column>
)

const StopListItem = ({stopItem, navigation, stopUse}) => {
  
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

export const StopListScreen = ({route}) => {

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
    <StopListItem
      stopItem={stopItem}
      navigation={navigation}
      stopUse={stopUse}
    />
  )

  return (
    <Screen>
      <FlatList
        data={journeyStopsData}
        renderItem={renderItem}
      />
    </Screen>
  )
}

export const JourneyPlanningScreen = ({navigation}) => (
	<Screen>
		<MapSection/>
		<JourneyPlanningSection navigation={navigation}/>
	</Screen>
)


