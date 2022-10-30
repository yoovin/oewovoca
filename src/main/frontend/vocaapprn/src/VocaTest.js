import { 
    KeyboardAvoidingView, 
    SafeAreaView, 
    StyleSheet, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    TouchableWithoutFeedback, 
    View,
    Keyboard
} from 'react-native'
import {RFPercentage} from "react-native-responsive-fontsize"
import React, { useEffect, useState } from 'react'
import Dialog from "react-native-dialog"
import Navi from './Navi'
import { voca, vocaresult } from './atom' // 단어 아톰
import { useSetRecoilState, useRecoilValue } from 'recoil'
import axios from 'axios'
import {ENV_BACKSERVER} from '@env'

/*
    1. 단어섞기
    2. 유저가 시험봄
    3. 단어 채점
*/


export default function VocaTest({navigation}) {
    const [isTestSubmit, setIsTestSubmit] = useState(false)
    const [problemNum, setProblemNum] = useState(0)
    const [inputText, setInputText] = useState("")
    const [searchMean, setSearchMean] = useState([])
    const [answers, setAnswers] = useState([])
    const vocas = useRecoilValue(voca)
    const setVocaresult = useSetRecoilState(vocaresult)
    const [shuffledvoca, setShuffledvoca] = useState(false)
    const [anpun, setAnpun] = useState(true)
    const [constructorHasRun, setConstructorHasRun] = useState(false)
    const [means, setMeans] = useState([])

    const korSeparater = (char) => {
        const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        if (korean.test(char)) {
            const f = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ',
            'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ',
            'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
            const s = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ',
                'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ',
                'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
            const t = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ',
                'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ',
                'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ',
                'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
        
            const uni = char.charCodeAt(0) - 44032;
            
            const fn = parseInt(uni / 588);
            const sn = parseInt((uni - (fn * 588)) / 28);
            const tn = parseInt(uni % 28);
    
            return f[fn] + s[sn] + t[tn];
        } else {
            return char;
        }
    }
    
    const search = (str) => {
        const searchArr = [];
        const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        const f = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ',
        'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ',
        'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
    
        const lastChar = str.substr(str.length-1, 1);
        const isConsonant = f.includes(lastChar);
    
        let idx = 0;
        if (str.length > 1 && korean.test(lastChar)) {
            const filtered = [];
            const underLast = str.substring(0, str.length - 1);
            const inputSepa = isConsonant ? lastChar : korSeparater(lastChar);
            means.map(item => {
                if(item.includes(underLast)){filtered.push(item)}
            })
            while (searchArr.length < 9 && idx < filtered.length) {
                const meanSepa = underLast + korSeparater(filtered[idx].substr(filtered[idx].indexOf(underLast) + underLast.length, 1));
                if (meanSepa.includes(underLast + inputSepa)) {
                    searchArr.push(filtered[idx]);
                }
                idx++;
            }
        } else if(str.length == 1 && korean.test(lastChar)) {
            const inputSepa = isConsonant ? str : korSeparater(str);
            while (searchArr.length < 9 && idx < means.length) {
                const meanSepa = korSeparater(means[idx].substring(0,1));
                if (!isConsonant && meanSepa.includes(inputSepa)) {
                    searchArr.push(means[idx]);
                } else if(isConsonant && meanSepa.substring(0, 1).includes(inputSepa)) {
                    searchArr.push(means[idx]);
                }
                idx++;
            }
        } else if (str.length == 0) {
            return [];
        } else {
            while (searchArr.length < 9 && idx < means.length) {
                if(means[idx].includes(str)) {
                    searchArr.push(means[idx]);
                }
                idx++;
            }
        }
        return searchArr;
    }

    const constructor = () =>{
        if(constructorHasRun) return

        /* 단어 뜻 가져오기 */
        axios.get(`${ENV_BACKSERVER}voca/means`)
        .then(res => {
            setMeans(res.data)
        })
        


        /* 단어 순서 섞어주기 */
        let shuffled = Array.from(vocas)
        shuffled.sort(() => Math.random() - 0.5)
        setShuffledvoca(shuffled)
        console.log(shuffledvoca)

        setConstructorHasRun(true)
    }
    constructor()

    useEffect(() => {
        const blank = []
        for(let i = 0; i < vocas.length; i++){ // 정답 빈칸으로 만들어둠
            blank.push("")
        }    
        setAnswers(blank)
    }, [])
    
    useEffect(() => {
        inputHandler(answers[problemNum])
        Keyboard.dismiss()
    },[problemNum])

    const submitAnswer = // 네비바 오른위 제출하기버튼을 만들기위함
    <TouchableOpacity> 
        <Text style={styles.submitText} 
        onPress={() => {
            setAnpun(false)
            for(let i = 0; i < answers.length; i++){
                if(answers[i] == ""){
                    setAnpun(true)
                    break
                }
            }
            console.log(answers)
            setIsTestSubmit(true)
            }}>제출하기</Text>
    </TouchableOpacity>

    const inputHandler = (text) => {
        setSearchMean(() => [])
        setInputText(text)
        if(!text == ""){ // 빈칸일때는 단어 미리보기를 띄우지않기위함
            setSearchMean(() => search(text))
        }
    }

    const problemNumHandler = async (num) => {
        if(!(problemNum + num < 0 || problemNum + num > vocas.length -1)){
            setProblemNum(problemNum+num)
        }
    }

    const answerBlockHandler = (text) => {
        let newAnswer = [...answers]
        newAnswer[problemNum] = text
        setAnswers(newAnswer)
        inputHandler(text)
    }

    const handleGrade = () => {
        // 단어 채점
        let cvnoList = []

        shuffledvoca.map((item, idx) => {
            // 채점기능 짜세요
            if(item.meanList.includes(answers[idx])){
                // 정답
                cvnoList.push({vno: item.vno, isCorrect: true, userAnswer: answers[idx]})
            }else{
                cvnoList.push({vno: item.vno, isCorrect: false, userAnswer: answers[idx]})
            }
        })
        console.log(cvnoList)
        setVocaresult(cvnoList)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView style={styles.container} behavior='height'>
                <Navi right={submitAnswer}></Navi>
                <SafeAreaView style={{flex:1}}>
                    <View style={styles.problemContainer}>
                        <View style={styles.numContainer}>
                            <View style={styles.numView}>
                                <Text style={styles.numText}>{problemNum +1}</Text>
                            </View>
                        </View>
                        <View style={styles.wordView}>
                            {/* 단어 들어가는곳 */}
                            <Text style={styles.wordText}>{shuffledvoca&& shuffledvoca[problemNum].origin}</Text>
                            {/* <Text style={styles.wordText}>{sf && sf[problemNum].origin}</Text> */}
                        </View>
                        <View style={{flex: 4}}>
                            {/* input 들어가는곳 */}
                            <TextInput
                            style={[styles.inputMean, {
                                left: inputText && inputText.length > 9 ? `${inputText.length <= 20 ? 37-(inputText.length * 1.2) : 13}%` : '25%',
                                width: inputText && inputText.length > 9 ? `${inputText.length <= 20 ? 25+(inputText.length * 2.5) : 75}%` : '50%',                                
                            }]}
                            onChangeText={(text) => inputHandler(text)}
                            value={inputText}
                            />
                        </View>
                    </View>
                    <View style={styles.answerContainer}>
                        {/* 검색된 단어들 들어가는곳 */}
                        {searchMean.map((item, idx)=> {
                            if(idx < 9){
                                let blockStyle = [styles.answerBlock]
                                let textStyle = [styles.answerText]
                                if(item == answers[problemNum]) blockStyle.push(styles.checked)
                                if(item.length > 6){
                                    textStyle.push({fontSize: RFPercentage(2)})
                                }else if(item.length > 13){
                                    textStyle.push({fontSize: RFPercentage(1)})
                                }
                                return(
                                    <TouchableOpacity
                                    style={blockStyle}
                                    onPress={() => {answerBlockHandler(item)}}
                                    >
                                        <Text style={textStyle}>{item}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        })}


                        
                    </View>
                    <View style={{flex:0.3, flexDirection: 'row'}}>
                        {/* 화살표 들어가는곳 */}
                        <View style={{flex:1}}>
                            <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.arrowButton}
                            onPress={() => problemNumHandler(-1)}
                            ><Text style={styles.arrow}>{"<"}</Text></TouchableOpacity>
                        </View>
                        <View style={{flex:1}}>
                            <TouchableOpacity 
                            activeOpacity={0.8}
                            style={[styles.arrowButton, {left:'57%'}]}
                            onPress={() => problemNumHandler(1)}
                            ><Text style={styles.arrow}>{">"}</Text></TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>

                <Dialog.Container visible={isTestSubmit}>
                    <Dialog.Title>답안을 제출할까요?</Dialog.Title>
                    {anpun && <Dialog.Description>
                        안푼문제 [ {answers.map((item, idx) => (
                            item == "" && (idx == answers.length-1 ? `${idx+1}번`: `${idx+1}번, `)
                        ))} ]
                    </Dialog.Description>}
                    
                    <Dialog.Button label="아니오" onPress={()=>setIsTestSubmit(false)}></Dialog.Button>
                    <Dialog.Button label="예" onPress={() => {
                        handleGrade()
                        navigation.reset({routes:[{name: 'VocaResult'}]})
                        }}></Dialog.Button>
                </Dialog.Container>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    submitText: {
        fontFamily: 'BMJUA',
        color: 'white',
        fontSize: RFPercentage(2),
    },
    problemContainer: {
        flex: 3,
    },
    answerContainer: {
        flex: 1,
        width: '90%',
        left: '2.5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'space-around',
        flexWrap: 'wrap',
    },
    answerBlock: {
        width: '30%',
        height: '30%',
        borderRadius: 10,
        backgroundColor: '#FFA05A',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    answerText:{
        fontSize: RFPercentage(2.5),
        fontFamily: 'BMJUA',
    },
    numView: {
        top: '15%',
        left: '41%',
        width:'18%',
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:20,
        backgroundColor:'lightgray'
    },
    numContainer: {
        flex:1,
    },
    numText: {
        fontSize: RFPercentage(5),
        fontFamily: 'BMJUA',
    },
    wordView:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    wordText: {
        fontSize: RFPercentage(6),
        fontFamily: 'Rubik-Regular',
    },
    inputMean: {
        top: '70%',
        height: '10%',
        borderBottomWidth: 3,
        borderBottomColor: 'gray',
        fontSize: RFPercentage(3) ,
        fontWeight: 'bold',
    },
    arrowButton: {
        left: '10%',
        width:'30%',
        height: '80%',
        backgroundColor: 'lightgray',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrow: {
        fontSize: RFPercentage(3),
        fontFamily: 'BMJUA',
    },
    checked: {
        backgroundColor: '#FF7800'
    }

})