import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Modal, StyleSheet, Pressable, ImageBackground, Alert, TouchableOpacity } from 'react-native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type OtherScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Lab1'>;

type Props = {
    navigation: OtherScreenNavigationProp;
};

const Lab1: React.FC<Props> = ({ navigation }) => {
    // State để quản lý danh sách mục tiêu và hiển thị Modal
    const [courseGoals, setCourseGoals] = useState<string[]>([]);
    const [enteredGoal, setEnteredGoal] = useState<string>('');
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    // Hàm để thêm mục tiêu vào danh sách
    const addGoalHandler = () => {
        setCourseGoals((currentGoals) => [...currentGoals, enteredGoal]);
        setEnteredGoal('');
        setIsModalVisible(false);
    };

    const removeGoalHandler = (goalIndex: number) => {
        setCourseGoals((currentGoals) => currentGoals.filter((_, index) => index !== goalIndex));
    };

    const confirmRemoveGoalHandler = (goalIndex: number) => {
        Alert.alert(
            'Xác nhận xoá', // Tiêu đề của hộp thoại
            'Bạn có chắc chắn muốn xoá mục tiêu này không?', // Nội dung thông báo
            [
                { text: 'Huỷ', style: 'cancel' }, // Nút "Huỷ"
                { text: 'Xoá', style: 'destructive', onPress: () => removeGoalHandler(goalIndex) }, // Nút "Xoá"
            ]
        );
    };


    return (

        <ImageBackground
            source={require('../assets/images/bg1.jpg')}
            style={styles.background}
        >
            <View style={styles.screen}>
                <Button title="Thêm mục tiêu mới" onPress={() => setIsModalVisible(true)} />

                {/* Modal để nhập mục tiêu mới */}
                <Modal visible={isModalVisible} animationType="slide">
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Nhập mục tiêu"
                            style={styles.textInput}
                            onChangeText={setEnteredGoal}
                            value={enteredGoal}
                        />
                        <Button title="THÊM" onPress={addGoalHandler} />
                        <Button title="ĐÓNG" color="red" onPress={() => setIsModalVisible(false)} />
                    </View>
                </Modal>

                {/* Danh sách mục tiêu */}
                <FlatList
                    data={courseGoals}
                    renderItem={({ item, index }) => (
                        <View style={styles.goalItem}>
                            <Text style={styles.goalText}>{item}</Text>
                            <TouchableOpacity onPress={() => confirmRemoveGoalHandler(index)}>
                                <View style={styles.deleteButton}>
                                    <Text style={styles.deleteButtonText}>Xoá</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,  // Đảm bảo hình nền chiếm toàn bộ không gian
    },
    screen: {
        flex: 1,
        padding: 50,
        backgroundColor: 'rgba(240, 248, 255, 0.8)',  // Đặt nền trắng nhẹ với độ trong suốt

    },
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        backgroundColor: '#fff',
    },
    textInput: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom: 10,
        width: '80%',
        padding: 8,

    },
    goalItem: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: 'black',
        borderRadius: 5,
    },

    goalText: {
        color: 'white',
    },
    deleteButton: {
        backgroundColor: 'red',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});


export default Lab1;

