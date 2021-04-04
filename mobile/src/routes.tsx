import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./pages/Home";
import Users from "./pages/Users";
import UserDetail from "./pages/UserDetail";

const AppStack = createStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator headerMode="none"
                screenOptions={{
                    cardStyle: {
                        backgroundColor:"#FFF"
                    }
                }}
            >
            <AppStack.Screen name="Home" component={Home} />
            <AppStack.Screen name="Users" component={Users} />
            <AppStack.Screen name="UserDetail" component={UserDetail} />            
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;