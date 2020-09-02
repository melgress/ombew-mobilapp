import React, { Component } from "react";

import { View, Text, TextInput, Button } from "react-native";

export default class EditCourse extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      courseList: {
        id: null,
        name: "",
        price: "",
        description: "",
        submitted: false,
      },
    };
  }

  componentDidMount() {}
  onChangeDate(e) {
    this.setState({
      date: e.target.value,
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

  //ToDo id in die URL bekommen
  handleSubmit() {
    //id = this.props.route.params.course.id;
    fetch(
      "http://192.168.178.23:9000/api/fitness/" + this.props.route.params.id,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: this.state.date,
          name: this.state.name,
          price: this.state.price,
          description: this.state.description,
        }),
      }
    )
      .then((res) => res.json())
      .catch((error) => {
        throw error;
      });
    this.props.navigation.goBack("Fitnessinfo");
    console.log("Edited");
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Edit Screen</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            width: 300,
          }}
          onChangeText={(text) => this.onChangeName(text)}
          //value={value}
        />
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            width: 300,
          }}
          onChangeText={(text) => this.onChangePrice(text)}
          //value={value}
        />
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            width: 300,
          }}
          onChangeText={(text) => this.onChangeDescription(text)}
          //value={value}
        />
        <Button title="Edit" onPress={() => this.handleSubmit()}></Button>
      </View>
    );
  }
}

//export default Home;
