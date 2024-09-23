import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../navigation/StackParamList'; // Import your StackParamList

// Define the type for the navigation prop
type CategoriesScreenNavigationProp = StackNavigationProp<StackParamList, 'Categories'>;

// Define the type for the user data coming from the API
type User = {
    name: {
        first: string;
        last: string;
    };
    phone: string;
    email: string;
    location: {
        city: string;
        state: string;
        country: string;
    };
    picture: {
        large: string;
    };
};

// The main component
const CategoriesScreen = () => {
    const [contacts, setContacts] = useState<User[]>([]); // State to hold contact data
    const navigation = useNavigation<CategoriesScreenNavigationProp>(); // Typed navigation prop

    // Function to fetch data from the API
    const fetchContacts = async () => {
        try {
            const response = await fetch('https://randomuser.me/api/?results=100');
            const data = await response.json();
            setContacts(data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Fetch contacts when the component mounts
    useEffect(() => {
        fetchContacts();
    }, []);

    // Render each contact item
    const renderContactItem = ({ item }: { item: User }) => {
        const { name, phone, picture } = item;

        return (
            <TouchableOpacity
                style={styles.gridItem}
                onPress={() =>
                    navigation.navigate('ContactDetail', {
                        contact: {
                            name: item.name,
                            phone: item.phone,
                            email: item.email,
                            location: item.location,
                            picture: item.picture.large,
                        },
                    })
                }

            >
                <View>
                    {/* Display user image */}
                    <Image source={{ uri: picture.large }} style={styles.image} />
                    {/* Display user name */}
                    <Text style={styles.title}>
                        {name.first} {name.last}
                    </Text>
                    {/* Display user phone number */}
                    <Text style={styles.phone}>{phone}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={contacts}
            renderItem={renderContactItem}
            numColumns={2} // Display two columns of contacts
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
        alignItems: 'center', // Center content
        justifyContent: 'center', // Center content
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40, // Make image circular
        marginBottom: 10,
    },
    title: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    phone: {
        textAlign: 'center',
        fontSize: 14,
        color: 'gray',
    },
});

export default CategoriesScreen;
