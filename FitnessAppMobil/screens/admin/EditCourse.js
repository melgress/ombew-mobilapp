import React, { Component } from "react";

import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles, buttons } from "../styles";

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
        <View style={styles.layout}>
          <Text style={styles.text2}>Kurs bearbeiten</Text>
          <TextInput
            style={styles.textInput2}
            onChangeText={(text) => this.onChangeName(text)}
            defaultValue={this.state.name}
          />
          <TextInput
            style={styles.textInput2}
            onChangeText={(text) => this.onChangePrice(text)}
            defaultValue={this.state.price}
          />
          <TextInput
            style={styles.textInput2}
            onChangeText={(text) => this.onChangeDescription(text)}
            defaultValue={this.state.description}
          />
          <TouchableOpacity
            style={buttons.button1}
            onPress={() => this.handleSubmit()}
          >
            <Text style={buttons.buttontext}>Bearbeiten</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.layout}>
          <Text style={styles.text2}>Edit a course</Text>
          <TextInput
            style={styles.textInput2}
            onChangeText={(text) => this.onChangeName(text)}
            defaultValue={this.state.name}
          />
          <TextInput
            style={styles.textInput2}
            onChangeText={(text) => this.onChangePrice(text)}
            defaultValue={this.state.price}
          />
          <TextInput
            style={styles.textInput2}
            onChangeText={(text) => this.onChangeDescription(text)}
            defaultValue={this.state.description}
          />
          <TouchableOpacity
            style={buttons.button1}
            onPress={() => this.handleSubmit()}
          >
            <Text style={buttons.buttontext}>Edit</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}
