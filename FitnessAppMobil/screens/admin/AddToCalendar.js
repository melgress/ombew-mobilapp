import React, { Component } from "react";
import DropDownPicker from "react-native-dropdown-picker";

import { TouchableOpacity, TextInput, View, Text } from "react-native";
import { styles, buttons } from "../../assets/styles";

export default class AddToCalendar extends Component {
  constructor(props) {
    super(props);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.state = {
      items: [],
      name: "",
      date: "",
    };
    this.controller;
  }
  componentDidMount() {
    const url = this.props.route.params.url;
    if (!this.props.route.params.en) {
      fetch(url + "/fitness")
        .then((response) => response.json())
        .then((data) => {
          let coursesFromApi = data.map((course) => {
            return { value: course.name, label: course.name };
          });
          this.setState({
            items: coursesFromApi,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      fetch(url + "/fitness/en")
        .then((response) => response.json())
        .then((data) => {
          let coursesFromApi = data.map((course) => {
            return { value: course.name, label: course.name };
          });
          this.setState({
            items: coursesFromApi,
          });
        })
        .catch((error) => {
          console.log(error);
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
          <DropDownPicker
            items={this.state.items}
            style={{
              backgroundColor: "#f5dda9",
              borderColor: "black",
            }}
            itemStyle={{
              justifyContent: "flex-start",
            }}
            dropDownStyle={{ backgroundColor: "#f5dda9" }}
            containerStyle={{ height: 40 }}
            placeholder="Wähle einen Kurs"
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
          <TextInput
            style={styles.textInput3}
            onChangeText={(text) => this.onChangeDate(text)}
            placeholder="2020-09-04"
          />
          <TouchableOpacity
            style={buttons.buttonDropdown}
            onPress={() => this.handleSubmit()}
          >
            <Text style={buttons.buttontext}>Hinzufügen</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.layout}>
          <DropDownPicker
            items={this.state.items}
            style={{
              backgroundColor: "#f5dda9",
              borderColor: "black",
            }}
            itemStyle={{
              justifyContent: "flex-start",
            }}
            dropDownStyle={{ backgroundColor: "#f5dda9" }}
            containerStyle={{ height: 40 }}
            placeholder="Select a course"
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
          <TextInput
            style={styles.textInput3}
            onChangeText={(text) => this.onChangeDate(text)}
            placeholder="2020-09-04"
          />
          <TouchableOpacity
            style={buttons.buttonDropdown}
            onPress={() => this.handleSubmit()}
          >
            <Text style={buttons.buttontext}>Add</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}
