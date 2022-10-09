import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import {RFPercentage} from "react-native-responsive-fontsize"
import React from 'react'

export default function Navi({navigation, title, right}) {
    return (
        <View style={styles.navi}>
            <View style={styles.viewContainer}></View>
            <View style={styles.contentContainer}>
                <TouchableOpacity 
                style={styles.backButton}
                activeOpacity={0.8}
                onPress={()=>navigation.pop()}
                >
                    <Text style={styles.titleText}>{'   <'}</Text>
                </TouchableOpacity>

                <View style={styles.titleView}>
                    <Text style={styles.titleText}>{title}</Text>
                </View>

                <View style={styles.rightView}>
                    {right}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        flex:1.5
    },
    contentContainer: {
        flex: 1,
        flexDirection:'row'
    },
    backButton:{
        flex:1
    },
    titleView: {
        flex: 6,
        alignItems:'center',
    },
    titleText: {
        fontFamily: 'BMJUA',
        fontSize: RFPercentage(3),
        color: 'white',
    },
    rightView: {
        flex: 1
    },
    navi: {
        width: '100%',
        height: '10%',
        backgroundColor: '#FF7800'
    },
    backButtonText:{
        fontFamily: 'BMJUA',
        color: 'white',
        fontSize: RFPercentage(3),
    }
})