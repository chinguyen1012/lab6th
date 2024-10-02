import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
    // Các màn hình khác trong ứng dụng của bạn
    ResetPassword: undefined; // Hoặc có thể định nghĩa tham số nếu có
    Login: undefined; // Add Login screen to the type definition
};

// Định nghĩa kiểu cho props của ResetPasswordScreen
type Props = NativeStackScreenProps<RootStackParamList, 'ResetPassword'>;

const getTokenFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('token'); // Trả về giá trị của tham số 'token'
};

const ResetPasswordScreen: React.FC<Props> = ({ navigation }) => {
    // Lấy token từ URL
    const token = getTokenFromUrl();

    const { control, handleSubmit } = useForm();

    // Function to handle form submission and call the reset password API
    const onSubmit = async (data: any) => {
        if (!token) {
            Alert.alert('Error', 'Invalid token.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,
                    newPassword: data.password,
                }),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('API Response:', responseData);

                Alert.alert('Success', 'Password has been reset successfully.');
                navigation.navigate('Login');
            } else {
                const errorData = await response.json();
                Alert.alert('Error', errorData.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('API Error:', error);
            Alert.alert('Error', 'Failed to reset password. Please try again later.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reset Password</Text>
            <Controller
                control={control}
                name="password"
                defaultValue=""
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="New Password"
                        secureTextEntry
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            <Button title="Reset Password" onPress={handleSubmit(onSubmit)} />
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

export default ResetPasswordScreen;
