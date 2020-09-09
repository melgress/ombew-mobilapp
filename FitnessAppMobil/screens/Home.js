import React, { Component } from "react";
import { Button, View, Text, AsyncStorage, StyleSheet } from "react-native";

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
      en: false, //if true = english rendering
      url: "http://192.168.178.23:9000/api/", // hier die IP des Laptops angeben, mit der der Server läuft
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
    const url = this.state.url;
    fetch(url + "/login", {
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
          <Button
            //styles= kannst du unten im Stylesheet definieren und dann unter styles.Button hier einfügen
            title="EN"
            onPress={() => this.setState({ en: true })}
          ></Button>
          <Button
            //styles=
            title="DE"
            onPress={() => this.setState({ en: false })}
          ></Button>

          <Button
            title="Fitnessinfo"
            onPress={() =>
              this.props.navigation.navigate("FitnessinfoAdmin", {
                en: this.state.en,
                url: this.state.url,
              })
            }
          />
          <Button
            title="Fitnessplan"
            onPress={() =>
              this.props.navigation.navigate("FitnessplanAdmin", {
                en: this.state.en,
                url: this.state.url,
              })
            }
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
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            //styles=
            title="EN"
            onPress={() => this.setState({ en: true })}
          ></Button>
          <Button
            //styles=
            title="DE"
            onPress={() => this.setState({ en: false })}
            color="green"
          ></Button>

          <Button
            title="Fitnessinfo"
            onPress={() =>
              this.props.navigation.navigate("Fitnessinfo", {
                en: this.state.en,
                url: this.state.url,
              })
            }
          />
          <Button
            title="Fitnessplan"
            onPress={() =>
              this.props.navigation.navigate("Fitnessplan", {
                en: this.state.en,
                url: this.state.url,
              })
            }
          />
          {
            <Button
              title="Login"
              onPress={() =>
                this.props.navigation.navigate("Login", {
                  en: this.state.en,
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

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  contentContainer: {
    backgroundColor: "purple",
  },
  item: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    alignItems: "center",
  },
  marginLeft: {
    marginLeft: 5,
  },
  menu: {
    width: 20,
    height: 2,
    backgroundColor: "#111",
    margin: 2,
    borderRadius: 3,
  },
  text: {
    marginVertical: 30,
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },

  textInput: {
    width: "90%",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 30,
    borderColor: "gray",
    borderBottomWidth: 2,
    fontSize: 16,
  },
  Button: {},
});
