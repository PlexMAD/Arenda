import { StyleSheet } from 'react-native';


export const mainStyle = StyleSheet.create( {
    background: {
        flex: 1,
        resizeMode: 'cover', // Масштабирование изображения
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Прозрачный тёмный фон поверх изображения
    },
    main: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 300,
    },
    title : {
        width: 340,
        fontSize: 24,
        fontFamily: 'Montserrat', 
        color: 'white',
        backgroundColor: 'blue', // Цвет фона кнопки
        padding: 20, // Внутренние отступы
        borderRadius: 100, // Радиус закругления углов
        alignItems: 'center', // Центрирование текста
        justifyContent: 'center', // Центрирование текста по вертикали 
        marginBottom: 50,
        shadowColor: '#000', // Тень (для iOS)
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3, // Тень (для Android)   
        textAlign: 'center',
    },
    main__button: {
        backgroundColor: 'lightseagreen', // Цвет кнопки
        paddingVertical: 12, // Вертикальные отступы
        paddingHorizontal: 24, // Горизонтальные отступы
        borderRadius: 8, // Закругление углов
        alignItems: 'center', // Центрирование текста
        justifyContent: 'center',
        shadowColor: '#000', // Тень (для iOS)
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3, // Тень (для Android)
        marginTop: 16, // Отступ сверху
    },
    main__buttonText: {
        color: 'white', // Цвет текста
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase', // Текст заглавными буквами
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
    },
     // Блок для главного контейнера
     user: {
        flex: 1,
        padding: 16,
    },
    // Заголовки (элемент блока user)
    user__title: {
        fontSize: 24,
        fontFamily: 'Montserrat',
        color: 'white',
        backgroundColor: '#04adff',
        padding: 10,
        marginBottom: 8,    
        marginTop: 20,
        borderWidth: 4,
        borderColor: '#0081d1',
        borderRadius: 10,
        textAlign: 'center',
    },
    // Поля ввода
    user__input: {
        borderColor: 'grey',
        borderWidth: 2,
        borderRadius: 4,
        width: '100%',
        backgroundColor: 'white',
        color: 'black',
        fontSize: 16,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginBottom: 8,
    },
    // Кнопки
    user__button: {
        backgroundColor: 'lightseagreen',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    user__buttonText: {
        color: 'white', // Цвет текста
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase', // Текст заглавными буквами
    },
    // Список клиентов
    user__list: {
        marginTop: 16,
    },
    user__listItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#04adff',
        padding: 8,
        borderBottomWidth: 2,
        borderColor: '#0081d1',
    },
    tableRow: {
        flexDirection: 'row',
        padding: 8,
        borderBottomWidth: 1,
        borderColor: '#0091ea',
        backgroundColor: '#eceff1',
    },
    tableCellHeader: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 14,
        color: 'white',
    },
    tableCell: {
        flex: 1,
        textAlign: 'center',
        fontSize: 10,
        color: 'black',
    },
    tableDeleteButton: {
        backgroundColor: '#E3002C',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tableDeleteButtonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
});