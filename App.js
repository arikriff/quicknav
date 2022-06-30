import React from 'react'
import { JourneyPlanningScreen, StopListScreen } from '../quicknav/src/modules/component/visual/Screen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ContextProvider } from '../quicknav/src/modules/component/invisual/Context'
import Data from '../quicknav/src/modules/info/Data'
import { origin } from '../quicknav/src/modules/info/StopUse'
import styles from '../quicknav/src/modules/component/invisual/styles'

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

export default App