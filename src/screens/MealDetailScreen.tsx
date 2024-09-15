// src/screens/MealDetailScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MEALS } from '../data/dummy-data';
import { MealsStackParamList } from '../navigation/MealsNavigator';

// Định nghĩa kiểu cho route
type MealDetailScreenRouteProp = RouteProp<MealsStackParamList, 'MealDetail'>;

const MealDetailScreen = () => {
    const route = useRoute<MealDetailScreenRouteProp>();
    const { mealId } = route.params;

    // Tìm món ăn theo ID
    const selectedMeal = MEALS.find((meal) => meal.id === mealId);

    if (!selectedMeal) {
        return (
            <View style={styles.screen}>
                <Text>Meal not found!</Text>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <Text>{selectedMeal.title}</Text>
            <Text>{selectedMeal.description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MealDetailScreen;
