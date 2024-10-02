import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal, ImageBackground } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon
WebBrowser.maybeCompleteAuthSession();
import { ActivityIndicator } from 'react-native'; // Import ActivityIndicator

const LoginScreen = ({ navigation }: any) => {
    const { control, handleSubmit } = useForm();
    const [isModalVisible, setModalVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false); // State for loading

    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId: "YOUR_IOS_CLIENT_ID",
        webClientId: "YOUR_WEB_CLIENT_ID",
    });

    const onSubmit = async (data: any) => {
        try {
            const response = await fetch('http://localhost:8000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    username: data.username,
                    password: data.password,
                }).toString(),
            });

            if (response.ok) {
                const responseData = await response.json();
                Alert.alert('Success', `Welcome ${data.username}`);
                navigation.navigate('Home', { user: responseData }); // Truyền thông tin người dùng
            } else {
                const errorData = await response.json();
                Alert.alert('Error', errorData.message || 'Invalid username or password');
            }
        } catch (error) {
            console.error('API Error:', error);
            Alert.alert('Error', 'Failed to log in. Please try again later.');
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            Alert.alert('Error', 'Please enter an email address');
            return;
        }
        setLoading(true); // Start loading

        try {
            const response = await fetch('http://localhost:8000/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                Alert.alert('Success', 'A password reset link has been sent to your email.');
                setModalVisible(false);
            } else {
                const errorData = await response.json();
                Alert.alert('Error', errorData.message || 'Failed to send password reset email');
            }
        } catch (error) {
            console.error('API Error:', error);
            Alert.alert('Error', 'Failed to send password reset email. Please try again later.');
        }
        finally {
            setLoading(false); // Stop loading
        }
    };


    return (
        <ImageBackground source={require('../public/bgnt1.jpg')} style={styles.background}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Login</Text>
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
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={[styles.button, styles.loginButton, styles.halfButton]} onPress={handleSubmit(onSubmit)}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.registerButton, styles.halfButton]} onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={[styles.button, styles.forgotButton]} onPress={() => setModalVisible(true)}>
                        <Text style={styles.buttonText}>Forgot Password</Text>
                    </TouchableOpacity>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isModalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Reset Password</Text>
                                <TextInput
                                    style={styles.modalInput}
                                    placeholder="Enter your email"
                                    onChangeText={(text) => setEmail(text)}
                                    value={email}
                                />
                                <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={handleForgotPassword} disabled={loading}>
                                    {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Send Reset Link</Text>}
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    halfButton: {
        flex: 1,
        marginHorizontal: 5,
    },

    title: {
        fontSize: 94,
        marginBottom: 20,
        color: '#ffff',
    },
    modalInput: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
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
    forgotButton: {

        backgroundColor: '#ffc107', // Màu nền cho nút Forgot Password
    },
    cancelButton: {
        backgroundColor: '#dc3545', // Màu nền cho nút Cancel
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 20,
    },
});

export default LoginScreen;