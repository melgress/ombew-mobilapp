import React, { Component } from "react";

import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { styles, buttons } from "../../assets/styles";

export default class AddCourse extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      name: "",
      price: "",
      description: "",
    };
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
      fetch(url + "/addCourse", {
        method: "POST",
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
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
      this.props.navigation.goBack("FitnessinfoAdmin");
    } else {
      fetch(url + "/addCourse/en", {
        method: "POST",
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
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
      this.props.navigation.goBack("FitnessinfoAdmin");
    }
  }

  render() {
    if (!this.props.route.params.en) {
      return (
        <View style={styles.layout}>
          <Text style={styles.text2}>Kurs hinzufügen</Text>
          <TextInput
            style={styles.textInput2}
            placeholder="Name"
            onChangeText={(text) => this.onChangeName(text)}
          />
          <TextInput
            style={styles.textInput2}
            placeholder="Preis"
            onChangeText={(text) => this.onChangePrice(text)}
          />
          <TextInput
            style={styles.textInput2}
            placeholder="Beschreibung"
            onChangeText={(text) => this.onChangeDescription(text)}
          />
          <TouchableOpacity
            style={buttons.button1}
            onPress={() => this.handleSubmit()}
          >
            <Text style={buttons.buttontext}>Hinzufügen</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.layout}>
          <Text style={styles.text2}>Add a course</Text>
          <TextInput
            style={styles.textInput2}
            placeholder="name"
            onChangeText={(text) => this.onChangeName(text)}
          />
          <TextInput
            style={styles.textInput2}
            placeholder="price"
            onChangeText={(text) => this.onChangePrice(text)}
          />
          <TextInput
            style={styles.textInput2}
            placeholder="description"
            onChangeText={(text) => this.onChangeDescription(text)}
          />
          <TouchableOpacity
            style={buttons.button1}
            onPress={() => this.handleSubmit()}
          >
            <Text style={buttons.buttontext}>Add</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}
