import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type OtherScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Pj2'>;

type Props = {
    navigation: OtherScreenNavigationProp;
};

const showAlert = () => {
    Alert.alert('Hello', 'Bạn đã nhấn vào nút!');
};

const Project2: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Button title="Nhấn vào đây" onPress={showAlert} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // Căn giữa theo chiều dọc
        alignItems: 'center', // Căn giữa theo chiều ngang
        backgroundColor: '#f0f0f0', // Màu nền của màn hình
    },
});

export default Project2;
