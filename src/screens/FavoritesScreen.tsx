import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';

interface Meal {
    id: string;
    title: string;
    description: string;
    Fvr: boolean;
}

const FavoritesScreen = () => {
    const [favoriteMeals, setFavoriteMeals] = useState<Meal[]>([]); // State cho danh sách món ăn yêu thích
    const [loading, setLoading] = useState(true); // Trạng thái loading khi lấy dữ liệu từ API
    const [loadingId, setLoadingId] = useState<string | null>(null); // Xác định món ăn nào đang trong quá trình cập nhật

    useEffect(() => {
        // Gọi API để lấy danh sách món ăn
        axios.get('http://localhost:8000/api/meals')
            .then(response => {
                // Lọc danh sách món ăn với Fvr === true (món ăn yêu thích)
                const favorites = response.data.filter((meal: { Fvr: boolean }) => meal.Fvr === true);
                setFavoriteMeals(favorites); // Cập nhật state với danh sách món ăn yêu thích
                setLoading(false); // Dừng trạng thái loading khi có dữ liệu
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi lấy dữ liệu:', error);
                setLoading(false); // Dừng trạng thái loading nếu có lỗi
            });
    }, []);

    const toggleFavorite = (meal: Meal) => {
        setLoadingId(meal.id); // Đặt ID của món ăn đang được cập nhật (hiển thị loading spinner)

        // Gọi API để cập nhật trạng thái yêu thích (Fvr)
        axios.patch(`http://localhost:8000/api/meals/${meal.id}/favorite`, { isFavorite: !meal.Fvr })
            .then(response => {
                // Cập nhật danh sách món ăn yêu thích sau khi món ăn được cập nhật
                const updatedMeals = favoriteMeals.map(m =>
                    m.id === meal.id ? { ...m, Fvr: !m.Fvr } : m
                ).filter(m => m.Fvr === true); // Lọc lại danh sách yêu thích chỉ giữ những món có Fvr === true
                setFavoriteMeals(updatedMeals);
                setLoadingId(null); // Đặt loadingId về null khi quá trình cập nhật hoàn tất
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi cập nhật trạng thái yêu thích:', error);
                setLoadingId(null); // Đặt loadingId về null nếu có lỗi
            });
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Danh sách món ăn yêu thích</Text>
            {favoriteMeals.length > 0 ? (
                <FlatList
                    data={favoriteMeals}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.mealItem}>
                            <Text style={styles.mealTitle}>{item.title}</Text>
                            <Text>{item.description}</Text>
                            <TouchableOpacity
                                onPress={() => toggleFavorite(item)}
                                style={styles.favoriteButton}
                                disabled={loadingId === item.id} // Vô hiệu hóa nút khi đang loading
                            >
                                {loadingId === item.id ? ( // Hiển thị loading spinner nếu đang cập nhật món ăn này
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
            ) : (
                <Text>Không có món ăn yêu thích nào.</Text>
            )}
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

export default FavoritesScreen;
