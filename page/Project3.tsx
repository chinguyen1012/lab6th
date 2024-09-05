import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, GestureResponderEvent } from 'react-native';

// Định nghĩa kiểu cho các props của component Button
interface ButtonProps {
    text: string; // Văn bản hiển thị trên nút
    onPress: (event: GestureResponderEvent) => void; // Hàm xử lý sự kiện khi nhấn nút
    buttonStyle?: object; // Kiểu tùy chỉnh cho nút
}

// Tạo component Button tùy chỉnh
const Button: React.FC<ButtonProps> = ({ text, onPress, buttonStyle }) => (
    <TouchableOpacity
        onPress={onPress}
        style={[styles.button, buttonStyle]} // Kết hợp các kiểu CSS
    >
        <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
);

// Component chính của ứng dụng
const Project3: React.FC = () => (
    <View style={styles.container}>
        {/* Sử dụng component Button tùy chỉnh */}
        <Button text="Say hello" onPress={() => Alert.alert("Hello!")} />
        <Button
            text="Say goodbye"
            onPress={() => Alert.alert("Goodbye!")}
            buttonStyle={{ backgroundColor: '#4dc2c2' }} // Thay đổi màu nền nút
        />
    </View>
);

// Định nghĩa các kiểu CSS
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    button: {
        backgroundColor: '#ff637c',
        alignSelf: 'center',
        padding: 10,
        margin: 10,
    },
    text: {
        color: '#fff',
    },
});

export default Project3;
