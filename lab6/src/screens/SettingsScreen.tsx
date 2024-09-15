// src/screens/SettingsScreen.tsx
import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const SettingsScreen = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

    const toggleThemeHandler = () => {
        setIsDarkTheme((prevState) => !prevState);
        // Ở đây bạn có thể triển khai logic để thay đổi chủ đề của ứng dụng
    };

    const toggleNotificationsHandler = () => {
        setIsNotificationsEnabled((prevState) => !prevState);
        // Ở đây bạn có thể triển khai logic để bật/tắt thông báo
    };

    return (
        <View style={styles.screen}>
            <View style={styles.settingItem}>
                <Text style={styles.label}>Dark Theme</Text>
                <Switch
                    value={isDarkTheme}
                    onValueChange={toggleThemeHandler}
                />
            </View>

            <View style={styles.settingItem}>
                <Text style={styles.label}>Enable Notifications</Text>
                <Switch
                    value={isNotificationsEnabled}
                    onValueChange={toggleNotificationsHandler}
                />
            </View>

            {/* Thêm nhiều cài đặt khác nếu cần */}
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-start',
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 15,
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,
    },
    label: {
        fontSize: 18,
    },
});

export default SettingsScreen;
