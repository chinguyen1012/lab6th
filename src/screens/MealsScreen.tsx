import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import axios from 'axios';

// Định nghĩa kiểu dữ liệu cho món ăn (Meal)
type Meal = {
    id: string; // Tương thích với MongoDB
    title: string;
    description: string;
    Fvr: boolean; // Thuộc tính Fvr để kiểm tra yêu thích
};

// Định nghĩa kiểu dữ liệu cho navigation (root stack)
type RootStackParamList = {
    Meals: undefined;
    Favorites: { favoriteMeals: Meal[] };
};

const MealsScreen = ({ navigation }: { navigation: NavigationProp<RootStackParamList, 'Meals'> }) => {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
    const [loadingId, setLoadingId] = useState<string | null>(null); // Xác định món ăn nào đang được cập nhật

    useEffect(() => {
        // Gọi API để lấy danh sách món ăn từ backend
        axios.get('http://localhost:8000/api/meals')
            .then(response => {
                setMeals(response.data);
                setLoading(false); // Dừng trạng thái loading khi có dữ liệu
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi lấy dữ liệu:', error);
                setLoading(false); // Dừng trạng thái loading ngay cả khi có lỗi
            });
    }, []);

    // Hàm để thay đổi trạng thái yêu thích (Fvr) của món ăn
    const toggleFavorite = (meal: Meal) => {
        if (!meal.id) {
            console.error('Không tìm thấy _id của món ăn:', meal);
            return;
        }

        setLoadingId(meal.id); // Đặt ID của món ăn đang được cập nhật (hiển thị loading spinner)

        const updatedMeal = { ...meal, Fvr: !meal.Fvr }; // Đảo ngược giá trị của Fvr

        // Gọi API để cập nhật trạng thái yêu thích
        axios.patch(`http://localhost:8000/api/meals/${meal.id}/favorite`, { isFavorite: !meal.Fvr })
            .then(response => {
                // Cập nhật state của meals
                const updatedMeals = meals.map(m =>
                    m.id === meal.id ? { ...m, Fvr: !m.Fvr } : m
                );
                setMeals(updatedMeals);
                setLoadingId(null); // Dừng loading sau khi cập nhật xong
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi cập nhật trạng thái yêu thích:', error);
                setLoadingId(null); // Dừng loading nếu gặp lỗi
            });
    };

    // Điều hướng đến FavoritesScreen và truyền danh sách món ăn yêu thích
    const goToFavorites = () => {
        const favoriteMeals = meals.filter(meal => meal.Fvr); // Lọc ra các món ăn yêu thích
        navigation.navigate('Favorites', { favoriteMeals });
    };

    // Nếu đang tải dữ liệu, hiển thị vòng quay tải dữ liệu
    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Danh sách món ăn</Text>

            <FlatList
                data={meals}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.mealItem}>
                        <Text style={styles.mealTitle}>{item.title}</Text>
                        <Text>{item.description}</Text>

                        <TouchableOpacity
                            onPress={() => toggleFavorite(item)}
                            style={styles.favoriteButton}
                            disabled={loadingId === item.id} // Vô hiệu hóa nút khi món ăn đang cập nhật
                        >
                            {loadingId === item.id ? ( // Hiển thị vòng quay nếu món ăn đang được cập nhật
                                <ActivityIndicator size="small" color="tomato" />
                            ) : (
                                <Text style={{ color: 'tomato' }}>
                                    {item.Fvr ? 'Bỏ yêu thích' : 'Yêu thích'}
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                )}
            />

            <Button title="Xem danh sách yêu thích" onPress={goToFavorites} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    mealItem: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
    },
    mealTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    favoriteButton: {
        marginTop: 10,
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 5,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MealsScreen;
