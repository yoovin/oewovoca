import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import {RFPercentage} from "react-native-responsive-fontsize"
import React from 'react'

export default function Navi({left, title, right, titleOnPress}) {
    return (
        <View style={styles.navi}>
            <View style={styles.viewContainer}></View>
            <View style={styles.contentContainer}>
                <View style={styles.leftView}>
                    {left}
                </View>
                {titleOnPress ? 
                <TouchableOpacity
                activeOpacity={0.8}
                onPress={titleOnPress}
                 style={styles.titleView}>
                    <Text style={styles.titleText}>{title}</Text>
                </TouchableOpacity>
                :<View style={styles.titleView}>
                    <Text style={styles.titleText}>{title}</Text>
                </View>}
                

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
    leftView:{
        flex:1
    },
    titleView: {
        flex: 4.5,
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
})