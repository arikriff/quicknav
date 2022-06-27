/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { JourneyPlanningScreen, StopListScreen } from './src/modules/component/visual/Screen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ContextProvider } from './src/modules/component/invisual/Context'
import Data from './src/modules/info/Data'
import { origin } from './src/modules/info/StopUse'
import styles from './src/modules/component/invisual/styles'
import HeaderTitle from './src/modules/component/visual/HeaderTitle'

const App = () => {
  
  const Stack = createNativeStackNavigator()
  const DATA = Data()

  return (
    <ContextProvider data={DATA}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='JourneyPlanning'
          screenOptions={{
            headerStyle: styles.screenHeader,
            headerTitleAlign: 'center',
            headerTitleStyle: styles.screenHeaderTitle
          }}
        >
          <Stack.Screen
            name='JourneyPlanning'
            component={JourneyPlanningScreen}
            options={{
              title: 'תכנון מסלול נסיעה'
            }}
          />
          <Stack.Screen
            name='StopList'
            component={StopListScreen}
            options={({route}) => ({
              title: `בחירת תחנת ${route.params.stopUse === origin ? 'מוצא' : 'יעד'}`
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  )
}

export default App;