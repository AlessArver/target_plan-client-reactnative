import React from "react";
import { useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AUTH_PAGE_ROUTE, HOME_PAGE_ROUTE } from "./routingNames";
import { getMe } from "../flux/users";
import { usersApi } from "../api/users";

import { HomePage } from "../pages/Home/HomePage";
import { AuthPage } from "../pages/Auth/AuthPage";

const Stack = createNativeStackNavigator();

export const Routing = () => {
  const dispatch = useDispatch();

  const fetchMe = async () => {
    const data = await usersApi.me();
    console.log("data", data);
    // dispatch(getMe(data));
  };
  fetchMe();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={HOME_PAGE_ROUTE} component={HomePage} />
        <Stack.Screen name={AUTH_PAGE_ROUTE} component={AuthPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
