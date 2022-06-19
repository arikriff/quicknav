/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react'
import DataErrorScreen from './modules/component/visual/screen/DataErrorScreen'
import JourneyPlanningScreen from './modules/component/visual/screen/JourneyPlanningScreen'
import StopListScreen from './modules/component/visual/screen/StopListScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { toCollege } from './modules/info/Direction'
import { ContextProvider } from './modules/component/Context'
import Data from './modules/info/Data'

const App = () => {
  
  const Stack = createNativeStackNavigator()
  const DATA = Data()

  return (
    <ContextProvider data={DATA}>
      <Stack.Navigator initialRouteName={DATA ? 'JourneyPlanning' : 'DataError'}>
        <Stack.Screen name='JourneyPlanning' component={JourneyPlanningScreen}/>
        <Stack.Screen name='StopList' component={StopListScreen}/>
        <Stack.Screen name='DataError' component={DataErrorScreen}/>
      </Stack.Navigator>
    </ContextProvider>
  )
}

export default App;
