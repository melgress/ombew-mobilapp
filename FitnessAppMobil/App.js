import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./screens/Home";
import Fitnessplan from "./screens/Fitnessplan";
import Fitnessinfo from "./screens/Fitnessinfo";
import Login from "./screens/Login";
import EditCourse from "./screens/admin/EditCourse";
import AddCourse from "./screens/admin/AddCourse";
import FitnessinfoAdmin from "./screens/admin/FitnessinfoAdmin";
import FitnessplanAdmin from "./screens/admin/FitnessplanAdmin";
import AddToCalendar from "./screens/admin/AddToCalendar";
import EditCalendar from "./screens/admin/EditCalendar";

const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#ffa600",
              height: 100,
            },
            headerTintColor: "black",
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Home",
            }}
          />
          <Stack.Screen
            name="Fitnessplan"
            component={Fitnessplan}
            options={{ title: "Fitnessplan" }}
          />
          <Stack.Screen
            name="FitnessplanAdmin"
            component={FitnessplanAdmin}
            options={{ title: "FitnessplanAdmin" }}
          />
          <Stack.Screen
            name="Fitnessinfo"
            component={Fitnessinfo}
            options={{ title: "Fitnessinfo" }}
          />
          <Stack.Screen
            name="FitnessinfoAdmin"
            component={FitnessinfoAdmin}
            options={{ title: "FitnessinfoAdmin" }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: "Login" }}
          />
          <Stack.Screen
            name="AddCourse"
            component={AddCourse}
            options={{ title: "AddCourse" }}
          />
          <Stack.Screen
            name="EditCourse"
            component={EditCourse}
            options={{ title: "EditCourse" }}
          />
          <Stack.Screen
            name="AddToCalendar"
            component={AddToCalendar}
            options={{ title: "AddToCalendar" }}
          />
          <Stack.Screen
            name="EditCalendar"
            component={EditCalendar}
            options={{ title: "EditCalendar" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
