import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Định nghĩa kiểu cho các props của component Square
interface SquareProps {
    text: string; // Văn bản hiển thị trong ô vuông
    bgColor?: string; // Màu nền tùy chọn cho ô vuông
}

// Tạo component Square tùy chỉnh
const Square: React.FC<SquareProps> = ({ text, bgColor }) => (
    <View style={[styles.box, { backgroundColor: bgColor }]}>
        <Text>{text}</Text>
    </View>
);

// Component chính của ứng dụng
const App: React.FC = () => {
    return (
        <View style={styles.container}>
            <Square text="Square 1" bgColor='#B6C0C5' />
            <Square text="Square 2" bgColor="#4dc2c2" />
            <Square text="Square 3" bgColor="#ff637c" />
        </View>
    );
};

// Định nghĩa các kiểu CSS
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    box: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default App;
