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
import Main from './src/Main'
import Navi from './src/Navi'
import VocaLearn from './src/VocaLearn'
import VocaTest from './src/VocaTest'
import Setting from './src/Setting'
import HistoryCalendar from './src/HistoryCalendar'
import VocaResult from './src/VocaResult'
import Menual from './src/Menual'
import Toast from 'react-native-toast-message'

const Stack = createNativeStackNavigator()

const App = () => {
    return(
        <RecoilRoot>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Main'>
                    <Stack.Group screenOptions={{headerShown: false}}>
                        <Stack.Screen name="navi" component={Navi}/>
                        <Stack.Screen name="Main" component={Main}/>
                        <Stack.Screen name="VocaLearn" component={VocaLearn}/>
                        <Stack.Screen name="VocaTest" component={VocaTest}/>
                        <Stack.Screen name="HistoryCalendar" component={HistoryCalendar}/>
                        <Stack.Screen name="VocaResult" component={VocaResult}/>
                        <Stack.Screen name="Setting" component={Setting}/>
                    </Stack.Group>
                    <Stack.Group screenOptions={{headerShown: false, presentation: 'modal'}}>
                        <Stack.Screen name="Menual" component={Menual}/>
                    </Stack.Group>
                </Stack.Navigator>
            </NavigationContainer>
            <Toast/>
        </RecoilRoot>
    )
}

export default App
