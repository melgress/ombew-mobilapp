import React, { Component } from "react";
import DropDownPicker from "react-native-dropdown-picker";

import { TextInput, Text, View, TouchableOpacity } from "react-native";
import { styles, buttons } from '../styles';

export default class EditCalendar extends Component {
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
      this.setState({
        date: this.props.route.params.date,
      });
    } else {
      fetch(url + "/dropdown/en")
        .then((response) => response.json())
        .then((data) => {
          this.setState({ items: data });
        });
      this.setState({
        date: this.props.route.params.date,
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
      fetch(url + "/fitnessevent/" + this.props.route.params.id, {
        method: "PUT",
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
        .catch((error) => {
          throw error;
        });
      this.props.navigation.goBack("FitnessplanAdmin");
      console.log("Bearbeitet");
    } else {
      fetch(url + "/fitnessevent/en/" + this.props.route.params.id, {
        method: "PUT",
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
        .catch((error) => {
          throw error;
        });
      this.props.navigation.goBack("FitnessplanAdmin");
      console.log("Edited");
    }
  }

  render() {
    if (!this.props.route.params.en) {
    return (
      <View style={styles.layout}>
        <DropDownPicker style={styles.dropdown}
          placeholder="Wähle einen Kurs aus"
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
          defaultValue={this.state.date}
        />
        <TouchableOpacity style={buttons.button1}
         onPress={() => this.handleSubmit()}>
          <Text style={buttons.buttontext}>Bearbeiten</Text>
        </TouchableOpacity>
       </View>
       );
      } else {
        return (
          <View style={styles.layout}>
        <DropDownPicker style={styles.dropdown}
          placeholder="Select a course"
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
          defaultValue={this.state.date}
        />
       <TouchableOpacity style={buttons.button1}
         onPress={() => this.handleSubmit()}>
          <Text style={buttons.buttontext}>Edit</Text>
        </TouchableOpacity>
       </View>
       );
  }
}
}
