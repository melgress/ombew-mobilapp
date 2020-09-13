import React, { Component } from "react";
import DropDownPicker from "react-native-dropdown-picker";

import { TextInput, Text, View, TouchableOpacity } from "react-native";
import { styles, buttons } from "../../assets/styles";

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
    this.setState({
      date: this.props.route.params.date,
    });

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
            return { label: course.name, value: course.name };
          });
          this.setState({
            items: coursesFromApi,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    console.log(this.state.defaultitem);
  }
  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
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
      if (!this.props.route.params.searched) {
        this.props.navigation.goBack("FitnessplanAdmin");
      } else {
        this.props.navigation.goBack("SearchAdmin");
      }
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
      if (!this.props.route.params.searched) {
        this.props.navigation.goBack("FitnessplanAdmin");
      } else {
        this.props.navigation.goBack("SearchAdmin");
      }
      console.log("Edited");
    }
  }

  render() {
    console.log(this.state.defaultitem);
    //this.controller.selectItem("tennis");
    if (!this.props.route.params.en) {
      return (
        <View style={styles.layout}>
          <DropDownPicker
            items={this.state.items}
            // defaultValue={this.state.defaultitem}
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
            defaultValue={this.state.date}
          />
          <TouchableOpacity
            style={buttons.buttonDropdown}
            onPress={() => this.handleSubmit()}
          >
            <Text style={buttons.buttontext}>Bearbeiten</Text>
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
            defaultValue={this.state.date}
          />
          <TouchableOpacity
            style={buttons.buttonDropdown}
            onPress={() => this.handleSubmit()}
          >
            <Text style={buttons.buttontext}>Edit</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}
