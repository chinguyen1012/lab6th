import React, { useState } from 'react';
import { Text, Button, View } from 'react-native';

// Component chính của ứng dụng
const App: React.FC = () => {
    // Sử dụng hook useState để tạo state pressCount
    const [pressCount, setPressCount] = useState<number>(0);

    return (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text>You've pressed the button: {pressCount} time(s)</Text>
            <Button
                title={`Pressed ${pressCount} time(s)`}
                onPress={() => setPressCount(pressCount + 1)} // Hàm xử lý khi nhấn nút
            />
        </View>
    );
};

export default App;
