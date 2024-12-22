import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { mainStyle } from '../styles/style'; /* Стили */
import React from 'react';

const Main: React.FC<any> = ({ navigation }) => {
    const loadScene = (scene: string) => {
        navigation.navigate(scene);
    };

    return (
        <ImageBackground
            source={require('../assets/background.jpg')}
            style={mainStyle.background}
        >
            <View style={mainStyle.main}>
                <Text style={mainStyle.title}>Приложение ESOFT</Text>
                <TouchableOpacity
                    style={mainStyle.main__button}
                    onPress={() => loadScene('User')}
                >
                    <Text style={mainStyle.main__buttonText}>Создать пользователя</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={mainStyle.main__button}
                    onPress={() => loadScene('Objects')}
                >
                    <Text style={mainStyle.main__buttonText}>Создать объект недвижимости</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default Main;
