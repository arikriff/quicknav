/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react'
 import DataErrorScreen from './src/component/visual/screen/DataErrorScreen'
 import JourneyPlanningScreen from './src/component/visual/screen/JourneyPlanningScreen'
 import StopListScreen from './src/component/visual/screen/StopListScreen'
 import { NavigationContainer } from '@react-navigation/native'
 import { createNativeStackNavigator } from '@react-navigation/native-stack'
 import { ContextProvider } from './src/component/unvisual/Context'
 import Data from './src/info/Data'
 
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