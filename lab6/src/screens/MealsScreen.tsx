// src/screens/MealsScreen.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MealsStackParamList } from '../navigation/MealsNavigator';  // Import kiểu Stack Param List

// Định nghĩa kiểu Route Prop cho MealsScreen
type MealsRouteProp = RouteProp<MealsStackParamList, 'Meals'>;

const MealsScreen = () => {
    const route = useRoute<MealsRouteProp>();
    const { categoryId } = route.params;

    // Đây là nơi bạn có thể lọc các món ăn dựa trên categoryId
    // Ví dụ: const displayedMeals = MEALS.filter(meal => meal.categoryIds.includes(categoryId));

    return (
        <View style={styles.screen}>
            <Text>Meals in Category {categoryId}</Text>
            {/* Hiển thị danh sách các món ăn */}
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

export default MealsScreen;
