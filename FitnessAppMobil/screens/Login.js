import React, { Component } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { styles, buttons } from "../assets/styles";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {}

  render() {
    if (!this.props.route.params.en) {
      return (
        <View style={styles.layout}>
          <TextInput
            style={styles.textInput2}
            //style={styles.inputForm}
            onChangeText={(text) =>
              this.props.route.params.onChangeUsername(text)
            }
            placeholder="Benutzername"
            value={this.state.username}
          />
          <TextInput
            style={styles.textInput2}
            //style={styles.inputForm}
            secureTextEntry={true}
            onChangeText={(text) =>
              this.props.route.params.onChangePassword(text)
            }
            placeholder="Passwort"
          />
          <TouchableOpacity
            style={buttons.button1}
            onPress={() => {
              this.props.route.params.handleLogin();
              //this.props.navigation.navigate("Home");
            }}
          >
            <Text style={buttons.buttontext}>Login</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.layout}>
          <TextInput
            style={styles.textInput2}
            //style={styles.inputForm}
            onChangeText={(text) =>
              this.props.route.params.onChangeUsername(text)
            }
            placeholder="Username"
            value={this.state.username}
          />
          <TextInput
            style={styles.textInput2}
            //style={styles.inputForm}
            secureTextEntry={true}
            onChangeText={(text) =>
              this.props.route.params.onChangePassword(text)
            }
            placeholder="Password"
          />
          <TouchableOpacity
            style={buttons.button1}
            onPress={() => {
              this.props.route.params.handleLogin();
              //this.props.navigation.navigate("Home");
            }}
          >
            <Text style={buttons.buttontext}>Login</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}
