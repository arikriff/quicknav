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

const fs = require('fs')

const App = () => {
  
  const Stack = createNativeStackNavigator()
  
  return (
    <AppContext.Provider value={{direction, setDirection}}>
      <NavigationContainer>
        {
          isErr ?
          (
            <Stack.Navigator>
              <Stack.Screen
                name='DataError'
                component={DataErrorScreen}
                options={{title: 'שגיאה'}}
              />
            </Stack.Navigator>
          ) :
          (
            <Stack.Navigator>
              <Stack.Screen
                name='JourneyPlanning'
                component={JourneyPlanningScreen}
                options={{
                  title: 'תכנון מסלול',
                  data: DATA
                }}
              />
              <Stack.Screen
                name='StopList'
                component={StopListScreen}
              />
            </Stack.Navigator>
          )
        }
      </NavigationContainer>
    </AppContext.Provider>
  )
}

export default App;
