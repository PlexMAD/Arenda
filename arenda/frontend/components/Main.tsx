import { StyleSheet, Text, View, Button, } from 'react-native';
import { mainStyle } from '../styles/style'; /*<----  стили  */
import React, { useState } from 'react';
import AppLoading from 'expo-app-loading'


const Main: React.FC<any> = ({ navigation }) => {
    const loadScene = (scene: string) => {
        navigation.navigate(scene)
    }
    return (
        <View style={mainStyle.main}>
            <Text style={mainStyle.title}>
                Приложение ESOFT
            </Text>
            <Button title='Создание пользователя' onPress={() => loadScene('User')} />
        </View>
    );
}

export default Main;

