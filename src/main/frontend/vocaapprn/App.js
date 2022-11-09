/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
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
import SplashScreen from 'react-native-splash-screen'

const Stack = createNativeStackNavigator()

const App = () => {
    useEffect(() => {
        try {
          setTimeout(() => {
            SplashScreen.hide(); /** 추가 **/
          }, 2000); /** 스플래시 시간 조절 (2초) **/
        } catch(e) {
          console.warn('에러발생');
          console.warn(e);
        }
      });

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
