import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }: any) => {
    const { control, handleSubmit } = useForm();

    // OAuth configuration
    const clientId = '392465888946-u9dm8n26tcnjoke582ktcolenrovql5c.apps.googleusercontent.com';
    const redirectUri = AuthSession.makeRedirectUri();

    // Function to handle form submission and call the login API
    const onSubmit = async (data: any) => {
        try {
            const queryString = new URLSearchParams({
                username: data.username,
                password: data.password
            }).toString();

            const response = await fetch('http://localhost:8000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: queryString,  // Send data as x-www-form-urlencoded
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('API Response:', responseData);

                Alert.alert('Success', `Welcome ${data.username}`);

                // Navigate to the HomeScreen
                navigation.navigate('Home');
            } else {
                const errorData = await response.json();
                Alert.alert('Error', errorData.message || 'Invalid username or password');
            }
        } catch (error) {
            console.error('API Error:', error);
            Alert.alert('Error', 'Failed to log in. Please try again later.');
        }
    };

    // Function to handle Google login
    const handleGoogleLogin = async () => {
        try {
            const authRequest = new AuthSession.AuthRequest({
                clientId,
                redirectUri,
                scopes: ['profile', 'email'],
                responseType: AuthSession.ResponseType.Token,  // This uses implicit flow to get the token directly
            });

            const discovery = {
                authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
                tokenEndpoint: 'https://oauth2.googleapis.com/token',
                revocationEndpoint: 'https://oauth2.googleapis.com/revoke'
            };

            // Prompt Google login
            const result = await authRequest.promptAsync(discovery);

            if (result.type === 'success') {
                const tokenId = result.params.access_token;

                // Send tokenId to backend for verification and login
                const response = await fetch('https://3f30-171-239-3-156.ngrok-free.app/authgg/google/callback', {
                    method: 'GET',  // Thay đổi thành GET
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ tokenId }),  // Send Google tokenId to backend
                });

                if (response.ok) {
                    const responseData = await response.json();
                    Alert.alert('Success', 'Logged in with Google!');
                    navigation.navigate('Home');
                } else {
                    const errorData = await response.json();
                    Alert.alert('Error', errorData.message || 'Failed to log in with Google');
                }
            } else {
                Alert.alert('Error', 'Google login cancelled');
            }
        } catch (error) {
            console.error('Google Login Error:', error);
            Alert.alert('Error', 'Failed to log in with Google. Please try again later.');
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
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
            <Button title="Login" onPress={handleSubmit(onSubmit)} />
            <Button title="Register" onPress={() => navigation.navigate('Register')} />
            <Button title="Login with Google" onPress={handleGoogleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
    },
});

export default LoginScreen;
