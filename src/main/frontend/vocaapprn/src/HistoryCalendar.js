import { StyleSheet,SafeAreaView, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Calendar, LocaleConfig} from 'react-native-calendars'
import {RFPercentage} from "react-native-responsive-fontsize"
import { useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil'
import { date, mno, today } from './atom'
import Navi from './Navi'
import axios from 'axios'
import {ENV_BACKSERVER} from '@env'

export default function HistoryCalendar({navigation}) {
    const [currentDate, setCurrentDate] = useRecoilState(date)
    const Today = useRecoilValue(today)
    const Mno = useRecoilValue(mno)
    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [constructorHasRun, setConstructorHasRun] = useState(false)
    const [markedDates, setMarkedDates] = useState([])
    const [data, setData] = useState('')

    const week = ['일', '월', '화', '수', '목', '금', '토'];

    LocaleConfig.locales['ko'] = {
        monthNames: [
            '1월',
            '2월',
            '3월',
            '4월',
            '5월',
            '6월',
            '7월',
            '8월',
            '9월',
            '10월',
            '11월',
            '12월'
        ],
        monthNamesShort: [
            '1월',
            '2월',
            '3월',
            '4월',
            '5월',
            '6월',
            '7월',
            '8월',
            '9월',
            '10월',
            '11월',
            '12월'
        ],
        dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    };
    LocaleConfig.defaultLocale = 'ko'

    const complete = {key: 'cp', marked: true, dotColor: 'green', selected: false}
    const notComplete = {key: 'ncp', marked: true, dotColor: 'red', selected: false}

    const left = <TouchableOpacity
    activeOpacity={0.8}
    onPress={()=>navigation.pop()}
    >
        <Text style={styles.backButtonText}>{'   <'}</Text>
    </TouchableOpacity>

    const onDayHandler = (date) => {
        if(month != date.month){
            setMonth(date.month)
        }
        setMarkedDates(state => ({
            ...state, 
            [date.dateString]:{
                ...markedDates[date.dateString],
                selected: true,
            },
            [currentDate]:{
                ...markedDates[currentDate],
                selected: false,
            }
    }))
        setCurrentDate(date.dateString)
        setDay(week[new Date(date.timestamp).getDay()])
        console.log(data)
    }

    const constructor = async() =>{
        if(constructorHasRun) return

        /* Constructor 본문 */

        setConstructorHasRun(true)
    }
    constructor()

    useEffect(() => {
        axios.get(`${ENV_BACKSERVER}member/calendar/${Mno}/${currentDate.substring(0,4)}/${currentDate.substring(5,7)}`)
        .then(res => {
            let data = {}
            let marked = {}
            res.data.map(item => {
                data[item.date] = {goal: item.goal, correct: item.correct, challenge: item.challenge}
                if(item.goal == item.correct){
                    marked[item.date] = complete
                }else{
                    marked[item.date] = notComplete
                }
            })
            return [data, marked]
        })
        .then((marked) => {
            setData(marked[0])
            setMarkedDates(marked[1])
        })
    }, [month])

    return (
    <View style={{flex:1, backgroundColor: 'white'}}>
        <Navi left={left} title={"복습하기"}></Navi>
        <SafeAreaView style={{flex:1}}>
            <Calendar
            theme={{
                'stylesheet.calendar.header': {
                    dayTextAtIndex0: {
                        color: 'red'
                    },
                    dayTextAtIndex6: {
                        color: 'blue'
                    }
                }
            }}
            style={{
                borderBottomWidth: 1,
                borderBottomColor: '#e0e0e0'
            }}
            monthFormat={'yyyy년 MM월'}
            maxDate={Today}
            markedDates={markedDates}

            onDayPress={date => onDayHandler(date)}
            onMonthChange={date => {
                onDayHandler(date)
            }}
            />
            <View style={{flex:3, padding: '5%'}}>
                <View>
                    <Text style={styles.dateText}>{`${currentDate} ${day&&day+'요일'}`}</Text>
                    {data[currentDate] ? 
                    <View>
                        <Text style={styles.dateText}>문제 개수: {data[currentDate].goal}</Text>
                        <Text style={styles.dateText}>맞은 개수: {data[currentDate].correct}</Text>
                        <Text style={styles.dateText}>문제 제출여부: {data[currentDate].challenge ? '풀었습니다.' : '아직 안풀었습니다.'}</Text>
                    </View>
                    :<View>
                    <Text style={styles.dateText}>이날은 문제를 풀지 않았습니다.</Text>
                </View>
                    }
                    
                </View>
            </View>
            <View style={{flex:1}}>
                {data[currentDate] ? 
                <TouchableOpacity 
                    style={styles.dotestButton} 
                    activeOpacity={0.8}
                    onPress={() => {navigation.navigate('VocaLearn')}}>
                        <Text style={styles.dotestText}>다시 외우기</Text>
                </TouchableOpacity>:
                <View 
                style={[styles.dotestButton, {backgroundColor: '#dcdcdc'}]}>
                    <Text style={styles.dotestText}>다시 외우기</Text>
                </View>
                    }
                    
                </View>
        </SafeAreaView>
    </View>
    )
}

const styles = StyleSheet.create({
    backButtonText:{
        fontFamily: 'BMJUA',
        color: 'white',
        fontSize: RFPercentage(3),
    },

    dateView: {

    },

    dateText: {
        fontFamily: 'BMJUA',
        color: 'black',
        fontSize: RFPercentage(3),
    },

    progressText: {

    },
    dotestButton: {
        top:'10%',
        left: '25%',
        width: '50%',
        height: '80%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFA05A',
        
    },
    dotestText: {
        fontFamily: "BMJUA",
        fontSize: RFPercentage(3),
    },
})