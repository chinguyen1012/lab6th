import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

// Định nghĩa kiểu cho một người
interface Person {
    id: string;
    name: string;
}

// Tạo dữ liệu danh sách mẫu
const PEOPLE: Person[] = [
    { id: '1', name: 'Johan Renard' },
    { id: '2', name: 'Brand Van Meijl' },
    { id: '3', name: 'Kasper Kivela' },
    { id: '4', name: 'Harley Martin' },
    { id: '5', name: 'Aapo Niemela' },
    { id: '6', name: 'Carol Williams' },
    { id: '7', name: 'تارا حسینی' },
    { id: '8', name: 'محمدامین سهبان راد' },
    { id: '9', name: 'Mauritz Musch' },
    { id: '10', name: 'Andrea Austin' },
    { id: '11', name: 'Murat Kutlay' },
    { id: '12', name: 'Nanneke Ermers' },
    { id: '13', name: 'Jayden Anderson' },
    { id: '14', name: 'Nejla Van Riet' },
    { id: '15', name: 'Heather Hudson' },
    { id: '16', name: 'Maria Wright' },
    { id: '17', name: 'Edelmira Nogueira' },
    // Bạn có thể thêm nhiều tên hơn vào đây...
];

// Component để hiển thị một người trong danh sách
const PersonItem: React.FC<{ person: Person }> = ({ person }) => (
    <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{person.name}</Text>
    </View>
);

// Component chính của ứng dụng
const Project8: React.FC = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={PEOPLE}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <PersonItem person={item} />}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </View>
    );
};

// Định nghĩa các kiểu CSS
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    itemContainer: {
        padding: 15,
    },
    itemText: {
        fontSize: 16,
    },
    separator: {
        height: 1,
        backgroundColor: '#ddd',
    },
});

export default Project8;
