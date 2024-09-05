import React, { useState } from 'react';
import { TextInput, Text, View, StyleSheet, Button } from 'react-native';

// Component chính của ứng dụng
const App: React.FC = () => {
    // Sử dụng hook useState để tạo state name
    const [name, setName] = useState<string>("");

    return (
        <View style={styles.container}>
            <Text style={styles.label}>What is your name?</Text>
            <TextInput
                style={styles.input}
                placeholder="John Doe"
                placeholderTextColor="rgba(0, 0, 0, 0.5)"
                onChangeText={(text) => setName(text)} // Cập nhật state khi người dùng nhập
                value={name} // Giá trị của TextInput lấy từ state
            />
            <Button
                title="Say Hello"
                onPress={() => {
                    alert(`Hello, ${name}!`); // Hiển thị thông báo khi nhấn nút
                    setName(""); // Đặt lại state name về rỗng
                }}
            />
        </View>
    );
};

// Định nghĩa các kiểu CSS
const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    input: {
        marginTop: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        padding: 10,
        borderRadius: 5,
    },
});

export default App;
