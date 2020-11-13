import React, {FC} from "react";
import {
    Text,
    FlatList,
    StyleSheet,
} from "react-native";
import {RouteProp} from "@react-navigation/native";

import ColorBox from "../components/ColorBox";
import {MainStackParamList} from "../App";

type ColorPaletteScreenRouteProp = RouteProp<MainStackParamList, "ColorPalette">;

interface ColorPaletteProps {
    route: ColorPaletteScreenRouteProp;
}

const ColorPalette: FC<ColorPaletteProps> = ({route}) => {
    const {colors, paletteName} = route.params;

    return (
        <FlatList
            style={styles.container}
            data={colors}
            keyExtractor={item => item.colorName}
            renderItem={({item}) => <ColorBox colorName={item.colorName} colorHex={item.hexCode} />}
            ListHeaderComponent={<Text style={styles.text}>{paletteName}</Text>}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingTop: 40,
        backgroundColor: "white",
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
});

export default ColorPalette;
