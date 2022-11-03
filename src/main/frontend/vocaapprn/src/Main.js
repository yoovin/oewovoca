import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TouchableHighlight} from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {RFPercentage} from "react-native-responsive-fontsize"
import { useRecoilState, useSetRecoilState} from 'recoil'
import { date, today, userid, mno, chain, goal } from './atom'
import 'react-native-get-random-values'
import {v4} from 'uuid'
import Navi from './Navi'
import {ENV_BACKSERVER} from '@env'

/* 
    main 컴포넌트
    1. 유저의 id값을 가져옴
    2. selectDate 오늘날짜로 만듦 => 복습하기는 그때 바꿔짐
*/

export default function Main({navigation}) {
    const setSelectDate = useSetRecoilState(date)
    const setToday = useSetRecoilState(today)
    const [userId, setUserId] = useRecoilState(userid)
    const [Mno, setMno] = useRecoilState(mno)
    const [constructorHasRun, setConstructorHasRun] = useState(false)
    const [todayChain, setTodayChain] = useRecoilState(chain)
    const setGoal = useSetRecoilState(goal)
    

    const storeAsync = async(key, value) => {
        try{
            await AsyncStorage.setItem(key, value)
            console.log("등록 완료")
        }catch(error){
            console.log(error)
        }
    }

    const getId = async() => {
        try{
            const currentUserid = await AsyncStorage.getItem('userid')
            if(currentUserid !== null){
                setUserId(currentUserid)
            }else{
                navigation.navigate("Menual")
                const createdUserid = v4()
                await storeAsync('userid', createdUserid)
                await axios.post(ENV_BACKSERVER + "member/",{"email": createdUserid, "nick": "default"})
                .then(res =>{
                    if(res.data == 1){
                        console.log("회원가입 완료")
                        setUserId(createdUserid)
                    }else{
                        console.log("회원가입 실패")
                    }
                })
                .catch(e => console.error(e))
            }
        }catch(e){
            console.error(e)
        }
    }

    const getToday = () => {
        const newDate = new Date()
        return `${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()  < 10 && '0' + newDate.getDate()}`
    }

    const constructor = async() =>{
        if(constructorHasRun) return
        /* Constructor 본문 */
        // userid 적용하기
        getId()

        // 오늘 날짜 가져오기
        setToday(getToday())
        setConstructorHasRun(true)
    }
    constructor()

    useEffect(() => {
        axios.post(`${ENV_BACKSERVER}member/login`, {
            email: userId
        })
        .then(res => {
            setMno(res.data.mno)
            setTodayChain(res.data.chain)
            setGoal(parseInt(res.data.goal))
            console.log(res.data)
            console.log(Mno)
        })
        .catch(e => console.error(e))
    },[userId])

    useEffect(()=>{
    }, [])

    const menual = <TouchableOpacity
    activeOpacity={0.8}
    onPress={() => navigation.navigate("Menual")}
    >
    <Text style={[styles.buttonText, {fontSize: RFPercentage(2)}]}>사용방법</Text>
    </TouchableOpacity>

    return (
    <View style={styles.container}>
    <Navi right={menual}></Navi>
        {/* <View style={styles.logoContainer}>
        </View> */}
        <View style={{flex: 1.5, padding: 30, justifyContent:'center'}}>
            <Text style={styles.mainText}>안녕하세요</Text>
            <Text style={styles.mainText}>오늘도 단어를 외워보아요</Text>
            <Text style={styles.mainText}><Text style={{color:'red', fontSize:RFPercentage(7)}}>{todayChain}</Text>일째 도전중!</Text>
        </View>
        <View style={styles.buttonContainer}>
            <TouchableHighlight 
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('HistoryCalendar')}
            >
                <Text style={styles.buttonText}>복습하기</Text>
            </TouchableHighlight>

            <TouchableOpacity 
            style={styles.button} 
            activeOpacity={0.8}
            onPress={() => {
                navigation.navigate('VocaLearn')
                setSelectDate(getToday())
            }}>
                <Text style={styles.buttonText}>오늘의 단어</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => navigation.navigate("Setting")}>
                <Text style={styles.buttonText}>설정</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    logoContainer: {
        flex: 1,
    },
    mainText: {
        fontSize: RFPercentage(4.5),
        color: 'black',
        fontFamily: 'BMJUA',
        marginVertical: 5,
    },

    buttonContainer: {
        flex: 2,
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