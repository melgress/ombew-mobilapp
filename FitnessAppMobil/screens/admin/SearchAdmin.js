import React, { Component } from "react";
import { ScrollView, TextInput, TouchableOpacity, Text } from "react-native";
import { ListItem } from "react-native-elements";
import { styles, buttons } from "../styles";

export default class SearchAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courseList: [],
      search: "",
    };
  }

  componentDidMount() {
    this.loadEvents();
    this.focusListener = this.props.navigation.addListener("focus", () =>
      this.loadEvents()
    );
  }

  componentWillUnmount() {
    this.focusListener();
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

  _deleteEvent(id) {
    const events = this.state.events;
    const url = this.props.route.params.url;
    if (!this.props.route.params.en) {
      fetch(url + "/fitnessevents/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then(() => {
          this.setState({
            courseList: courseList.filter((course) => course.id !== id),
          });
          return;
        })
        .catch((error) => {
          throw error;
        });
      this.loadEvents();
      console.log("Gelöscht");
    } else {
      fetch(url + "/fitnessevents/en/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then(() => {
          this.setState({
            courseList: courseList.filter((course) => course.id !== id),
          });
          return;
        })
        .catch((error) => {
          throw error;
        });
      this.loadEvents();
      console.log("Deleted");
    }
  }

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
                <TouchableOpacity
                  style={buttons.button5}
                  onPress={() => this._deleteEvent(course.id)}
                >
                  <Text>Löschen</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={buttons.button4}
                  onPress={() =>
                    this.props.navigation.navigate("EditCalendar", {
                      id: course.id,
                      name: course.name,
                      date: course.date,
                      en: false,
                      searched: true,
                      url: this.props.route.params.url,
                    })
                  }
                >
                  <Text>Bearbeiten</Text>
                </TouchableOpacity>
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
                <TouchableOpacity
                  style={buttons.button5}
                  onPress={() => this._deleteEvent(course.id)}
                >
                  <Text>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={buttons.button4}
                  onPress={() =>
                    this.props.navigation.navigate("EditCalendar", {
                      id: course.id,
                      name: course.name,
                      date: course.date,
                      en: false,
                      searched: true,
                      url: this.props.route.params.url,
                    })
                  }
                >
                  <Text>Edit</Text>
                </TouchableOpacity>
              </ListItem.Content>
            </ListItem>
          ))}
        </ScrollView>
      );
    }
  }
}
