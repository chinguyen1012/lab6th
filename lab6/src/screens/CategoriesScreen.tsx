// src/screens/CategoriesScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MealsStackParamList } from '../navigation/MealsNavigator';  // Import kiểu Stack Param List
import { CATEGORIES } from '../data/dummy-data';  // Dữ liệu danh mục

type CategoriesNavigationProp = StackNavigationProp<MealsStackParamList, 'Categories'>;

const CategoriesScreen = () => {
    const navigation = useNavigation<CategoriesNavigationProp>();

    const renderGridItem = (itemData: { item: { id: string; title: string } }) => {
        return (
            <TouchableOpacity
                style={styles.gridItem}
                onPress={() => {
                    navigation.navigate('Meals', { categoryId: itemData.item.id });
                }}
            >
                <View>
                    <Text>{itemData.item.title}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <FlatList
            data={CATEGORIES}
            keyExtractor={(item) => item.id}
            renderItem={renderGridItem}
            numColumns={2}
        />
    );
};

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CategoriesScreen;
