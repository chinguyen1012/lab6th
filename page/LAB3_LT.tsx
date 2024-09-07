import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    Dimensions,
    Platform,
    StatusBar,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,

    Image,
    ScrollView,
} from 'react-native';

const App: React.FC = () => {
    const [isPortrait, setIsPortrait] = useState<boolean>(true); // Phát hiện hướng màn hình
    const [inputValue, setInputValue] = useState<string>(''); // Giá trị đầu vào

    // Phần 1: Thiết lập độ rộng động cho các nút
    const screenWidth = Dimensions.get('window').width; // Lấy chiều rộng của màn hình hiện tại
    const buttonWidth = screenWidth / 2 - 20; // Thiết lập độ rộng động

    useEffect(() => {
        // Phần 3: Lắng nghe sự thay đổi hướng màn hình
        const updateLayout = () => {
            const { width, height } = Dimensions.get('window');
            setIsPortrait(height >= width);
        };

        const subscription = Dimensions.addEventListener('change', updateLayout);

        // Dọn dẹp khi component bị hủy
        return () => {
            subscription?.remove();
        };
    }, []);

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Phần 4: Đảm bảo trường nhập liệu không bị che khuất
        >
            {/* Phần 7: Tùy chỉnh thanh trạng thái */}
            <StatusBar
                barStyle={Platform.select({
                    ios: isPortrait ? 'dark-content' : 'light-content',
                    android: isPortrait ? 'light-content' : 'dark-content',
                })}
                backgroundColor={isPortrait ? '#f0f0f0' : '#333'}
            />

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Phần 1 và 3: Hiển thị các nút bấm */}
                <View style={isPortrait ? styles.buttonContainerVertical : styles.buttonContainerHorizontal}>
                    <TouchableOpacity
                        style={[styles.button, { width: buttonWidth, backgroundColor: Platform.select({ ios: 'red', android: '#3d85c6' }) }]}
                        onPress={() => { }}
                    >
                        <Text style={styles.buttonText}>Button 1</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, { width: buttonWidth, backgroundColor: Platform.select({ ios: 'pink', android: '#3d85c6' }) }]}
                        onPress={() => { }}
                    >
                        <Text style={styles.buttonText}>Button 2</Text>
                    </TouchableOpacity>
                </View>

                {/* Phần 2 và 5: Điều chỉnh kích thước hình ảnh */}
                <Image
                    source={{ uri: 'https://via.placeholder.com/150' }}
                    style={isPortrait ? styles.imagePortrait : styles.imageLandscape}
                    resizeMode="contain"
                />

                {/* Phần 4: Trường nhập liệu với KeyboardAvoidingView */}
                <TextInput
                    style={styles.input}
                    placeholder="Enter text"
                    value={inputValue}
                    onChangeText={setInputValue}
                />

                <Text style={styles.text}>2024801030030</Text>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Platform.select({
            ios: '#f0f8ff',
            android: '#f5f5f5',
        }),
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    buttonContainerVertical: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonContainerHorizontal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
    },
    button: {
        margin: 10,
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',  // Màu chữ trắng cho nút
        fontSize: 16,
        fontWeight: 'bold',
    },
    imagePortrait: {
        width: Dimensions.get('window').width * 0.8,
        height: 200,
        marginVertical: 20,
    },
    imageLandscape: {
        width: Dimensions.get('window').width * 0.6,
        height: 150,
        marginVertical: 10,
    },
    input: {
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginVertical: 20,
        width: '80%',
    },
    text: {
        fontSize: 16,
        marginVertical: 10,
    },
});

export default App;