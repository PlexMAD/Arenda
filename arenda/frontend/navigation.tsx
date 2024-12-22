import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './components/Main';
import User from './components/User';
import Objects from './components/Objects';

const Stack = createNativeStackNavigator();

function NavigateStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Main} />
                <Stack.Screen name="User" component={User} />
                <Stack.Screen name="Objects" component={Objects} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default NavigateStack;