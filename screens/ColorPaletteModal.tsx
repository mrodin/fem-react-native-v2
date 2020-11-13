import React, {FC, useState, useCallback} from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Alert,
    Switch,
    FlatList,
} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";

import {MainStackParamList} from "../App";

const COLORS = [
    { colorName: 'AliceBlue', hexCode: '#F0F8FF' },
    { colorName: 'AntiqueWhite', hexCode: '#FAEBD7' },
    { colorName: 'Aqua', hexCode: '#00FFFF' },
    { colorName: 'Aquamarine', hexCode: '#7FFFD4' },
    { colorName: 'Azure', hexCode: '#F0FFFF' },
    { colorName: 'Beige', hexCode: '#F5F5DC' },
    { colorName: 'Bisque', hexCode: '#FFE4C4' },
    { colorName: 'Black', hexCode: '#000000' },
    { colorName: 'BlanchedAlmond', hexCode: '#FFEBCD' },
    { colorName: 'Blue', hexCode: '#0000FF' },
];

type HomeScreenNavigationProp = StackNavigationProp<MainStackParamList, "Home">;

interface ColorPaletteModalProps {
    navigation: HomeScreenNavigationProp;
}

const ColorPaletteModal: FC<ColorPaletteModalProps> = ({navigation}) => {
    const [name, setName] = useState<string>("");
    const [selectedColors, setSelectedColors] = useState<Array<{colorName: string, hexCode: string}>>([]);

    const handleSubmit = useCallback(() => {
        if (!name) {
            Alert.alert("Please enter a palette name");
        } else if (selectedColors.length < 3) {
            Alert.alert("Please add at least 3 colors");
        }
        else {
            const newColorPalette = {
                paletteName: name,
                colors: selectedColors,
            };
            navigation.navigate("Home", {newColorPalette});
        }
    }, [name, selectedColors]);

    const handleValueChange = useCallback((value, color) => {
        if (value === true) {
            setSelectedColors((colors) => [...colors, color]);
        } else {
            setSelectedColors((colors) => colors.filter((selectedColor) => color.colorName !== selectedColor.colorName));
        }
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.name}>Name of the palette</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={(value) => {setName(value)}}
                placeholder="Palette name"
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <FlatList
                data={COLORS}
                keyExtractor={(item) => item.colorName}
                renderItem={({item}) => (
                    <View style={styles.color}>
                        <Text>{item.colorName}</Text>
                        <Switch
                            value={!!selectedColors.find((color) => color.colorName === item.colorName)}
                            onValueChange={(selected) => {handleValueChange(selected, item)}}
                        />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: "white",
        flex: 1,
    },
    input: {
        borderColor: "grey",
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    button: {
        height: 40,
        backgroundColor: "teal",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
    name: {
        marginBottom: 10,
    },
    color: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "grey",
    },
});

export default ColorPaletteModal;
