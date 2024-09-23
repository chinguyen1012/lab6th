import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/StackParamList'; // Import types

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
    navigation: HomeScreenNavigationProp;
};

interface User {
    id: string;
    name: string;
    email: string;
    age: number;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    // Hàm fetch danh sách người dùng
    const fetchUsers = async () => {
        setLoading(true); // Bật trạng thái loading
        try {
            const response = await axios.get<User[]>('http://localhost:8000/api/userrn');
            setUsers(response.data);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch users.');
        } finally {
            setLoading(false); // Tắt trạng thái loading
        }
    };

    useEffect(() => {
        fetchUsers(); // Fetch users when the screen loads
    }, []);

    // Điều hướng tới form thêm người dùng
    const addUser = () => {
        navigation.navigate('UserForm', { isEdit: false, refresh: fetchUsers });
    };

    // Điều hướng tới form sửa người dùng
    const editUser = (user: User) => {
        navigation.navigate('UserForm', { user, isEdit: true, refresh: fetchUsers });
    };

    // Xác nhận và xóa người dùng
    const confirmDeleteUser = (id: string) => {
        Alert.alert(
            'Delete User',
            'Are you sure you want to delete this user?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => deleteUser(id), // Nếu người dùng bấm OK, xóa người dùng
                },
            ],
            { cancelable: false }
        );
    };

    // Xóa người dùng
    const deleteUser = async (id: string) => {
        setLoading(true); // Bật trạng thái loading khi xóa
        try {
            await axios.delete(`http://localhost:8000/api/userrn/${id}`);
            Alert.alert('Success', 'User deleted successfully!');
            fetchUsers(); // Cập nhật lại danh sách sau khi xóa
        } catch (error) {
            Alert.alert('Error', 'Failed to delete user.');
        } finally {
            setLoading(false); // Tắt trạng thái loading
        }
    };

    const renderItem = ({ item }: { item: User }) => (
        <View style={styles.userContainer}>
            <Text style={styles.userText}>{item.name} ({item.age})</Text>
            <Text style={styles.userEmail}>{item.email}</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => editUser(item)}>
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => confirmDeleteUser(item.id)}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>User List</Text>

            {/* Nút thêm người dùng */}
            <Button title="Add User" onPress={addUser} />

            {/* Hiển thị trạng thái loading */}
            {loading ? (
                <ActivityIndicator size="large" color="#007BFF" />
            ) : (
                <FlatList
                    data={users}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    userContainer: {
        padding: 16,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    userText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    userEmail: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        width: '45%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default HomeScreen;
