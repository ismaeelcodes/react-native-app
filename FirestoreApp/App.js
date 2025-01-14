import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from "./pages/AuthScreen";
import ListScreen from "./pages/ListScreen";
import CreateItemScreen from "./pages/CreateItemScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen name="CreateItem" component={CreateItemScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
