import React, {FC} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

import Home from "./screens/Home";
import ColorPalette from "./screens/ColorPalette";

export type RootStackParamList = {
    Home: undefined;
    ColorPalette: { paletteName: string, colors: Array<{ colorName: string, hexCode: string }> };
}

const Stack = createStackNavigator<RootStackParamList>();

const App: FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen
                    name="ColorPalette"
                    component={ColorPalette}
                    options={({ route }) => ({ title: route.params.paletteName })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
