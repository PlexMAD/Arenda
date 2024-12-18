import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { mainStyle } from '../styles/style'; /*<----  стили  */
import React, { useState } from 'react';


const User = () => {
    return (
        <View style={mainStyle.main}>
            <Text style={mainStyle.title}>
                Создание пользователя
            </Text>
            <TextInput style={mainStyle.input} />
            <Button onPress={() => { }} title='Поиск' />
        </View>
    );
}

export default User;

