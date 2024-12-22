import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import axios from 'axios';

interface RealEstate {
    id: number;
    city?: string | null;
    street?: string | null;
    house?: string | null;
    flat?: string | null;
    coordinate_x: number;
    coordinate_y: number;
    floors_quantity?: number | null;
    rooms_quantity?: number | null;
    square?: number | null;
    floor?: number | null;
}

const Objects: React.FC = () => {
    const [realEstateList, setRealEstateList] = useState<RealEstate[]>([]);
    const [newRealEstate, setNewRealEstate] = useState<Omit<RealEstate, 'id'>>({
        city: null,
        street: null,
        house: null,
        flat: null,
        coordinate_x: 0,
        coordinate_y: 0,
        floors_quantity: null,
        rooms_quantity: null,
        square: null,
        floor: null,
    });
    const [filters, setFilters] = useState<{ address: string }>({
        address: '',
    });

    useEffect(() => {
        fetchRealEstateList();
    }, []);

    const fetchRealEstateList = async (): Promise<void> => {
        try {
            const response = await axios.get('http://10.0.2.2:8000/rental/');
            setRealEstateList(response.data);
        } catch (error) {
            console.error('Error fetching real estate list:', error);
        }
    };

    const addRealEstate = async (): Promise<void> => {
        try {
            const response = await axios.post('http://10.0.2.2:8000/rental/', newRealEstate);
            if (response.status === 200 || response.status === 201) {
                fetchRealEstateList();
                setNewRealEstate({
                    city: null,
                    street: null,
                    house: null,
                    flat: null,
                    coordinate_x: 0,
                    coordinate_y: 0,
                    floors_quantity: null,
                    rooms_quantity: null,
                    square: null,
                    floor: null,
                });
            }
        } catch (error) {
            console.error('Error adding real estate:', error);
        }
    };

    const deleteRealEstate = async (id: number): Promise<void> => {
        try {
            await axios.delete(`http://10.0.2.2:8000/rental/${id}/`);
            fetchRealEstateList();
        } catch (error) {
            console.error('Error deleting real estate:', error);
        }
    };

    const applyFilters = (): void => {
        const filteredList = realEstateList.filter((item) =>
            `${item.city} ${item.street} ${item.house} ${item.flat}`.includes(
                filters.address,
            ),
        );
        setRealEstateList(filteredList);
    };

    return (
        <View>
            <Text>Добавить объект недвижимости</Text>
            <TextInput
                placeholder="Введите город"
                value={newRealEstate.city || ''}
                onChangeText={(text) =>
                    setNewRealEstate({ ...newRealEstate, city: text })
                }
            />
            <TextInput
                placeholder="Введите улицу"
                value={newRealEstate.street || ''}
                onChangeText={(text) =>
                    setNewRealEstate({ ...newRealEstate, street: text })
                }
            />
            <TextInput
                placeholder="Введите номер дома"
                value={newRealEstate.house || ''}
                onChangeText={(text) =>
                    setNewRealEstate({ ...newRealEstate, house: text })
                }
            />
            <TextInput
                placeholder="Введите номер квартиры"
                value={newRealEstate.flat || ''}
                onChangeText={(text) =>
                    setNewRealEstate({ ...newRealEstate, flat: text })
                }
            />
            <TextInput
                placeholder="Введите широту"
                value={newRealEstate.coordinate_x.toString()}
                onChangeText={(text) =>
                    setNewRealEstate({
                        ...newRealEstate,
                        coordinate_x: parseFloat(text) || 0,
                    })
                }
                keyboardType="numeric"
            />
            <TextInput
                placeholder="Введите долготу"
                value={newRealEstate.coordinate_y.toString()}
                onChangeText={(text) =>
                    setNewRealEstate({
                        ...newRealEstate,
                        coordinate_y: parseFloat(text) || 0,
                    })
                }
                keyboardType="numeric"
            />
            <TextInput
                placeholder="Введите количество этажей"
                value={newRealEstate.floors_quantity?.toString() || ''}
                onChangeText={(text) =>
                    setNewRealEstate({
                        ...newRealEstate,
                        floors_quantity: parseInt(text) || null,
                    })
                }
                keyboardType="numeric"
            />
            <TextInput
                placeholder="Введите количество комнат"
                value={newRealEstate.rooms_quantity?.toString() || ''}
                onChangeText={(text) =>
                    setNewRealEstate({
                        ...newRealEstate,
                        rooms_quantity: parseInt(text) || null,
                    })
                }
                keyboardType="numeric"
            />
            <TextInput
                placeholder="Введите площадь (кв. м)"
                value={newRealEstate.square?.toString() || ''}
                onChangeText={(text) =>
                    setNewRealEstate({
                        ...newRealEstate,
                        square: parseFloat(text) || null,
                    })
                }
                keyboardType="numeric"
            />
            <TextInput
                placeholder="Введите этаж"
                value={newRealEstate.floor?.toString() || ''}
                onChangeText={(text) =>
                    setNewRealEstate({
                        ...newRealEstate,
                        floor: parseInt(text) || null,
                    })
                }
                keyboardType="numeric"
            />
            <Button title="Добавить" onPress={addRealEstate} />

            <Text>Фильтры</Text>
            <TextInput
                placeholder="Введите адрес для фильтрации"
                value={filters.address}
                onChangeText={(text) => setFilters({ ...filters, address: text })}
            />
            <Button title="Применить фильтры" onPress={applyFilters} />

            <FlatList
                data={realEstateList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>
                            {item.city}, {item.street}, {item.house}, {item.flat}
                        </Text>
                        <Text>
                            Координаты: {item.coordinate_x}, {item.coordinate_y}
                        </Text>
                        {item.floors_quantity !== undefined && item.floors_quantity !== null && (
                            <Text>Этажей: {item.floors_quantity}</Text>
                        )}
                        {item.rooms_quantity !== undefined && item.rooms_quantity !== null && (
                            <Text>Комнат: {item.rooms_quantity}</Text>
                        )}
                        {item.square !== undefined && item.square !== null && <Text>Площадь: {item.square}</Text>}
                        {item.floor !== undefined && item.floor !== null && <Text>Этаж: {item.floor}</Text>}
                        <TouchableOpacity onPress={() => deleteRealEstate(item.id)}>
                            <Text>Удалить</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

export default Objects;