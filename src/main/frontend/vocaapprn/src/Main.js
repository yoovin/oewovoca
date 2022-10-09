import React, { useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TouchableHighlight} from 'react-native'
import {RFPercentage} from "react-native-responsive-fontsize"
import { useRecoilState} from 'recoil'
import { voca } from './atom'

export default function Main({navigation}) {
    const [todayVoca, setTodayVoca] = useRecoilState(voca)
    const getData = {
        "hvo": {
            "hno": 8,
            "mno": 1,
            "regAt": "2022-10-09",
            "correct": 0,
            "wrong": 0
        },
        "vocaList": [
            {
                "vno": 8,
                "origin": "excessive",
                "meanList": [
                    "지나친",
                    "과도한"
                ],
                "lang": "\u0000",
                "new": true
            },
            {
                "vno": 2,
                "origin": "sophistication",
                "meanList": [
                    "세련",
                    "정교함"
                ],
                "lang": "\u0000",
                "new": false
            },
            {
                "vno": 4,
                "origin": "consecutively",
                "meanList": [
                    "연속적으로"
                ],
                "lang": "\u0000",
                "new": false
            },
            {
                "vno": 11,
                "origin": "prohibit",
                "meanList": [
                    "금지하다"
                ],
                "lang": "\u0000",
                "new": false
            },
            {
                "vno": 3,
                "origin": "consecutive",
                "meanList": [
                    "연속적인",
                    "연이은"
                ],
                "lang": "\u0000",
                "new": false
            },
            {
                "vno": 9,
                "origin": "direct",
                "meanList": [
                    "직접적인",
                    "지시하다",
                    "(길을)안내하다",
                    "~로 향하다"
                ],
                "lang": "\u0000",
                "new": true
            },
            {
                "vno": 5,
                "origin": "conveniently",
                "meanList": [
                    "편리하게"
                ],
                "lang": "\u0000",
                "new": true
            },
            {
                "vno": 6,
                "origin": "speculate",
                "meanList": [
                    "추측하다",
                    "짐작하다"
                ],
                "lang": "\u0000",
                "new": false
            },
            {
                "vno": 10,
                "origin": "circumscribe",
                "meanList": [
                    "제한하다",
                    "억제하다"
                ],
                "lang": "\u0000",
                "new": true
            },
            {
                "vno": 7,
                "origin": "scenery",
                "meanList": [
                    "경치",
                    "풍경"
                ],
                "lang": "\u0000",
                "new": true
            }
        ]
    }
    useEffect(()=>{
        setTodayVoca(getData.vocaList)
        // 서버에서 today voca데이터 가져와서 저장하기
    }, [])

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>

        </View>
        <View style={styles.buttonContainer}>
            <TouchableHighlight style={styles.button}>
                <Text style={styles.buttonText}>단어 검색</Text>
            </TouchableHighlight>

            <TouchableOpacity 
            style={styles.button} 
            activeOpacity={0.8}
            onPress={() => {
                navigation.navigate('VocaToday')
            }}>
                <Text style={styles.buttonText}>오늘의 단어</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                <Text style={styles.buttonText}>복습하기</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    logoContainer: {
        flex: 1
    },

    buttonContainer: {
        flex: 1,
        left: '25%',
        width: '50%',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    button: {
        flex: 1,
        marginBottom: '20%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFA05A',
    },

    buttonText:{
        fontFamily: 'BMJUA',
        color: 'white',
        fontWeight: 'bold',
        fontSize: RFPercentage(4),
    },
})