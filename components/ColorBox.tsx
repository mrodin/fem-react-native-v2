import React, {FC} from "react";
import {View, Text, StyleSheet} from "react-native";

interface ColorBoxProps {
    colorName: string,
    colorHex: string,
}

const ColorBox: FC<ColorBoxProps> = ({colorName, colorHex}) => {
    const textColor = {
        color: parseInt(colorHex.replace('#', ''), 16) > 0xffffff / 1.1 ? "black" : "white",
    };

    return (
        <View style={[styles.box, {backgroundColor: colorHex}]}>
            <Text style={[styles.boxText, textColor]}>{colorName}: {colorHex}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    box: {
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    boxText: {
        fontWeight: "bold",
    }
});

export default ColorBox;
