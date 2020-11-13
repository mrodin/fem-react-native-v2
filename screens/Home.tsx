import React, {FC, useState, useCallback, useEffect} from "react";
import {FlatList, StyleSheet, TouchableOpacity, Text} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";

import PalettePreview from "../components/PalettePreview";
import {MainStackParamList} from "../App";

type HomeScreenNavigationProp = StackNavigationProp<MainStackParamList, "Home">;
type HomeScreenRouteProp = RouteProp<MainStackParamList, "Home">;

interface HomeProps {
    navigation: HomeScreenNavigationProp;
    route: HomeScreenRouteProp;
}

interface IColorPalettes {
    paletteName: string;
    colors: Array<{ colorName: string, hexCode: string }>
}

const Home: FC<HomeProps> = ({navigation, route}) => {
    const [colorPalettes, setColorPalettes] = useState<Array<IColorPalettes>>([]);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const newColorPalette = route.params ? route.params.newColorPalette : undefined;

    const fetchColorPalettes = useCallback(async () => {
        const res = await fetch("https://color-palette-api.kadikraman.now.sh/palettes");
        if (res.ok) {
            const palettes = await res.json();
            setColorPalettes(palettes);
        }
    }, []);

    useEffect(() => {fetchColorPalettes()}, []);

    const handleRefresh = useCallback(async () => {
        setIsRefreshing(true);
        await fetchColorPalettes();
        setTimeout(() => setIsRefreshing(false), 1000)
    }, [])

    useEffect(() => {
        if (newColorPalette) {
            setColorPalettes((palettes) => [newColorPalette, ...palettes]);
        }
    }, [newColorPalette]);

    return (
        <FlatList
            style={styles.list}
            data={colorPalettes}
            keyExtractor={item => item.paletteName}
            renderItem={({item}) => (
                <PalettePreview
                    handlePress={() => {
                        navigation.navigate("ColorPalette", item)
                    }}
                    colorPalette={item}
                />
            )}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            ListHeaderComponent={
                <TouchableOpacity onPress={() => {navigation.navigate("ColorPaletteModal")}}>
                    <Text style={styles.buttonText}>Add a color scheme</Text>
                </TouchableOpacity>
            }
        />
    );
};

const styles = StyleSheet.create({
    list: {
        padding: 10,
        backgroundColor: "white",
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "teal",
        marginBottom: 10,
    },
});

export default Home;
