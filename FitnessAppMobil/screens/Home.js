import React, { Component } from "react";
import { View, Text, AsyncStorage, TouchableOpacity } from "react-native";
import { styles, buttons } from './styles';

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
      url: "http://192.168.0.95:9000/api", // hier die IP des Laptops angeben, mit der der Server läuft
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
        <View style={styles.layout}>
        <Text style={styles.text}>FitMo</Text>
          <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent: "center",}}>
          <TouchableOpacity style={buttons.button2}
            onPress={() => this.setState({ en: true })}
          >
            <Text style={buttons.buttontext}>EN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={buttons.button2}
            onPress={() => this.setState({ en: false })}
          >
            <Text style={buttons.buttontext}>DE</Text>
          </TouchableOpacity>
          </View>
          <TouchableOpacity style={buttons.button1}
            onPress={() =>
              this.props.navigation.navigate("FitnessinfoAdmin", {
                en: this.state.en,
                url: this.state.url,
              })
            }
          >
            <Text style={buttons.buttontext}>Fitnessinfo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={buttons.button1}
            onPress={() =>
              this.props.navigation.navigate("FitnessplanAdmin", {
                en: this.state.en,
                url: this.state.url,
              })
            }
          >
            <Text style={buttons.buttontext}>Fitnessplan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={buttons.button1}
            onPress={() => {
              this.handleLogout();
            }}
          >
            <Text style={buttons.buttontext}>Logout</Text>
          </TouchableOpacity>
        </View>
        
      );
    } else {
      return (
          <View style={styles.layout}>
            <Text style={styles.text}>FitMo</Text>
          <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent: "center",}}>  
          <TouchableOpacity style={buttons.button2}
            onPress={() => this.setState({ en: true })}
          >
            <Text style={buttons.buttontext}>EN</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={buttons.button2}
            onPress={() => this.setState({ en: false })}
          >
            <Text style={buttons.buttontext}>DE</Text>
          </TouchableOpacity>
          </View>
          <TouchableOpacity style={buttons.button1}
            onPress={() =>
              this.props.navigation.navigate("Fitnessinfo", {
                en: this.state.en,
                url: this.state.url,
              })
            }
            >
              <Text style={buttons.buttontext}>Fitnessinfo</Text>
            </TouchableOpacity>
          
          <TouchableOpacity style={buttons.button1}
            onPress={() =>
              this.props.navigation.navigate("Fitnessplan", {
                en: this.state.en,
                url: this.state.url,
              })
            }
          >
            <Text style={buttons.buttontext}>Fitnessplan</Text>
          </TouchableOpacity>
          {
            <TouchableOpacity style={buttons.button1}
              title="Login"
              color = "#ffa600"
              onPress={() =>
                this.props.navigation.navigate("Login", {
                  en: this.state.en,
                  handleLogin: this.handleLogin.bind(this),
                  handleLogout: this.handleLogout.bind(this),
                  onChangeUsername: this.onChangeUsername.bind(this),
                  onChangePassword: this.onChangePassword.bind(this),
                })
              }
              >
                <Text style={buttons.buttontext}>Login</Text>
              </TouchableOpacity>
          }
        </View>
      );
    }
  }
}
