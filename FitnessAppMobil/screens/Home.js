import React, { Component, useState, useEffect } from "react";
import { Button, View, Text, AsyncStorage } from "react-native";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {
      username: "",
      password: "",
      token: "",
      isLoggedIn: Boolean,
    };
  }

  onChangeUsername = (text) => {
    this.setState({
      username: text,
    });
  };
  onChangePassword = (text) => {
    this.setState({
      password: text,
    });
  };

  handleLogin() {
    //console.log(this.props.history);
    fetch("http://192.168.178.23:9000/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        const token = response.token;
        //AsyncStorage.getItem('TASKS');
        this.setState({
          token: token,
        });
        AsyncStorage.setItem("token", this.state.token);
        if (token != null) {
          this.setState({
            isLoggedIn: true,
          });
          this.props.navigation.goBack("Home");
          console.log("Eingeloggt");
        } else {
          console.log("Nicht geklappt");
        }
      })

      .catch((err) => console.log(err));
  }

  handleLogout() {
    AsyncStorage.removeItem("token");
    this.setState({
      isLoggedIn: false,
    });
    this.props.navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
    console.log("Ausgeloggt");
  }

  render() {
    if (this.state.isLoggedIn === true) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Eingeloggt!</Text>
          <Button
            title="Go to Fitnessinfo"
            onPress={() => this.props.navigation.navigate("FitnessinfoAdmin")}
          />
          <Button
            title="Go to Fitnessplan"
            onPress={() => this.props.navigation.navigate("FitnessplanAdmin")}
          />
          <Button
            title="Logout"
            onPress={() => {
              this.handleLogout();
            }}
          />
        </View>
      );
    } else {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Welcome!</Text>
          <Button
            title="Go to Fitnessinfo"
            onPress={() => this.props.navigation.navigate("Fitnessinfo")}
          />
          <Button
            title="Go to Fitnessplan"
            onPress={() => this.props.navigation.navigate("Fitnessplan")}
          />
          {
            <Button
              title="Go to Login"
              onPress={() =>
                this.props.navigation.navigate("Login", {
                  handleLogin: this.handleLogin.bind(this),
                  handleLogout: this.handleLogout.bind(this),
                  onChangeUsername: this.onChangeUsername.bind(this),
                  onChangePassword: this.onChangePassword.bind(this),
                })
              }
            />
          }
        </View>
      );
    }
  }
}

//export default Home;

/*
<Button
          title="Logout"
          onPress={() => {
            route.params.handleLogout();
            navigation.push("Home", { isLoggedIn: false });
          }}
        />
*/
