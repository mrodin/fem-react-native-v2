import React, {FC} from "react";
import {Text, View, TouchableOpacity, StyleSheet, FlatList} from "react-native";

interface PalettePreviewProps {
    handlePress: () => void;
    colorPalette: { paletteName: string, colors: Array<{ colorName: string, hexCode: string }>}
}

const PalettePreview: FC<PalettePreviewProps> = ({handlePress, colorPalette}) => {
    const {paletteName, colors} = colorPalette;

    return (
        <TouchableOpacity onPress={handlePress}>
            <Text style={styles.text}>{paletteName}</Text>
            <FlatList
                style={styles.list}
                data={colors.slice(0, 5)}
                keyExtractor={item => item.colorName}
                renderItem={({item}) => <View style={[{backgroundColor: item.hexCode}, styles.box]} />}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    text: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 10,
    },
    box: {
        height: 30,
        width: 30,
        marginRight: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 2,
    },
    list: {
        marginBottom: 20,
        flexDirection: "row",
    }
});

export default PalettePreview;
