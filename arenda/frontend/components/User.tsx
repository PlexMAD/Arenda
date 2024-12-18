import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { mainStyle } from '../styles/style'; /*<----  стили  */
import React, { useEffect, useState } from 'react';
import axios from "axios";

interface Client {
    id: number,
    name: string,
    surname: string,
    grand_name: string,
    email: string,
    phone: string
}
interface Rieltor {
    id: number,
    name: string,
    surname: string,
    grand_name: string,
    fee_rate: number
}




const User = () => {
    const [clients, setClients] = useState<Client[]>([])
    const [rieltors, setRieltors] = useState<Rieltor[]>([])
    useEffect(() => {
        const fetchAll = async () => {
            const [clientResponse, rieltorResponse] = await Promise.all(
                [axios.get<Client[]>("http://10.0.2.2:8000/clients/"),
                axios.get<Rieltor[]>("http://10.0.2.2:8000/rieltors/"),]
            )
            setClients(clientResponse.data)
            setRieltors(rieltorResponse.data)
        }
        fetchAll()
    }, [])
    return (
        <View style={mainStyle.main}>
            <Text style={mainStyle.title}>
                Создание пользователя
            </Text>

            {clients.length > 0 && <Text>{clients[0].name}</Text>}
            <TextInput style={mainStyle.input} />
            <Button onPress={() => { }} title='Поиск' />
        </View>
    );
}

export default User;

