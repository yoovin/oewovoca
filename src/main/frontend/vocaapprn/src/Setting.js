import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {RFPercentage} from "react-native-responsive-fontsize"
import {useRecoilState, useRecoilValue} from 'recoil'
import {goal, userid, mno} from './atom'
import React, { useEffect, useState } from 'react'
import Navi from './Navi'
import Toast from 'react-native-toast-message'
import axios from 'axios'
import {ENV_BACKSERVER} from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Setting({navigation}) {
    const [userId, setUserId] = useRecoilState(userid)
    const [currentGoal, setCurrentGoal] = useRecoilState(goal)
    const Mno = useRecoilValue(mno)
    const [isChanged, setIsChanged] = useState(false)
    const [changeGoal, setChangeGoal] = useState(currentGoal)

    const left = <TouchableOpacity
    activeOpacity={0.8}
    onPress={()=>navigation.pop()}
    >
        <Text style={styles.backButtonText}>{'   <'}</Text>
    </TouchableOpacity>

    const goalHandler = (num) => {
        if(changeGoal + num < 10 || changeGoal + num > 50) return
        setIsChanged(true)
        setChangeGoal(state => state + num)
    }

    const submitHandler = () => {
        axios.put(`${ENV_BACKSERVER}member/${Mno}`, {
            mno: Mno,
            nick: "Default",
            goal: changeGoal
        })
        .then(res =>{
            if(res.data == 1){
                setCurrentGoal(state => changeGoal)
                setIsChanged(false)
                Toast.show({
                    type: 'success',
                    text1: '저장되었습니다'
                })
            }else{
                Toast.show({
                    type: 'error',
                    text1: '에러가 발생했습니다'
                })
            }
        })
        .catch(e => {
            Toast.show({
                type: 'error',
                text1: '에러가 발생했습니다'
            })
            setCurrentGoal(originalValue)
            console.error(e)
        })
    }

    return (
        <View style={{flex: 1, backgroundColor: '#FFC499', alignItems: 'center'}}>
            <Navi left={left} title="설정"></Navi>
            {/* <View style={[styles.center, {flex:1}]}>
                <Text style={styles.mainText}>설정</Text>
            </View> */}
            {/* <View style={styles.hr}></View> */}
            <View style={[{flex:3, alignItems: 'center'}]}>
                <Text style={styles.subText}>ID</Text>
                <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.itemBox, styles.center]}
                onPress={()=> AsyncStorage.clear()}
                >
                    <Text style={styles.itemText}>{userId}</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.subText}>하루에 외울 단어 수</Text>
            <View style={{flex: 4, flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                    <TouchableOpacity style={{width: '30%', left:'60%', alignItems: 'center'}} onPress={() => goalHandler(-5)}>
                        <Text style={styles.mainText}>{'<'}</Text>
                        <Text style={styles.itemText}>-5</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.vocanumBox, styles.center, {flex: 1}]}>
                    <Text style={styles.itemText}>{changeGoal}개</Text>
                </View>
                <View style={{flex: 1}}>
                    <TouchableOpacity style={{width: '30%', left:'10%', alignItems: 'center'}} onPress={() => goalHandler(5)}>
                        <Text style={styles.mainText}>{'>'}</Text>
                        <Text style={styles.itemText}>+5</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex:1}}>
                {isChanged ?
                <TouchableOpacity 
                    style={styles.dotestButton} 
                    activeOpacity={0.8}
                    onPress={submitHandler}>
                        <Text style={styles.dotestText}>저장하기</Text>
                    </TouchableOpacity>
                    :<View style={[styles.dotestButton, {backgroundColor:'#dcdcdc'}]}>
                        <Text style={[styles.dotestText, {color:'#aaaaaa'}]}>저장하기</Text>
                    </View>
                    }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainText: {
        fontSize: RFPercentage(5),
        color: 'white',
        fontFamily: 'BMJUA',
    },

    subText:{
        fontSize: RFPercentage(3),
        color: 'white',
        fontFamily: 'BMJUA',
        marginVertical: 30,
    },

    itemText: {
        fontSize: RFPercentage(3),
        fontFamily: 'BMJUA',
    },

    itemBox: {
        backgroundColor: '#fefefe',
        width: '70%',
        height: '30%',
        padding: 10,
        borderRadius: 15,
    },

    vocanumBox: {
        backgroundColor: '#fefefe',
        width: '40%',
        height: '15%',
        borderRadius: 15,
    },

    center: {
        alignItems: 'center',
        justifyContent:'center'
    },

    hr: {
        marginTop: 10,
        marginBottom: 10,
        borderBottomColor: 'white',
        borderBottomWidth: 5,
        width: '70%',
        borderRadius: 10,
    },

    dotestButton: {
        top: '-50%',
        width: '100%',
        height: '80%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFA05A',
        
    },
    dotestText: {
        fontFamily: "BMJUA",
        fontSize: RFPercentage(5),
    },

    backButtonText:{
        fontFamily: 'BMJUA',
        color: 'white',
        fontSize: RFPercentage(3),
    },
})