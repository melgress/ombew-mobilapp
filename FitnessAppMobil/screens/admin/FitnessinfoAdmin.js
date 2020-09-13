import React, { Component } from "react";
import { View, ScrollView, TextInput, TouchableOpacity,Text } from "react-native";
import { ListItem, Button } from "react-native-elements";
import { styles, buttons } from "../styles";

export default class FitnessinfoAdmin extends Component {
  constructor(props) {
    super(props);

    this._deleteCourse = this._deleteCourse.bind(this);
    this.state = {
      courseList: [],
      search: "",
      en: Boolean,
    };
  }

  componentDidMount() {
    this.setState({
      en: this.props.route.params.en,
    });
    console.log(this.state.en);
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
      this.props.navigation.addListener("focus", () => {
        fetch(url + "/fitness")
          .then((response) => response.json())
          .then((data) => {
            this.setState({ courseList: data });
          })
          .catch((error) => {
            throw error;
          });
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
      this.props.navigation.addListener("focus", () => {
        fetch(url + "/fitness/en")
          .then((response) => response.json())
          .then((data) => {
            this.setState({ courseList: data });
          })
          .catch((error) => {
            throw error;
          });
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

  _deleteCourse(id) {
    const { courseList } = this.state;
    const url = this.props.route.params.url;
    if (!this.props.route.params.en) {
      fetch(url + "/fitness/" + id, {
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

      console.log("Deleted");
    } else {
      fetch(url + "/fitness/en/" + id, {
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

      console.log("Deleted");
    }
  }

  render() {
    const courseList = this.state.courseList;

    if (!this.props.route.params.en) {
      return (
        <ScrollView style={styles.scrollView}>
          <TextInput style={styles.textInput}
            placeholder="Nach Kurs suchen..."
            onChangeText={(text) => {
              this.handleSearch(text);
            }}
          />
          <TouchableOpacity style={buttons.button3}
            onPress={() =>
              this.props.navigation.navigate("AddCourse", {
                en: this.props.route.params.en,
                url: this.props.route.params.url,
              })
            }
          >
              <Text style={buttons.buttontext}>Kurs hinzufügen</Text>
          </TouchableOpacity>
          {courseList.map((course) => (
            <ListItem key={course.id} bottomDivider >
              <ListItem.Content style={styles.listitem}>
                <ListItem.Title>{"Name"}</ListItem.Title>
                <ListItem.Subtitle>{course.name}</ListItem.Subtitle>
                <ListItem.Title>{"Preis"}</ListItem.Title>
                <ListItem.Subtitle>{course.price}</ListItem.Subtitle>
                <ListItem.Title>{"Beschreibung"}</ListItem.Title>
                <ListItem.Subtitle>{course.description}</ListItem.Subtitle>
                <TouchableOpacity style={buttons.button5}
                  onPress={() => this._deleteCourse(course.id)}
                >
                  <Text>Löschen</Text>
                </TouchableOpacity>
                <TouchableOpacity style={buttons.button4}
                  onPress={() =>
                    this.props.navigation.navigate("EditCourse", {
                      id: course.id,
                      name: course.name,
                      price: course.price,
                      description: course.description,
                      en: false,
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
        <ScrollView style={styles.scrollView}>
          <TextInput style={styles.textInput}
            placeholder="Search for a course..."
            onChangeText={(text) => {
              this.handleSearch(text);
            }}
          />
          <TouchableOpacity style={buttons.button3}
            onPress={() =>
              this.props.navigation.navigate("AddCourse", {
                en: this.props.route.params.en,
                url: this.props.route.params.url,
              })
            }
          >
            <Text style={buttons.buttontext}>Add Course</Text>
          </TouchableOpacity>
          
          {courseList.map((course) => (
            <ListItem key={course.id} bottomDivider>
              <ListItem.Content style={styles.listitem}>
                <ListItem.Title>{"Name"}</ListItem.Title>
                <ListItem.Subtitle>{course.name}</ListItem.Subtitle>
                <ListItem.Title>{"Price"}</ListItem.Title>
                <ListItem.Subtitle>{course.price}</ListItem.Subtitle>
                <ListItem.Title>{"Description"}</ListItem.Title>
                <ListItem.Subtitle>{course.description}</ListItem.Subtitle>
                <TouchableOpacity style={buttons.button5}
                  onPress={() => this._deleteCourse(course.id)}
                >
                  <Text style={buttons.buttontext}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={buttons.button4}
                  onPress={() =>
                    this.props.navigation.navigate("EditCourse", {
                      id: course.id,
                      name: course.name,
                      price: course.price,
                      description: course.description,
                      en: true,
                      url: this.props.route.params.url,
                    })
                  }
                >
                  <Text style={buttons.buttontext}>Edit</Text>
                </TouchableOpacity>
              </ListItem.Content>
            </ListItem>
          ))}
          
        </ScrollView>
      );
    }
  }
}
