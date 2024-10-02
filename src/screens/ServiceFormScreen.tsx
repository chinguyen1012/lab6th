import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackParamList';
import axios from 'axios';
import { createService } from './apiService';

type ServiceFormScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ServiceForm'>;
type ServiceFormScreenRouteProp = RouteProp<RootStackParamList, 'ServiceForm'>;

type Props = {
    navigation: ServiceFormScreenNavigationProp;
    route: ServiceFormScreenRouteProp;
};

const ServiceFormScreen: React.FC<Props> = ({ navigation, route }) => {
    const { service, isEdit, refresh } = route.params;
    const [serviceName, setServiceName] = useState(service?.serviceName || '');
    const [description, setDescription] = useState(service?.description || '');
    const [price, setPrice] = useState(service?.price.toString() || '');

    const handleSave = async () => {
        const serviceData = {
            serviceName,
            description,
            price: parseFloat(price),
        };

        try {
            if (isEdit && service) {
                await axios.put(`http://localhost:8000/api/spa/update/${service.id}`, serviceData);
                Alert.alert('Success', 'Service updated successfully.');
            } else {
                await createService(serviceData);
                Alert.alert('Success', 'Service created successfully.');
            }
            refresh();
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to save service.');
        }
    };

    return (
        <ImageBackground source={require('../public/bg6.jpg')} style={styles.background}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>{isEdit ? 'Chỉnh sửa dịch vụ' : 'Thêm dịch vụ'}</Text>
                    <Text style={styles.label}>Service Name</Text>
                    <TextInput
                        style={styles.input}
                        value={serviceName}
                        onChangeText={setServiceName}
                    />
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={setDescription}
                    />
                    <Text style={styles.label}>Price</Text>
                    <TextInput
                        style={styles.input}
                        value={price}
                        onChangeText={setPrice}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
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
        justifyContent: 'center', // Đưa container vào giữa theo chiều dọc
        alignItems: 'center', // Đưa container vào giữa theo chiều ngang
    },
    container: {
        width: '90%', // Đảm bảo container không chiếm toàn bộ chiều rộng màn hình
        padding: 16,
        backgroundColor: '#F5F5F5', // Màu nền nhẹ nhàng
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
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 16,
        borderRadius: 4,
        backgroundColor: '#FFFFFF',
    },
    saveButton: {
        backgroundColor: '#FF69B4', // Màu hồng nhẹ nhàng
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default ServiceFormScreen;