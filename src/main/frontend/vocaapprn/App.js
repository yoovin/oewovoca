/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { RecoilRoot } from 'recoil'
import Login from './src/Login'
import Main from './src/Main'
import Navi from './src/Navi'
import VocaToday from './src/VocaToday'
import VocaTest from './src/VocaTest'
import Setting from './src/Setting'
import HistoryCalendar from './src/HistoryCalendar'

const Stack = createNativeStackNavigator()

const App = () => {
    return(
        <RecoilRoot>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Login'>
                    <Stack.Group screenOptions={{headerShown: false}}>
                        <Stack.Screen name="navi" component={Navi}/>
                        <Stack.Screen name="Login" component={Login}/>
                        <Stack.Screen name="Main" component={Main}/>
                        <Stack.Screen name="VocaToday" component={VocaToday}/>
                        <Stack.Screen name="VocaTest" component={VocaTest}/>
                    </Stack.Group>
                    <Stack.Group screenOptions={{headerShown: false, presentation: 'modal'}}>
                    <Stack.Screen name="Setting" component={Setting}/>
                    <Stack.Screen name="HistoryCalendar" component={HistoryCalendar}/>
                    </Stack.Group>
                </Stack.Navigator>
            </NavigationContainer>
        </RecoilRoot>
    )
}

export default App
