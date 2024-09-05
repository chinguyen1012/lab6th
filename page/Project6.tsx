import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// Định nghĩa kiểu cho các props của component Square
interface SquareProps {
    text: string; // Văn bản hiển thị trong ô vuông
    bgColor?: string; // Màu nền tùy chọn cho ô vuông
}

// Tạo component Square tùy chỉnh
const Square: React.FC<SquareProps> = ({ text, bgColor = '#7ce0f9' }) => (
    <View style={[styles.box, { backgroundColor: bgColor }]}>
        <Text>{text}</Text>
    </View>
);

// Dữ liệu cho các ô vuông
const data: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

// Component chính của ứng dụng
const App: React.FC = () => {
    return (
        <ScrollView style={styles.container}>
            {data.map((item, index) => (
                <Square key={item} text={`Square ${index + 1}`} />
            ))}
        </ScrollView>
    );
};

// Định nghĩa các kiểu CSS
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    box: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
    },
});

export default App;
