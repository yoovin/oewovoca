import React, {useEffect, useState}from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Button, ScrollView, Modal, Dimensions, TouchableHighlight} from 'react-native'
import axios from 'axios'
import {RFPercentage} from "react-native-responsive-fontsize"
import Icon from 'react-native-vector-icons/Ionicons'
import Navi from './Navi'
import { useRecoilValue } from 'recoil'
import { voca, date, vocaresult, hno } from './atom'
import {ENV_BACKSERVER} from '@env'

/*

*/


export default function VocaResult({navigation}) {
    const currentVoca = useRecoilValue(voca) // 불러오는 단어 데이터
    const vocaResult = useRecoilValue(vocaresult)
    const selectDate = useRecoilValue(date)
    const Hno = useRecoilValue(hno)
    const [currectCount, setCorrectCount] = useState(0)

    const sendGrade = (callback) => {
        let cList = [], wList = []
        vocaResult.map(item => {
            if(item.isCorrect){
                cList.push(item.vno)
                setCorrectCount(num => num+1)
            }else{
                wList.push(item.vno)
            }
        })
        callback(cList, wList)
    }

    useEffect(() => {
        // 채점된거 보냄
        sendGrade((cList, wList) => {
            console.log(cList, wList)
            axios.put(`${ENV_BACKSERVER}voca/today/${Hno}`,{
                "hno": Hno,
                correctList: cList,
                wrongList: wList
            })   
        })
    }, [])
    
    const hr = <View style={styles.hr}/> // hr라인


    return (
        <View style={styles.container}>
            <Navi title={selectDate} ></Navi>
            <SafeAreaView style={{flex: 1}}>
                <View style={{flex: 8}}>
                    <View style={[styles.wordView, {left: '15%'}]}>
                        <Text style={[styles.meanText, {color: 'black'}]}>맞은개수 {currectCount}/{vocaResult.length}</Text>
                        <Text style={[styles.meanText, {color: 'black'}]}>내가 쓴 답</Text>
                    </View>
                <ScrollView style={styles.vocaView}>
                        {currentVoca? currentVoca.map((item, idx) => {
                            let result
                            vocaResult.map(resultItem => {
                                if(resultItem.vno == item.vno) result = resultItem
                            })
                            console.log(result)
                            return(
                                item.meanList.map((meanItem, meanIdx) => (
                                    <View>
                                        <View key={item.id} style={styles.wordView}>
                                            {meanIdx == 0 && (result.isCorrect
                                                ? <Icon name="ios-checkmark-circle-outline" size={RFPercentage(4)} color='lime' style={styles.gradeIcon}></Icon>
                                                : <Icon name="close-circle-outline" size={RFPercentage(4)} color='red' style={styles.gradeIcon}></Icon>)}
                                        
                                            <Text key={meanItem.id} style={styles.wordText}>{meanIdx == 0 && idx + 1 + ". " + item.origin}</Text>
                                            <Text key={item.id+meanItem.id} style={styles.meanText}>{meanItem}</Text>
                                            {meanIdx == 0 ? <Text style={styles.userAnswerText}>{result.userAnswer}</Text>: <Text style={[styles.userAnswerText, {opacity: 0}]}>{result.userAnswer}</Text>}                                            
                                        </View>
                                        {meanIdx == item.meanList.length -1 && <View style={styles.hr}></View>}
                                        {/* 마지막 단어인 경우 hr선을 그어 구분함 */}
                                    </View>
                                )
                            ))
                        }):<Text>''</Text>} 
                        {/* 여기 인디케이터 넣어주기 */}
                    </ScrollView>
                </View>
                
                <View style={{flex:1}}>
                    <TouchableOpacity 
                    style={styles.dotestButton} 
                    activeOpacity={0.8}
                    onPress={() =>  navigation.reset({routes:[{name: 'Main'}]})}>
                        <Text style={styles.dotestText}>메인으로 돌아가기</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    vocaView: {
        flex:1,
        top: 15,
        left: '10%',
        width: '80%',
        height: '80%',
    },
    wordView: {
        flexDirection:'row',
        marginTop: 1,
        marginBottom: 1,
    },
    wordText: {
        flex:1,
        alignSelf:'flex-start',
        fontSize: RFPercentage(2.2),
        fontFamily: 'BMJUA'
    },
    meanText: {
        flex:1,
        alignSelf:'flex-end',
        alignItems:'flex-end',
        fontSize: RFPercentage(2.5),
        color: 'red',
        fontFamily: 'BMJUA',
    },
    userAnswerText: {
        alignSelf:'flex-start',
        fontSize: RFPercentage(2.2),
        fontFamily: 'BMJUA'
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
    backButtonText:{
        fontFamily: 'BMJUA',
        color: 'white',
        fontSize: RFPercentage(3),
    },
    hr: {
        marginTop: 10,
        marginBottom: 10,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },

    gradeIcon: {
        position: 'absolute',
        top: '-50%'
    }
})