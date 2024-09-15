import React, { createContext, useState, useContext } from 'react';

// Định nghĩa kiểu dữ liệu cho món ăn (Meal)
type Meal = {
    id: string;
    title: string;
    description: string;
};

// Định nghĩa kiểu cho context
type FavoritesContextType = {
    favoriteMeals: Meal[];
    toggleFavorite: (meal: Meal) => void;
};

// Tạo context
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Tạo provider để bọc quanh các component cần dùng context
export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [favoriteMeals, setFavoriteMeals] = useState<Meal[]>([]);

    // Hàm để thêm hoặc xóa món ăn yêu thích
    const toggleFavorite = (meal: Meal) => {
        if (favoriteMeals.some(item => item.id === meal.id)) {
            setFavoriteMeals(favoriteMeals.filter(item => item.id !== meal.id)); // Xóa nếu đã tồn tại
        } else {
            setFavoriteMeals([...favoriteMeals, meal]); // Thêm món ăn nếu chưa tồn tại
        }
    };

    return (
        <FavoritesContext.Provider value={{ favoriteMeals, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

// Tạo một hook tiện ích để sử dụng context dễ dàng
export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};
