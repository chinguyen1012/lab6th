import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MealsStackParamList } from '../navigation/MealsNavigator';

// Dữ liệu giả lập cho các món ăn yêu thích
const favoriteMeals = [
    { id: 'm1', title: 'Spaghetti Carbonara' },
    { id: 'm2', title: 'Sushi Rolls' },
    // Thêm các món ăn yêu thích khác...
];

type FavoritesNavigationProp = StackNavigationProp<MealsStackParamList, 'MealDetail'>;

const FavoritesScreen = () => {
    const navigation = useNavigation<FavoritesNavigationProp>();

    const renderMealItem = (itemData: { item: { id: string; title: string } }) => {
        return (
            <TouchableOpacity
                style={styles.mealItem}
                onPress={() => {
                    navigation.navigate('MealDetail', {
                        mealId: itemData.item.id,
                    });
                }}
            >
                <View>
                    <Text style={styles.title}>{itemData.item.title}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    if (favoriteMeals.length === 0) {
        return (
            <View style={styles.screen}>
                <Text>No favorite meals found. Start adding some!</Text>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <FlatList
                data={favoriteMeals}
                keyExtractor={(item) => item.id}
                renderItem={renderMealItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    mealItem: {
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        width: '100%',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
    },
});

export default FavoritesScreen;
