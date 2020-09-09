import React, { Component } from "react";
import { StyleSheet, ScrollView, TextInput } from "react-native";
import { ListItem } from "react-native-elements";

export default class Fitnessinfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courseList: [],
      search: "",
    };
  }

  componentDidMount() {
    this.loadCourses();
  }
  loadCourses() {
    const url = this.props.route.params.url;
    if (!this.props.route.params.en) {
      fetch(url + "/fitness")
        .then((response) => response.json())
        .then((data) => {
          this.setState({ courseList: data });
        })
        .catch((error) => {
          throw error;
        });
    } else {
      fetch(url + "/fitness/en")
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
      this.loadCourses();
    }
  };

  render() {
    const courseList = this.state.courseList;

    if (this.props.route.params.en == false) {
      return (
        <ScrollView>
          <TextInput
            style={{ borderWidth: 1 }}
            placeholder="Nach Kurs suchen..."
            onChangeText={(text) => {
              this.handleSearch(text);
            }}
          />
          {courseList.map((course) => (
            <ListItem key={course.id} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{"Name"}</ListItem.Title>
                <ListItem.Subtitle>{course.name}</ListItem.Subtitle>
                <ListItem.Title>{"Preis"}</ListItem.Title>
                <ListItem.Subtitle>{course.price}</ListItem.Subtitle>
                <ListItem.Title>{"Beschreibung"}</ListItem.Title>
                <ListItem.Subtitle>{course.description}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
        </ScrollView>
      );
    } else {
      return (
        <ScrollView>
          <TextInput
            style={{ borderWidth: 1 }}
            placeholder="Search for a course..."
            onChangeText={(text) => {
              this.handleSearch(text);
            }}
          />
          {courseList.map((course) => (
            <ListItem key={course.id} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{"Name"}</ListItem.Title>
                <ListItem.Subtitle>{course.name}</ListItem.Subtitle>
                <ListItem.Title>{"Price"}</ListItem.Title>
                <ListItem.Subtitle>{course.price}</ListItem.Subtitle>
                <ListItem.Title>{"Description"}</ListItem.Title>
                <ListItem.Subtitle>{course.description}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
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
    backgroundColor: "white",
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
});
