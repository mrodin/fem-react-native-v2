import React, {FC} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

import Home from "./screens/Home";
import ColorPalette from "./screens/ColorPalette";
import ColorPaletteModal from "./screens/ColorPaletteModal";

export type MainStackParamList = {
    Home: {newColorPalette: {paletteName: string, colors: Array<{colorName: string, hexCode: string}>}};
    ColorPalette: {paletteName: string, colors: Array<{colorName: string, hexCode: string}>};
    ColorPaletteModal: undefined;
}

export type RootStackParamList = {
    Main: undefined;
    ColorPaletteModal: undefined;
}

const RootStack = createStackNavigator<RootStackParamList>();
const MainStack = createStackNavigator<MainStackParamList>();

const MainStackScreen = () => {
    return (
        <MainStack.Navigator>
            <MainStack.Screen name="Home" component={Home} />
            <MainStack.Screen
                name="ColorPalette"
                component={ColorPalette}
                options={({ route }) => ({ title: route.params.paletteName })}
            />
        </MainStack.Navigator>
    );
};

const App: FC = () => {
    return (
        <NavigationContainer>
            <RootStack.Navigator mode="modal">
                <RootStack.Screen
                    name="Main"
                    component={MainStackScreen}
                    options={{ headerShown: false }}
                />
                <RootStack.Screen
                    name="ColorPaletteModal"
                    component={ColorPaletteModal}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    );
};

export default App;
