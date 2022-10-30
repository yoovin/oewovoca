import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {RFPercentage} from "react-native-responsive-fontsize"
import {useRecoilState} from 'recoil'
import {goal, userid} from './atom'
import React, { useEffect } from 'react'

export default function Setting() {
    const [userId, setUserId] = useRecoilState(userid)
    const [currentGoal, setCurrentGoal] = useRecoilState(goal)

    const goalHandler = (num) => {
        setCurrentGoal(state => state + num)
    }

    useEffect(() => {
        console.log("설정 생겼당")
        return () => {
            console.log("설정 없어졌당")
        }
    }, [])

  return (
    <View style={{flex: 1, backgroundColor: '#FFC499', alignItems: 'center'}}>
        <View style={[styles.center, {flex:1}]}>
            <Text style={styles.mainText}>설정</Text>
        </View>
        <View style={styles.hr}></View>
        <View style={[{flex:3, alignItems: 'center'}]}>
            <Text style={styles.subText}>ID</Text>
            <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.itemBox, styles.center]}
            >
                <Text style={styles.itemText}>{userId}</Text>
            </TouchableOpacity>
        </View>

        <Text style={styles.subText}>하루에 외울 단어 수</Text>
            <View style={{flex: 3, flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                    <TouchableOpacity style={{width: '30%', left:'60%', alignItems: 'center'}}>
                        <Text style={styles.mainText} onPress={() => goalHandler(-5)}>{'<'}</Text>
                        <Text style={styles.itemText}>-5</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.vocanumBox, styles.center, {flex: 1}]}>
                    <Text style={styles.itemText}>{currentGoal}개</Text>
                </View>
                <View style={{flex: 1}}>
                    <TouchableOpacity style={{width: '30%', left:'10%', alignItems: 'center'}}>
                        <Text style={styles.mainText} onPress={() => goalHandler(5)}>{'>'}</Text>
                        <Text style={styles.itemText}>+5</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex:1}}>
                    <TouchableOpacity 
                    style={styles.dotestButton} 
                    activeOpacity={0.8}
                    onPress={() => {}}>
                        <Text style={styles.dotestText}>저장하기</Text>
                    </TouchableOpacity>
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
        fontSize: RFPercentage(3),
    },
})