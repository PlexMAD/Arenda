import { StyleSheet, Text, View } from 'react-native';
import { mainStyle } from '../styles/style'; /*<----  стили  */
import React, { useState } from 'react';


const Something = () => {
    return (
        <View style={mainStyle.main}>
            <Text style={mainStyle.title}>
            </Text>
        </View>
    );
}

export default Something;

