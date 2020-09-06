import React, { Component } from "react";
import DropDownPicker from "react-native-dropdown-picker";

import { View, TextInput, ScrollView } from "react-native";
import { Button } from "react-native-elements";

//import courseList from "./data/courses.json";

class AddToCalendar extends Component {
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
    // fetch("http://192.168.0.176:9000/api/fitness")
    //fetch("http://192.168.178.23:9000/api/fitness")
    fetch("http://192.168.178.23:9000/api/dropdown")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ items: data });
      });
  }

  onChangeDate = (text) => {
    this.setState({
      date: text,
    });
  };

  handleSubmit() {
    fetch("http://192.168.178.23:9000/api/addFitnessEvent", {
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

  render() {
    const item = (
      <View>
        {this.state.items.map((item) => (
          <View key={item.value}></View>
        ))}
      </View>
    );
    return (
      <ScrollView>
        <DropDownPicker
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
          //defaultValue={this.state.countries}
          containerStyle={{ height: 40 }}
          style={{ backgroundColor: "#fafafa" }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          onChangeItem={(item) =>
            this.setState({
              name: item.value,
            })
          }
        />
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            width: 300,
          }}
          onChangeText={(text) => this.onChangeDate(text)}
          placeholder="2020-09-04"
        />
        <Button title="Add" onPress={() => this.handleSubmit()}></Button>
      </ScrollView>
    );
  }
}

export default AddToCalendar;
