import React from 'react'
import { FlatList, TouchableOpacity, Text } from 'react-native'
import { Column, Row } from './Container'
import { MapSection, JourneyPlanningSection } from './Section'
import { getJourneyStopsData } from '../../info/Data';
import { fromCollege, toCollege } from '../../info/Direction';
import { origin } from '../../info/StopUse'
import { getContext } from '../invisual/Context'
import styles from '../invisual/styles';

const Screen = ({children}) => (
  <Column style={styles.visual}>
    {children}
  </Column>
)

const StopListItem = ({stopItem, navigation, stopUse}) => {

  const context = getContext()
  
  const onPress = () => {

    context.setState({
      direction: stopUse === origin ? toCollege : fromCollege,
      stop: stopItem
    })

    navigation.goBack()

  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.componentInColumn, styles.visual]}
    >
      <Row style={styles.componentInColumn}>
        <Text style={[styles.visual, styles.stopItemText]}>
          {stopItem.name}
        </Text>
      </Row>
    </TouchableOpacity>
  )
}

export const StopListScreen = ({navigation, route}) => {

  const context = getContext()
  const stopUse = route.params.stopUse

  const renderItem = ({item}) => (
    <StopListItem
      stopItem={item}
      navigation={navigation}
      stopUse={stopUse}
    />
  )

  return (
    <Screen>
      <FlatList
        data={getJourneyStopsData(stopUse)}
        renderItem={renderItem}
        keyboardShouldPersistTaps='handled'
        style={styles.viewInColumn}
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


