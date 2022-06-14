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
import { toCollege } from './modules/dataInfo/Direction'

const fs = require('fs')

const [direction, setDirection] = useState(toCollege)
const AppContext = React.createContext({direction, setDirection})

const App = () => {
  
  const Stack = createNativeStackNavigator()
  const isErr = false
  
  try {

    fs.readFile('../server/src/db/line.json', 'utf8', (err, lineJsonString) => {

      if (err) {
        console.log('Error read JSON file:', err)
        throw err
      }

      fs.readFile('../server/src/db/route.geojson', 'utf8', (err, routeGeojsonString) => {

        if (err) {
          console.log('Error read JSON file:', err)
          throw err
        }

        fs.readFile('../server/src/db/stops.geojson', 'utf8', (err, stopsGeojsonString) => {

          if (err) {
            console.log('Error read JSON file:', err)
            throw err
          }
          
          try {
            const DATA = {}

            DATA.line = JSON.parse(lineJsonString)
            DATA.route = JSON.parse(routeGeojsonString)
            DATA.stops = JSON.parse(stopsGeojsonString)

          }

          catch {
            console.log('Error parsing JSON string:', err)
            throw err
          }
        })
      })
    })
  }

  catch (err) {
    isErr = true
  }

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
