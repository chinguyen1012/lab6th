import React, { useCallback } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { CATEGORIES } from '../data/dummy-data';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { MealsStackParamList } from '../navigation/MealsNavigator';
import { LauStackParamList } from '../navigation/LauNavigator';

// Định nghĩa kiểu điều hướng cho màn hình này
type CategoriesNavigationProp = NavigationProp<MealsStackParamList & LauStackParamList, 'Categories'>;

// Kiểu dữ liệu cho item trong danh sách danh mục
type CategoryItem = {
    id: string;
    title: string;
    imageUrl: string;
};

const CategoriesScreen = () => {
    const navigation = useNavigation<CategoriesNavigationProp>();

    // Hàm điều hướng dựa trên danh mục được chọn
    const navigateToScreen = useCallback((categoryId: string) => {
        if (categoryId === 'c1') {
            navigation.navigate('Meals', { categoryId });
        } else if (categoryId === 'c2') {
            navigation.navigate('Lau', { categoryId });
        }
    }, [navigation]);

    // Hàm render cho mỗi item trong danh sách danh mục
    const renderGridItem = ({ item }: { item: CategoryItem }) => {
        const { id, title, imageUrl } = item;

        return (
            <TouchableOpacity
                style={styles.gridItem}
                onPress={() => navigateToScreen(id)}
            >
                <View>
                    {/* Nếu không có imageUrl hợp lệ, cung cấp ảnh mặc định */}
                    <Image
                        source={{ uri: imageUrl || 'https://via.placeholder.com/150' }}
                        style={styles.image}
                    />
                    {/* Nếu không có title hợp lệ, cung cấp văn bản mặc định */}
                    <Text style={styles.title}>{title || 'Không có tiêu đề'}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <FlatList
            keyExtractor={(item) => item.id}
            data={CATEGORIES}
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
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
        elevation: 5, // Shadow for Android
    },
    image: {
        width: '100%',
        height: '80%',
    },
    title: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 5,
    },
});

export default CategoriesScreen;
