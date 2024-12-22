import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
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
    const [address, setAddress] = useState('127.0.0.1:8000/');
    const [clients, setClients] = useState<Client[]>([]);
    const [rieltors, setRieltors] = useState<Rieltor[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [newClient, setNewClient] = useState<Client>({});
    const [newRieltor, setNewRieltor] = useState<Rieltor>({ surname: '', name: '', grand_name: '' });

    useEffect(() => {
        const fetchAll = async () => {
            const [clientResponse, rieltorResponse] = await Promise.all([
                axios.get<Client[]>(`http://${address}clients/`),
                axios.get<Rieltor[]>(`http://${address}rieltors/`),
            ]);
            setClients(clientResponse.data);
            setRieltors(rieltorResponse.data);
        };
        fetchAll();
    }, [address]);

    const handleSearch = async () => {
        try {
            const [clientResponse, rieltorResponse] = await Promise.all([
                axios.get<Client[]>(`http://${address}/clients/search/?q=${searchQuery}`),
                axios.get<Rieltor[]>(`http://${address}/rieltors/search/?q=${searchQuery}`),
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
        await axios.post(`http://${address}/clients/`, newClient);
        setNewClient({});
        handleSearch();
    };

    const addRieltor = async () => {
        if (!newRieltor.surname || !newRieltor.name || !newRieltor.grand_name) {
            Alert.alert('Ошибка', 'Фамилия, имя и отчество обязательны.');
            return;
        }
        await axios.post(`http://${address}/rieltors/`, newRieltor);
        setNewRieltor({ surname: '', name: '', grand_name: '' });
        handleSearch();
    };

    const deleteClient = async (id: number) => {
        await axios.delete(`http://${address}/clients/${id}/`);
        handleSearch();
    };

    const deleteRieltor = async (id: number) => {
        await axios.delete(`http://${address}/rieltors/${id}/`);
        handleSearch();
    };

    return (
        <ImageBackground
            source={require('../assets/background__user.jpg')}
            style={mainStyle.background}
        >
            <ScrollView style={mainStyle.user}>
                <TouchableOpacity style={mainStyle.user__button} onPress={() => { setAddress(address === '127.0.0.1:8000' ? '10.0.2.2:8000' : '127.0.0.1:8000'); }} >
                    <Text style={mainStyle.user__buttonText}>{address}</Text>
                </TouchableOpacity>
                <Text style={mainStyle.user__title}>Добавить клиента</Text>
                <TextInput placeholder="Фамилия" value={newClient.surname || ''} onChangeText={(text) => setNewClient({ ...newClient, surname: text })} style={mainStyle.user__input} />
                <TextInput placeholder="Имя" value={newClient.name || ''} onChangeText={(text) => setNewClient({ ...newClient, name: text })} style={mainStyle.user__input} />
                <TextInput placeholder="Отчество" value={newClient.grand_name || ''} onChangeText={(text) => setNewClient({ ...newClient, grand_name: text })} style={mainStyle.user__input} />
                <TextInput placeholder="Телефон" value={newClient.phone || ''} onChangeText={(text) => setNewClient({ ...newClient, phone: text })} style={mainStyle.user__input} />
                <TextInput placeholder="Почта" value={newClient.email || ''} onChangeText={(text) => setNewClient({ ...newClient, email: text })} style={mainStyle.user__input} />
                <TouchableOpacity style={mainStyle.user__button} onPress={addClient} >
                    <Text style={mainStyle.user__buttonText}>Добавить клиента</Text>
                </TouchableOpacity>
                <Text style={mainStyle.user__title}>Добавить риэлтора</Text>
                <TextInput placeholder="Фамилия" value={newRieltor.surname} onChangeText={(text) => setNewRieltor({ ...newRieltor, surname: text })} style={mainStyle.user__input} />
                <TextInput placeholder="Имя" value={newRieltor.name} onChangeText={(text) => setNewRieltor({ ...newRieltor, name: text })} style={mainStyle.user__input} />
                <TextInput placeholder="Отчество" value={newRieltor.grand_name} onChangeText={(text) => setNewRieltor({ ...newRieltor, grand_name: text })} style={mainStyle.user__input} />
                <TextInput placeholder="Доля от комиссии" keyboardType="numeric" value={newRieltor.fee_rate?.toString() || ''} onChangeText={(text) => setNewRieltor({ ...newRieltor, fee_rate: Number(text) })} style={mainStyle.user__input} />
                <TouchableOpacity style={mainStyle.user__button} onPress={addRieltor} >
                    <Text style={mainStyle.user__buttonText}>Добавить риэлтора</Text>
                </TouchableOpacity>
                <Text style={mainStyle.user__title}>Поиск пользователей</Text>
                <TextInput placeholder="Введите ФИО" value={searchQuery} onChangeText={setSearchQuery} style={mainStyle.user__input} />
                <TouchableOpacity style={mainStyle.user__button} onPress={handleSearch} >
                    <Text style={mainStyle.user__buttonText}>Поиск</Text>
                </TouchableOpacity>

                <Text style={mainStyle.user__title}>Результаты поиска клиентов</Text>

                {/* Заголовок таблицы */}
                <View style={mainStyle.tableHeader}>
                    <Text style={mainStyle.tableCellHeader}>ФИО</Text>
                    <Text style={mainStyle.tableCellHeader}>Телефон</Text>
                    <Text style={mainStyle.tableCellHeader}>Почта</Text>
                    <Text style={mainStyle.tableCellHeader}>Действия</Text>
                </View>

                {/* Список клиентов */}
                <FlatList
                    data={clients}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={mainStyle.tableRow}>
                            <Text style={mainStyle.tableCell}>{`${item.surname || ''} ${item.name || ''} ${item.grand_name || ''}`}</Text>
                            <Text style={mainStyle.tableCell}>{item.phone || '-'}</Text>
                            <Text style={mainStyle.tableCell}>{item.email || '-'}</Text>
                            <TouchableOpacity
                                style={mainStyle.tableDeleteButton}
                                onPress={() => deleteClient(item.id)}
                            >
                                <Text style={mainStyle.tableDeleteButtonText}>Удалить</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />

                <Text style={mainStyle.user__title}>Результаты поиска риэлторов</Text>

                {/* Заголовок таблицы */}
                <View style={mainStyle.tableHeader}>
                    <Text style={mainStyle.tableCellHeader}>ФИО</Text>
                    <Text style={mainStyle.tableCellHeader}>Комиссия</Text>
                    <Text style={mainStyle.tableCellHeader}>Действия</Text>
                </View>

                {/* Список риэлторов */}
                <FlatList
                    data={rieltors}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={mainStyle.tableRow}>
                            <Text style={mainStyle.tableCell}>{`${item.surname} ${item.name} ${item.grand_name}`}</Text>
                            <Text style={mainStyle.tableCell}>{item.fee_rate || 0}%</Text>
                            <TouchableOpacity
                                style={mainStyle.tableDeleteButton}
                                onPress={() => deleteRieltor(item.id)}
                            >
                                <Text style={mainStyle.tableDeleteButtonText}>Удалить</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </ScrollView>
        </ImageBackground>
    );
};

export default User;
