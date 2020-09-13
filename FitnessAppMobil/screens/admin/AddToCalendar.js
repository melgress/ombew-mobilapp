import React, { Component } from "react";
import DropDownPicker from "react-native-dropdown-picker";

import { TouchableOpacity, TextInput, View, Text } from "react-native";
import { styles, buttons } from '../styles';

export default class AddToCalendar extends Component {
  constructor(props) {
    super(props);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.state = {
      items: [],
      item: "",
      name: "",
      date: "",
    };
    this.controller;
  }
  componentDidMount() {
    const url = this.props.route.params.url;
    if (!this.props.route.params.en) {
      fetch(url + "/dropdown")
        .then((response) => response.json())
        .then((data) => {
          this.setState({ items: data });
        });
    } else {
      fetch(url + "/dropdown/en")
        .then((response) => response.json())
        .then((data) => {
          this.setState({ items: data });
        });
    }
  }

  onChangeDate = (text) => {
    this.setState({
      date: text,
    });
  };

  handleSubmit() {
    const url = this.props.route.params.url;
    if (!this.props.route.params.en) {
      fetch(url + "/addFitnessEvent", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: this.state.date,
          name: this.state.name,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
      this.props.navigation.goBack("FitnessplanAdmin");
    } else {
      fetch(url + "/addFitnessEvent/en", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: this.state.date,
          name: this.state.name,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
      this.props.navigation.goBack("FitnessplanAdmin");
    }
  }

  render() {
    if (!this.props.route.params.en) {
      return (
        <View style={styles.layout}>
          <DropDownPicker style={styles.dropdown}
            items={this.state.items}
            controller={(instance) => (this.controller = instance)}
            onChangeList={(items, callback) => {
              this.setState(
                {
                  items: items,
                },
                callback
              );
            }}
            onChangeItem={(item) =>
              this.setState({
                name: item.value,
              })
            }
          />
          <TextInput style={styles.textInput2}
            onChangeText={(text) => this.onChangeDate(text)}
            placeholder="2020-09-04"
          />
          <TouchableOpacity style={buttons.button1}
            onPress={() => this.handleSubmit()}
          >
            <Text style={buttons.buttontext}>Hinzufügen</Text>
          </TouchableOpacity>
          </View>
      );
    } else {
      return (
        <View style={styles.layout}>
          <DropDownPicker style={styles.dropdown}
            items={this.state.items}
            controller={(instance) => (this.controller = instance)}
            onChangeList={(items, callback) => {
              this.setState(
                {
                  items: items,
                },
                callback
              );
            }}
            onChangeItem={(item) =>
              this.setState({
                name: item.value,
              })
            }
          />
          <TextInput style={styles.textInput2}
            onChangeText={(text) => this.onChangeDate(text)}
            placeholder="2020-09-04"
          />
          <TouchableOpacity style={buttons.button1}
          onPress={() => this.handleSubmit()}>
            <Text style={buttons.buttontext}>Add</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

