import React, { Component } from "react";
import { View, TextInput, AsyncStorage } from "react-native";
//import credentials from "./data/credentials.json";
import { Button } from "react-native-elements";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: this.props.route.params.isLoggedIn,
    };
  }
  componentDidMount() {}

  render() {
    return (
      <View>
        <TextInput
          //style={styles.inputForm}
          onChangeText={(text) =>
            this.props.route.params.onChangeUsername(text)
          }
          placeholder="Username"
          value={this.state.username}
        />
        <TextInput
          //style={styles.inputForm}
          secureTextEntry={true}
          onChangeText={(text) =>
            this.props.route.params.onChangePassword(text)
          }
          placeholder="Passwort"
        />
        <Button
          title="Login"
          onPress={() => {
            this.props.route.params.handleLogin();
            //this.props.navigation.navigate("Home");
          }}
        />
        <Button
          title="Logout"
          onPress={() => this.props.route.params.handleLogout()}
        />
      </View>
    );
  }
}

export default Login;
