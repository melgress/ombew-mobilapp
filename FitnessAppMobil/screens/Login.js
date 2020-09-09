import React, { Component } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {}

  render() {
    if (!this.props.route.params.en) {
      return (
        <View>
          <TextInput
            //style={styles.inputForm}
            onChangeText={(text) =>
              this.props.route.params.onChangeUsername(text)
            }
            placeholder="Benutzername"
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
        </View>
      );
    } else {
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
            placeholder="Password"
          />
          <Button
            title="Login"
            onPress={() => {
              this.props.route.params.handleLogin();
              //this.props.navigation.navigate("Home");
            }}
          />
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
