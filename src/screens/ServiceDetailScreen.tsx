import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, Button, ImageBackground, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackParamList';
import axios from 'axios';
import { createService, deleteService } from './apiService';

type ServiceDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ServiceDetail'>;
type ServiceDetailScreenRouteProp = RouteProp<RootStackParamList, 'ServiceDetail'>;

type Props = {
    navigation: ServiceDetailScreenNavigationProp;
    route: ServiceDetailScreenRouteProp;
};

interface Service {
    id: string;
    serviceName: string;
    description: string;
    price: number;
}

const ServiceDetailScreen: React.FC<Props> = ({ navigation, route }) => {
    const { id } = route.params;
    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchServiceDetail = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get<Service>(`http://localhost:8000/api/spa/getbyid/${id}`);
            setService(response.data);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch service details.');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchServiceDetail();
    }, [fetchServiceDetail]);

    const handleDelete = async () => {
        Alert.alert(
            'Xác nhận xóa',
            'Bạn có chắc chắn muốn xóa dịch vụ này?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            await deleteService(id);
                            Alert.alert('Success', 'Service deleted successfully.');
                            navigation.goBack();
                        } catch (error) {
                            Alert.alert('Error', 'Failed to delete service.');
                        }
                    },
                    style: 'destructive',
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <ImageBackground source={require('../public/bg3.png')} style={styles.background}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Chi tiết dịch vụ</Text>
                    {loading ? (
                        <ActivityIndicator size="large" color="#007BFF" />
                    ) : !service ? (
                        <Text>No service found.</Text>
                    ) : (
                        <>
                            <Text style={styles.label}>Service Name</Text>
                            <Text style={styles.value1}>{service.serviceName}</Text>
                            <Text style={styles.label}>Description</Text>
                            <Text style={styles.value}>{service.description}</Text>
                            <Text style={styles.label}>Price</Text>
                            <Text style={styles.value2}>${service.price}</Text>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.editButton}
                                    onPress={() => navigation.navigate('ServiceForm', { service, isEdit: true, refresh: fetchServiceDetail })}
                                >
                                    <Text style={styles.buttonText}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.deleteButton}
                                    onPress={handleDelete}
                                >
                                    <Text style={styles.buttonText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },

    container: {
        // flex: 1,
        padding: 16,
        backgroundColor: 'rgba(255, 255, 255, .8)', // Nền trắng với độ mờ 50%
        margin: 16,
        borderRadius: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        color: '#4A4A4A', // Màu chữ nhẹ nhàng
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#4A4A4A', // Màu chữ nhẹ nhàng
    },
    value1: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#fff', // Màu chữ nhẹ nhàng
        backgroundColor: 'red',
        padding: 10,

        borderRadius: 5, // Thêm border radius cho nền
        textAlign: 'center',
        alignSelf: 'flex-start', // Đảm bảo nền vừa với nội dung
    },
    value: {
        fontSize: 16,
        marginBottom: 16,
        color: '#333333', // Màu chữ đậm hơn
    },

    value2: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#fff', // Màu chữ nhẹ nhàng
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5, // Thêm border radius cho nền
        textAlign: 'center',
        alignSelf: 'flex-start', // Đảm bảo nền vừa với nội dung
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    editButton: {
        backgroundColor: '#FF69B4', // Màu hồng nhẹ nhàng
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        marginRight: 8,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default ServiceDetailScreen;