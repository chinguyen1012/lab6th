import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

// Định nghĩa kiểu cho navigation prop
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
    navigation: HomeScreenNavigationProp;
};

// Định nghĩa danh sách các màn hình với cấu trúc đúng
const screens = [
    { name: 'Project 1', route: 'Pj1' },
    { name: 'Project 2', route: 'Pj2' },
    { name: 'Project 3', route: 'Pj3' },
    { name: 'Project 4', route: 'Pj4' },
    { name: 'Project 5', route: 'Pj5' },
    { name: 'Project 6', route: 'Pj6' },
    { name: 'Project 7', route: 'Pj7' },
    { name: 'Project 8', route: 'Pj8' },
    { name: 'LAB_1', route: 'Lab1' },
    { name: 'LAB_2', route: 'Lab2' },
];

const lab3Screen = { name: 'LAB_3_LT', route: 'Lab3' };

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Chọn một Project</Text>
            <FlatList
                data={screens}
                keyExtractor={(item) => item.route + item.name} // Đảm bảo key là duy nhất
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate(item.route as keyof RootStackParamList)}
                    >
                        <Text style={styles.buttonText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                numColumns={4} // Hiển thị 4 mục trên mỗi hàng
                columnWrapperStyle={styles.row} // Đặt style cho mỗi hàng
            />
            <View style={styles.row2} >
                <Text style={styles.header}>Lý Thuyết</Text>
                {/* Nút cho LAB_3 */}
                <TouchableOpacity
                    style={styles.button2}
                    onPress={() => navigation.navigate(lab3Screen.route as keyof RootStackParamList)}
                >
                    <Text style={styles.buttonText2}>{lab3Screen.name}</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    header: {
        fontSize: 20,
        marginBottom: 20,

    },
    row: {
        justifyContent: 'space-between',
        padding: 20, // Đặt khoảng cách giữa các phần tử trong hàng
        gap: 10, // Đặt khoảng cách giữa các hàng
    },
    row2: {
        marginBottom: 400,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 5,
        borderRadius: 5,
        marginBottom: 10,
        width: 80, // Đặt chiều rộng để phù hợp với 4 nút trên mỗi hàng
        alignItems: 'center',
    },

    button2: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        width: 120,

    },
    buttonText: {
        color: '#fff',
        fontSize: 13,
    },
    buttonText2: {
        color: '#fff',
        fontSize: 16,
    },
});

export default HomeScreen;
