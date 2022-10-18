import React, {useState}from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Button, ScrollView, Modal, Dimensions, TouchableHighlight} from 'react-native'
import {RFPercentage} from "react-native-responsive-fontsize"
import { MenuView } from '@react-native-menu/menu'
import Dialog from "react-native-dialog"
import Icon from 'react-native-vector-icons/Ionicons'
import Navi from './Navi'
import { useRecoilValue } from 'recoil'
import { voca, date } from './atom'

export default function VocaToday({navigation}) {
    const [isModalVisible, setIsModalVisible] = useState(false) // 보이기 메뉴
    const [isWordVisible, setIsWordVisible] = useState(true) // 단어 보이기
    const [isMeanVisible, setIsMeanVisible] = useState(true) // 뜻 보이기
    const [isTestVisible, setIsTestVisible] = useState(false) // 시험 시작 dialog
    const todayVoca = useRecoilValue(voca) // main page에서 불러온 오늘의 단어 데이터
    const selectDate = useRecoilValue(date)

    const menu = // 메뉴창
            <MenuView
                title="가리기"
                onPressAction={({ nativeEvent }) => {
                    if(nativeEvent.event == "word"){
                        setIsWordVisible(state => !state)
                    }

                    if(nativeEvent.event == "mean"){
                        setIsMeanVisible(state => !state)
                    }
                }}
                // 각각 누를때마다 Toggle 방식으로 작동함
                actions={[
                    {
                        id:'word',
                        title: isWordVisible? "단어 가리기" : "단어 보이기"
                    },
                    {
                        id:'mean',
                        title: isMeanVisible? "뜻 가리기" : "뜻 보이기"
                    },
                ]}      
                >
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setIsModalVisible(()=>!isModalVisible)}
                    >
                        <Icon name="ios-eye-off-outline" size={30} color='white'></Icon>
                    </TouchableOpacity>
            </MenuView>

    const left = <TouchableOpacity
    activeOpacity={0.8}
    onPress={()=>navigation.pop()}
    >
        <Text style={styles.backButtonText}>{'   <'}</Text>
    </TouchableOpacity>
    
    const hr = <View style={styles.hr}/> // hr라인


    return (
        <View style={styles.container}>
            <Navi left={left} title={selectDate} right={menu} titleOnPress={() => navigation.navigate('HistoryCalendar')}></Navi>
            <SafeAreaView style={{flex: 1}}>
                <View style={{flex: 8}}>
                    <ScrollView style={styles.vocaView}>
                        {todayVoca.map((item, idx) => (
                            item.meanList.map((meanItem, meanIdx) => {
                                return(
                                <View>
                                    <View key={item.id} style={styles.wordView}>
                                        <Text key={meanItem.id} style={[styles.wordText, {opacity: isWordVisible ? 1 : 0}]}>{meanIdx == 0 ? idx + 1 + ". " + item.origin : ""}</Text><Text key={item.id+meanItem.id} style={[styles.meanText,{opacity: isMeanVisible ? 1 : 0}]}>{meanItem}</Text>
                                    </View>
                                    {meanIdx == item.meanList.length -1 ? <View style={styles.hr}></View> :  <View></View>}
                                    {/* 마지막 단어인 경우 hr선을 그어 구분함 */}
                                </View>
                                )
                            })
                        ))}
                    </ScrollView>
                </View>
                
                <View style={{flex:1}}>
                    <TouchableOpacity 
                    style={styles.dotestButton} 
                    activeOpacity={0.8}
                    onPress={() => {setIsTestVisible(true)}}>
                        <Text style={styles.dotestText}>문제 풀기</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <Dialog.Container visible={isTestVisible}>
                <Dialog.Title>
                    문제를 푸시겠습니까?
                </Dialog.Title>
                <Dialog.Button label="아니오" onPress={()=>setIsTestVisible(false)}></Dialog.Button>
                <Dialog.Button label="예" onPress={() => navigation.reset({routes:[{name: 'VocaTest'}]})}></Dialog.Button>
            </Dialog.Container>
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
        fontSize: RFPercentage(2.5),
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
    }
})