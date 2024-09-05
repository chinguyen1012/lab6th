import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type OtherScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Pj1'>;

type Props = {
    navigation: OtherScreenNavigationProp;
};

const Project1: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.viewStyle}>
                {/* <Button title="Quay lại Trang chủ" onPress={() => navigation.goBack()} /> */}
                <Text style={styles.textStyle} >Hello Word</Text>
            </View>
        </View>

    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1, // Đặt container sử dụng toàn bộ không gian màn hình
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewStyle: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'aqua',
    },
    textStyle: {
        color: 'black',
    },

});


export default Project1;





