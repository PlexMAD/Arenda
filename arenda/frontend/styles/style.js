import { StyleSheet } from 'react-native';

export const mainStyle = StyleSheet.create( {
    main: {
        flex: 1,
        flexDirection: 'column',
    },
    title : {
        fontSize: 24,
        fontFamily: 'Montserrat', 
        color: 'lightseagreen' 
    },
    input : {
        borderColor: 'black',
        borderWidth: 1,
        width: 200,
        backgroundColor: 'silver',
        color: 'red',
        fontSize: 20,
    },
    button : {
        flex: 1,
    }
})