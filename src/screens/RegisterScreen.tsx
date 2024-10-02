import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon

const RegisterScreen = ({ navigation }: any) => {
    const { control, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false); // State for loading

    const onSubmit = async (data: any) => {
        setLoading(true); // Start loading
        try {
            const response = await fetch('http://localhost:8000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: data.username,
                    email: data.email,
                    password: data.password,
                }),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('API Response:', responseData);

                Alert.alert('Success', `Account created for ${responseData.username}`);
                navigation.navigate('Login');
            } else {
                const errorData = await response.json();
                Alert.alert('Error', errorData.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('API Error:', error);
            Alert.alert('Error', 'Failed to register. Please try again later.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <ImageBackground source={require('../public/bgnt2.jpg')} style={styles.background}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Register</Text>
                    <View style={styles.inputContainer}>
                        <Icon name="user" size={20} color="#333" style={styles.icon} />
                        <Controller
                            control={control}
                            name="username"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Username"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon name="envelope" size={20} color="#333" style={styles.icon} />
                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon name="lock" size={20} color="#333" style={styles.icon} />
                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    secureTextEntry
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                    </View>
                    <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={handleSubmit(onSubmit)} disabled={loading}>
                        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign Up</Text>}
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.registerButton]} onPress={() => navigation.goBack()}>
                        <Text style={styles.buttonText}>Back to Login</Text>
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
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Nền trắng với độ mờ 50%
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white', // Nền trắng cho nội dung
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
        width: '100%',
    },
    icon: {
        padding: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    button: {
        padding: 10,
        borderRadius: 5,
        textAlign: 'center',
        marginBottom: 10,
        shadowColor: '#000', // Thêm bóng đổ
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2, // Thêm độ nổi cho Android
        width: '100%',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    loginButton: {
        backgroundColor: '#007bff', // Màu nền cho nút Login
    },
    registerButton: {
        backgroundColor: '#28a745', // Màu nền cho nút Register
    },
});

export default RegisterScreen;