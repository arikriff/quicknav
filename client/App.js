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
 
 const App = () => {
   
   const Stack = createNativeStackNavigator()
   const DATA = Data()
 
   return (
     <ContextProvider data={DATA}>
       <NavigationContainer>
         <Stack.Navigator initialRouteName='JourneyPlanning'>
           <Stack.Screen name='JourneyPlanning' component={JourneyPlanningScreen}/>
           <Stack.Screen name='StopList' component={StopListScreen}/>
         </Stack.Navigator>
       </NavigationContainer>
     </ContextProvider>
   )
 }
 
 export default App;