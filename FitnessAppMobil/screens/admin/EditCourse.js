import React, { Component } from "react";

import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default class EditCourse extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      courseList: {
        name: this.props.route.params.name,
        price: this.props.route.params.price,
        description: this.props.route.params.description,
      },
    };
  }

  componentDidMount() {
    console.log(this.props.route.params.en);
    this.setState({
      name: this.props.route.params.name,
    });
    this.setState({
      price: this.props.route.params.price.toString(),
    });
    this.setState({
      description: this.props.route.params.description,
    });
  }

  onChangeName = (text) => {
    this.setState({
      name: text,
    });
  };
  onChangePrice = (text) => {
    this.setState({
      price: text,
    });
  };
  onChangeDescription = (text) => {
    this.setState({
      description: text,
    });
  };

  handleSubmit() {
    const url = this.props.route.params.url;
    if (!this.props.route.params.en) {
      fetch(url + "/fitness/" + this.props.route.params.id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.state.name,
          price: this.state.price,
          description: this.state.description,
        }),
      })
        .then((res) => res.json())
        .catch((error) => {
          throw error;
        });
      this.props.navigation.goBack("FitnessinfoAdmin");
      console.log("Bearbeitet");
    } else {
      fetch(url + "/fitness/en/" + this.props.route.params.id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.state.name,
          price: this.state.price,
          description: this.state.description,
        }),
      })
        .then((res) => res.json())
        .catch((error) => {
          throw error;
        });
      this.props.navigation.goBack("FitnessinfoAdmin");
      console.log("Edited");
    }
  }

  render() {
    if (!this.props.route.params.en) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Kurs bearbeiten</Text>
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              width: 300,
            }}
            onChangeText={(text) => this.onChangeName(text)}
            defaultValue={this.state.name}
          />
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              width: 300,
            }}
            onChangeText={(text) => this.onChangePrice(text)}
            defaultValue={this.state.price}
          />
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              width: 300,
            }}
            onChangeText={(text) => this.onChangeDescription(text)}
            defaultValue={this.state.description}
          />
          <Button
            title="Bearbeiten"
            onPress={() => this.handleSubmit()}
          ></Button>
        </View>
      );
    } else {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Edit a course</Text>
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              width: 300,
            }}
            onChangeText={(text) => this.onChangeName(text)}
            defaultValue={this.state.name}
          />
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              width: 300,
            }}
            onChangeText={(text) => this.onChangePrice(text)}
            defaultValue={this.state.price}
          />
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              width: 300,
            }}
            onChangeText={(text) => this.onChangeDescription(text)}
            defaultValue={this.state.description}
          />
          <Button title="Edit" onPress={() => this.handleSubmit()}></Button>
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
