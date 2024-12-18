import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert, TouchableOpacity } from 'react-native';
import { mainStyle } from '../styles/style';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Client {
    id: number;
    surname?: string;
    name?: string;
    grand_name?: string;
    phone?: string;
    email?: string;
}

interface Rieltor {
    id: number;
    surname: string;
    name: string;
    grand_name: string;
    fee_rate?: number;
}

const User = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [rieltors, setRieltors] = useState<Rieltor[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const [newClient, setNewClient] = useState<Client>({});
    const [newRieltor, setNewRieltor] = useState<Rieltor>({ surname: '', name: '', grand_name: '' });
    useEffect(() => {
        const fetchAll = async () => {
            const [clientResponse, rieltorResponse] = await Promise.all(
                [axios.get<Client[]>("http://127.0.0.1:8000/clients/"),
                axios.get<Rieltor[]>("http://127.0.0.1:8000/rieltors/"),]
            )
            setClients(clientResponse.data)
            setRieltors(rieltorResponse.data)
        }
        fetchAll()
    }, [])

    const handleSearch = async () => {
        try {
            const [clientResponse, rieltorResponse] = await Promise.all([
                axios.get<Client[]>(`http://127.0.0.1:8000/clients/search/?q=${searchQuery}`),
                axios.get<Rieltor[]>(`http://127.0.0.1:8000/rieltors/search/?q=${searchQuery}`)
            ]);
            setClients(clientResponse.data);
            setRieltors(rieltorResponse.data);
        } catch (error) {
            Alert.alert('Ошибка поиска');
        }
    };

    const addClient = async () => {
        if (!newClient.phone && !newClient.email) {
            Alert.alert('Ошибка', 'Необходимо указать номер телефона или почту.');
            return;
        }
        await axios.post('http://127.0.0.1:8000/clients/', newClient);
        setNewClient({});
        handleSearch();
    };

    const addRieltor = async () => {
        if (!newRieltor.surname || !newRieltor.name || !newRieltor.grand_name) {
            Alert.alert('Ошибка', 'Фамилия, имя и отчество обязательны.');
            return;
        }
        await axios.post('http://127.0.0.1:8000/rieltors/', newRieltor);
        setNewRieltor({ surname: '', name: '', grand_name: '' });
        handleSearch();
    };

    const deleteClient = async (id: number) => {
        await axios.delete(`http://127.0.0.1:8000/clients/${id}/`);
        handleSearch();
    };

    const deleteRieltor = async (id: number) => {
        await axios.delete(`http://127.0.0.1:8000/rieltors/${id}/`);
        handleSearch();
    };

    return (
        <View style={mainStyle.main}>
            <Text style={mainStyle.title}>Добавить клиента</Text>
            <TextInput placeholder="Фамилия" value={newClient.surname || ''} onChangeText={(text) => setNewClient({ ...newClient, surname: text })} style={mainStyle.input} />
            <TextInput placeholder="Имя" value={newClient.name || ''} onChangeText={(text) => setNewClient({ ...newClient, name: text })} style={mainStyle.input} />
            <TextInput placeholder="Отчество" value={newClient.grand_name || ''} onChangeText={(text) => setNewClient({ ...newClient, grand_name: text })} style={mainStyle.input} />
            <TextInput placeholder="Телефон" value={newClient.phone || ''} onChangeText={(text) => setNewClient({ ...newClient, phone: text })} style={mainStyle.input} />
            <TextInput placeholder="Почта" value={newClient.email || ''} onChangeText={(text) => setNewClient({ ...newClient, email: text })} style={mainStyle.input} />
            <Button title="Добавить клиента" onPress={addClient} />

            <Text style={mainStyle.title}>Добавить риэлтора</Text>
            <TextInput placeholder="Фамилия" value={newRieltor.surname} onChangeText={(text) => setNewRieltor({ ...newRieltor, surname: text })} style={mainStyle.input} />
            <TextInput placeholder="Имя" value={newRieltor.name} onChangeText={(text) => setNewRieltor({ ...newRieltor, name: text })} style={mainStyle.input} />
            <TextInput placeholder="Отчество" value={newRieltor.grand_name} onChangeText={(text) => setNewRieltor({ ...newRieltor, grand_name: text })} style={mainStyle.input} />
            <TextInput placeholder="Доля от комиссии" keyboardType="numeric" value={newRieltor.fee_rate?.toString() || ''} onChangeText={(text) => setNewRieltor({ ...newRieltor, fee_rate: Number(text) })} style={mainStyle.input} />
            <Button title="Добавить риэлтора" onPress={addRieltor} />

            <Text style={mainStyle.title}>Поиск пользователей</Text>
            <TextInput placeholder="Введите ФИО" value={searchQuery} onChangeText={setSearchQuery} style={mainStyle.input} />
            <Button title="Поиск" onPress={handleSearch} />

            <Text style={mainStyle.title}>Результаты поиска клиентов</Text>
            <FlatList
                data={clients}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{`${item.surname || ''} ${item.name || ''} ${item.grand_name || ''} (${item.phone || ''} ${item.email || ''})`}</Text>
                        <TouchableOpacity onPress={() => deleteClient(item.id)}><Text>Удалить</Text></TouchableOpacity>
                    </View>
                )}
            />

            <Text style={mainStyle.title}>Результаты поиска риэлторов</Text>
            <FlatList
                data={rieltors}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{`${item.surname} ${item.name} ${item.grand_name} (Комиссия: ${item.fee_rate || 0}%)`}</Text>
                        <TouchableOpacity onPress={() => deleteRieltor(item.id)}><Text>Удалить</Text></TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

export default User;
