import React, { Component } from "react";
import { ScrollView, TextInput } from "react-native";
import { ListItem } from "react-native-elements";
import { styles, buttons } from "../assets/styles";

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courseList: [],
      search: "",
    };
  }

  componentDidMount() {
    this.loadEvents();
  }
  loadEvents() {
    const url = this.props.route.params.url;
    if (!this.props.route.params.en) {
      fetch(url + "/fitnessevents")
        .then((response) => response.json())
        .then((data) => {
          this.setState({ courseList: data });
        })
        .catch((error) => {
          throw error;
        });
    } else {
      fetch(url + "/fitnessevents/en")
        .then((response) => response.json())
        .then((data) => {
          this.setState({ courseList: data });
        })
        .catch((error) => {
          throw error;
        });
    }
  }
  handleSearch = (text) => {
    if (text) {
      const newData = this.state.courseList.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        courseList: newData,
        search: text,
      });
    } else {
      this.setState({ search: "" });
      this.loadEvents();
    }
  };

  render() {
    const courseList = this.state.courseList;

    if (!this.props.route.params.en) {
      return (
        <ScrollView>
          <TextInput
            style={styles.textInput}
            placeholder="Nach Kurs suchen..."
            onChangeText={(text) => {
              this.handleSearch(text);
            }}
          />
          {courseList.map((course) => (
            <ListItem key={course.id} bottomDivider>
              <ListItem.Content style={styles.listitem}>
                <ListItem.Title>{"Name"}</ListItem.Title>
                <ListItem.Subtitle>{course.name}</ListItem.Subtitle>
                <ListItem.Title>{"Datum"}</ListItem.Title>
                <ListItem.Subtitle>{course.date}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
        </ScrollView>
      );
    } else {
      return (
        <ScrollView>
          <TextInput
            style={styles.textInput}
            placeholder="Search for a course..."
            onChangeText={(text) => {
              this.handleSearch(text);
            }}
          />
          {courseList.map((course) => (
            <ListItem key={course.id} bottomDivider>
              <ListItem.Content style={styles.listitem}>
                <ListItem.Title>{"Name"}</ListItem.Title>
                <ListItem.Subtitle>{course.name}</ListItem.Subtitle>
                <ListItem.Title>{"Date"}</ListItem.Title>
                <ListItem.Subtitle>{course.date}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
        </ScrollView>
      );
    }
  }
}
