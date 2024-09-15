import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { LAU } from '../data/dummy-data';

const LauScreen = () => {
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>All Lau</Text>

            <FlatList
                data={LAU}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.mealItem}>
                        <Text style={styles.mealTitle}>{item.title}</Text>
                        <Text>{item.description}</Text>
                    </View>
                )}
            />
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
});

export default LauScreen;
