import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, User } from '../navigation/StackParamList'; // Import types

type UserFormProps = NativeStackScreenProps<RootStackParamList, 'UserForm'>;

const UserForm: React.FC<UserFormProps> = ({ route, navigation }) => {
    const { user, isEdit, refresh } = route.params || { user: null, isEdit: false };

    const [name, setName] = useState<string>(user?.name || '');
    const [email, setEmail] = useState<string>(user?.email || '');
    const [age, setAge] = useState<string>(user?.age ? user.age.toString() : '');
    const [loading, setLoading] = useState<boolean>(false); // Trạng thái loading

    const handleAddUser = async () => {
        setLoading(true); // Bật trạng thái loading khi thêm người dùng
        try {
            await axios.post('http://localhost:8000/api/userrn', {
                name,
                email,
                age: parseInt(age),
            });
            Alert.alert('Success', 'User added successfully!');
            refresh(); // Gọi hàm fetchUsers sau khi thêm mới
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to add user.');
        } finally {
            setLoading(false); // Tắt trạng thái loading sau khi hoàn thành
        }
    };

    const handleEditUser = async () => {
        setLoading(true); // Bật trạng thái loading khi cập nhật người dùng
        try {
            await axios.put(`http://localhost:8000/api/userrn/${user?.id}`, {
                name,
                email,
                age: parseInt(age),
            });
            Alert.alert('Success', 'User updated successfully!');
            refresh(); // Gọi hàm fetchUsers sau khi cập nhật
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to update user.');
        } finally {
            setLoading(false); // Tắt trạng thái loading sau khi hoàn thành
        }
    };

    const handleSubmit = () => {
        if (isEdit) {
            handleEditUser();
        } else {
            handleAddUser();
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{isEdit ? 'Edit User' : 'Add User'}</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#007BFF" />
            ) : (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Age"
                        value={age}
                        onChangeText={setAge}
                        keyboardType="numeric"
                    />
                    <Button title={isEdit ? 'Update User' : 'Add User'} onPress={handleSubmit} />
                </>
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
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
});

export default UserForm;
