import React, { Component } from "react";
import DropDownPicker from "react-native-dropdown-picker";

import { View, TextInput, ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

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
      fetch(url + "/api/dropdown")
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
          dropDownMaxHeight={300}
          style={{ backgroundColor: "#fafafa" }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          dropDownStyle={{ marginTop: 2 }}
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
          defaultValue={this.state.date}
        />
        <Button title="Edit" onPress={() => this.handleSubmit()}></Button>
      </ScrollView>
    );
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
