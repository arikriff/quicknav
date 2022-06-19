/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import DataErrorScreen from './modules/component/visual/screen/DataErrorScreen'
import JourneyPlanningScreen from './modules/component/visual/screen/JourneyPlanningScreen'
import StopListScreen from './modules/component/visual/screen/StopListScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ContextProvider } from './modules/component/Context'
import Data from './modules/info/Data'

const App = () => {
  
  const Stack = createNativeStackNavigator()
  const DATA = Data()

  return (
    <ContextProvider data={DATA}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={DATA ? 'JourneyPlanning' : 'DataError'}>
          <Stack.Screen name='JourneyPlanning' component={JourneyPlanningScreen}/>
          <Stack.Screen name='StopList' component={StopListScreen}/>
          <Stack.Screen name='DataError' component={DataErrorScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  )
}

export default App;
