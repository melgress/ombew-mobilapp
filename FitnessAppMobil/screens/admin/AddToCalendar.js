import React, { Component } from "react";
import DropDownPicker from "react-native-dropdown-picker";

import { View, TextInput, ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

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
          <Button
            title="Hinzufügen"
            onPress={() => this.handleSubmit()}
          ></Button>
        </ScrollView>
      );
    } else {
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
