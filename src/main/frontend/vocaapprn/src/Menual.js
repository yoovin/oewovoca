import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import {RFPercentage} from "react-native-responsive-fontsize"
import React from 'react'

export default function Menual() {
  return (
    <View style={{flex: 1, backgroundColor:'#ffcfa6'}}>
        <View style={{alignItems: 'center'}}>
            <Text style={styles.mainText}>사용방법</Text>
        </View>
        <View style={styles.hr}></View>
        <ScrollView 
        contentContainerStyle={{alignItems: 'center'}}>

            <Image source={require("../assets/image/1.png")} style={[styles.imageSize, {resizeMode: 'contain'}]}/>
            <Text style={styles.subText}>메인화면은 총 3가지(복습하기, 오늘의단어, 설정)으로 이루어져있습니다.</Text>

            <Image source={require("../assets/image/2.png")} style={[styles.imageSize, {resizeMode: 'contain'}]}/>
            <Text style={styles.subText}>오늘의 단어는 하루마다 외울 단어 수 만큼 매일 랜덤한 단어를 설정해줍니다.</Text>

            <Image source={require("../assets/image/3.png")} style={[styles.imageSize, {resizeMode: 'contain'}]}/>
            <Text style={styles.subText}>오른쪽 위 아이콘을 눌러 단어와 뜻을 가려가며 외울 수 있습니다.</Text>
            
            <Image source={require("../assets/image/6.png")} style={[styles.imageSize, {resizeMode: 'contain'}]}/>
            <Text style={styles.subText}>뜻을 쓰면 입력창 아래에 미리보기 단어들이 떠오릅니다.</Text>

            <Image source={require("../assets/image/7.png")} style={[styles.imageSize, {resizeMode: 'contain'}]}/>
            <Text style={styles.subText}>미리보기로 떠오른 단어를 선택해줍니다.</Text>

            <Image source={require("../assets/image/8.png")} style={[styles.imageSize, {resizeMode: 'contain'}]}/>
            <Text style={styles.subText}>모든 문제를 풀었다면 제출하기 버튼을 눌러 정답을 제출합니다.</Text>

            <Image source={require("../assets/image/9.png")} style={[styles.imageSize, {resizeMode: 'contain'}]}/>
            <Text style={styles.subText}>문제를 푼 단어의 개수와 맞은개수, 내가 쓴 답을 확인할 수 있습니다.</Text>

            <Image source={require("../assets/image/10.png")} style={[styles.imageSize, {resizeMode: 'contain'}]}/>
            <Image source={require("../assets/image/11.png")} style={[styles.imageSize, {resizeMode: 'contain'}]}/>
            <Text style={styles.subText}>메인창에서 복습하기를 눌러 이전에 풀었던 문제를 다시 풀 수 있습니다.</Text>

            <Image source={require("../assets/image/12.png")} style={[styles.imageSize, {resizeMode: 'contain'}]}/>
            <Image source={require("../assets/image/13.png")} style={[styles.imageSize, {resizeMode: 'contain'}]}/>
            <Text style={styles.subText}>설정에서 매일마다 외울 단어의 수를 지정해줄 수 있습니다 (최소 10개, 최대 50개)</Text>

        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    mainText: {
        fontSize: RFPercentage(4.5),
        color: 'black',
        fontFamily: 'BMJUA',
        marginVertical: 5,
    },

    subText: {
        fontSize: RFPercentage(3),
        color: 'black',
        fontFamily: 'BMJUA',
        margin: '5%'
    },

    imageSize: {
        width: 500,
        height: 500,
    },

    hr: {
        marginTop: 10,
        marginBottom: 10,
        borderBottomColor: 'white',
        borderBottomWidth: 5,
        width: '70%',
        left: '15%',
        borderRadius: 10,
    },
})