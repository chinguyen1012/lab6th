import React, { useState, useRef } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-elements";
import ConfettiCannon from "react-native-confetti-cannon"; // Import thư viện Confetti

const Calculator = () => {
    const [input, setInput] = useState("0");
    const [isTrigonometric, setIsTrigonometric] = useState(false); // Theo dõi nếu đang thực hiện phép toán lượng giác
    const [trigFunction, setTrigFunction] = useState(""); // Lưu phép toán lượng giác hiện tại
    const [showConfetti, setShowConfetti] = useState(false); // Trạng thái để hiển thị pháo giấy
    const confettiRef = useRef(null); // Ref cho Confetti

    // Hàm xử lý các số và phép toán
    const handleInput = (value: string) => {
        if (value === "C") {
            setInput("0");
            setIsTrigonometric(false); // Reset phép toán lượng giác
            setTrigFunction(""); // Reset phép toán lượng giác
        } else {
            setInput(input === "0" ? value : input + value);
        }
    };

    // Hàm xử lý các phép tính toán
    const handleCalculate = () => {
        try {
            let result;

            if (isTrigonometric && trigFunction) {
                const angle = parseFloat(input); // Lấy giá trị góc từ input

                switch (trigFunction) {
                    case "sin":
                        result = Math.sin((angle * Math.PI) / 180); // Tính sin theo radian
                        break;
                    case "cos":
                        result = Math.cos((angle * Math.PI) / 180); // Tính cos theo radian
                        break;
                    case "tan":
                        result = Math.tan((angle * Math.PI) / 180); // Tính tan theo radian
                        break;
                    default:
                        result = "Error";
                        break;
                }

                setIsTrigonometric(false); // Đặt lại trạng thái phép tính lượng giác
                setTrigFunction(""); // Đặt lại phép tính lượng giác
            } else {
                result = eval(input); // Xử lý các phép toán thông thường
            }

            if (Number.isFinite(result)) {
                setInput(result.toString());
                // Kích hoạt hiệu ứng pháo giấy khi phép tính thành công
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 2000); // Ẩn pháo giấy sau 2 giây
            } else {
                setInput("Error");
            }
        } catch (error) {
            setInput("Error");
        }
    };

    // Hàm xử lý các phép tính lượng giác
    const handleTrigonometric = (inputValue: string) => {
        // Khi nhấn sin, cos, tan, lưu phép toán lượng giác và chuẩn bị nhập góc
        setInput("0"); // Đặt lại input để nhập góc mới
        setIsTrigonometric(true); // Đang thực hiện phép toán lượng giác
        setTrigFunction(inputValue); // Lưu phép toán lượng giác (sin, cos, tan)
    };

    // Bố cục các nút bấm trên máy tính
    const layout = [
        [
            { inputValue: "7", style: styles.button, handler: handleInput },
            { inputValue: "8", style: styles.button, handler: handleInput },
            { inputValue: "9", style: styles.button, handler: handleInput },
            {
                inputValue: "/",
                displayText: "÷",
                style: styles.operatorButton,
                handler: handleInput,
            },
        ],
        [
            { inputValue: "4", style: styles.button, handler: handleInput },
            { inputValue: "5", style: styles.button, handler: handleInput },
            { inputValue: "6", style: styles.button, handler: handleInput },
            {
                inputValue: "*",
                displayText: "×",
                style: styles.operatorButton,
                handler: handleInput,
            },
        ],
        [
            { inputValue: "1", style: styles.button, handler: handleInput },
            { inputValue: "2", style: styles.button, handler: handleInput },
            { inputValue: "3", style: styles.button, handler: handleInput },
            { inputValue: "-", style: styles.operatorButton, handler: handleInput },
        ],
        [
            { inputValue: "0", style: styles.button, handler: handleInput },
            { inputValue: ".", style: styles.button, handler: handleInput },
            { inputValue: "C", style: styles.button, handler: handleInput },
            { inputValue: "+", style: styles.operatorButton, handler: handleInput },
        ],
        [
            // Hàng chứa các nút sin, cos, tan
            {
                inputValue: "sin",
                style: styles.operatorButton,
                handler: handleTrigonometric,
            },
            {
                inputValue: "cos",
                style: styles.operatorButton,
                handler: handleTrigonometric,
            },
            {
                inputValue: "tan",
                style: styles.operatorButton,
                handler: handleTrigonometric,
            },
        ],
        [
            {
                inputValue: "=",
                style: styles.calculateButton,
                handler: handleCalculate,
            },
        ],
    ];

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput multiline={false} style={styles.input} editable={false}>
                    {input}
                </TextInput>
            </View>
            <View style={styles.buttonContainer}>
                {layout.map((rows, index) => (
                    <View style={styles.row} key={index}>
                        {rows.map((row) => (
                            <TouchableOpacity
                                key={row.inputValue}
                                style={row.style}
                                onPress={() => row.handler(row.inputValue)}
                            >
                                <Text style={styles.buttonText}>
                                    {row.inputValue}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </View>

            {/* Hiển thị Confetti khi tính toán thành công */}
            {showConfetti && (
                <ConfettiCannon count={200} origin={{ x: 0, y: 0 }} ref={confettiRef} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: "#000",
        justifyContent: "center",
        paddingHorizontal: 10,
        paddingVertical: 40,
    },
    buttonContainer: {
        flex: 3,
        justifyContent: "space-around",
    },
    inputContainer: {
        height: 160,
        justifyContent: "flex-end",
    },
    button: {
        backgroundColor: "#505050",
        flex: 1,
        padding: 26,
        borderRadius: 28,
        margin: 10,
    },
    input: {
        fontSize: 48,
        color: "#fff",
        textAlign: "right",
    },
    row: {
        flexDirection: "row",
    },
    operatorButton: {
        backgroundColor: "#FFCCFF",
        flex: 1,
        padding: 26,
        borderRadius: 28,
        margin: 10,
    },
    buttonText: {
        fontSize: 28,
        textAlign: "center",
        color: "#fff",
    },
    calculateButton: {
        backgroundColor: "#FF9500",
        borderRadius: 38,
        padding: 16,
        width: "100%",
    },
});
export default Calculator;
