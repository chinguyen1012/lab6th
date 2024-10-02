import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackParamList';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
    navigation: HomeScreenNavigationProp;
};

interface Service {
    id: string;
    serviceName: string;
    description: string;
    price: number;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchServices = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get<Service[]>('http://localhost:8000/api/spa/getall');
            setServices(response.data);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch services.');
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchServices();
        }, [fetchServices])
    );

    const addService = () => {
        navigation.navigate('ServiceForm', { isEdit: false, refresh: fetchServices });
    };

    const viewServiceDetail = (id: string) => {
        navigation.navigate('ServiceDetail', { id });
    };

    const renderItem = ({ item }: { item: Service }) => (
        <View style={styles.serviceContainer}>
            <View style={styles.serviceHeader}>
                <Text style={styles.serviceText}>{item.serviceName}</Text>
                <View style={styles.priceAndButtonContainer}>
                    <Text style={styles.priceText}>${item.price}</Text>
                    <TouchableOpacity style={styles.button} onPress={() => viewServiceDetail(item.id)}>
                        <Text style={styles.buttonText}>View</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* <Text style={styles.serviceDescription}>{item.description}</Text> */}
        </View>
    );

    return (
        <ImageBackground source={require('../public/bg3.png')} style={styles.background}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Dịch vụ</Text>
                    <TouchableOpacity style={styles.addButton} onPress={addService}>
                        <Text style={styles.addButtonText}>Thêm Dịch Vụ</Text>
                    </TouchableOpacity>
                    {loading ? (
                        <ActivityIndicator size="large" color="#007BFF" />
                    ) : (
                        <FlatList
                            data={services}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                        />
                    )}
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({

    background: {
        flex: 1,

    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.3)', // Nền trắng với độ mờ 50%
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        padding: 20,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        color: '#4A4A4A', // Màu chữ nhẹ nhàng
    },
    serviceContainer: {
        padding: 16,
        backgroundColor: '#FFFFFF',
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#E0E0E0', // Viền nhẹ nhàng
    },
    serviceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceAndButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    priceText: {
        fontSize: 16,
        color: '#333333', // Màu chữ đậm hơn
        marginRight: 10, // Khoảng cách giữa giá và nút
    },
    serviceText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333', // Màu chữ đậm hơn
    },
    serviceDescription: {
        fontSize: 14,
        color: '#666666', // Màu chữ nhẹ nhàng
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#FF69B4', // Màu hồng nhẹ nhàng
        padding: 5, // Giảm padding để nút nhỏ hơn
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 12, // Giảm kích thước chữ để nút nhỏ hơn
    },
    addButton: {
        backgroundColor: '#FF69B4', // Màu hồng nhẹ nhàng
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 16, // Khoảng cách dưới nút
    },
    addButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default HomeScreen;