import { View, Text, SafeAreaView, StyleSheet, Button, TouchableOpacity} from 'react-native'
import React from 'react'

export default function Login({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoView}>
                <Text>
                    Voca-app
                </Text>
            </View>
            <View style={styles.loginView}>
                <View style={styles.loginButtonContainer}>
                    <TouchableOpacity style={styles.loginButton}>
                        <Text>
                            구글로 로그인
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.loginButton}>
                        <Text>
                            카카오로 로그인
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.loginButton}>
                        <Text>
                            애플로 로그인
                        </Text>
                    </TouchableOpacity>
                    <Button
                    title="로그인하지 않고 시작"
                    onPress={() => navigation.reset({routes:[{name: 'Main'}]})}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    logoView: {
        flex: 1,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    loginView: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'center',
        // flexDirection: "column"
    },
    loginButtonContainer: {
        height: 200,
        // borderWidth: 3,
        // borderRadius: 5,
        justifyContent:'space-between',
        flexDirection: 'column'
    },
    loginButton: {
        flex: 1,
        marginBottom: 5,
        borderWidth: 3,
        borderRadius: 5,
        borderColor: 'black',
    },
    loginText: {
        flex: 1
    }
})