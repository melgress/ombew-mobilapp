import React, { Component } from "react";
import {
  View,
  Text,
  ListView,
  StyleSheet,
  FlatList,
  Section,
  TextInput,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import { ListItem, Button } from "react-native-elements";

//import courseList from "./data/courses.json";

class FitnessinfoAdmin extends Component {
  constructor(props) {
    super(props);

    this._deleteCourse = this._deleteCourse.bind(this);
    this.state = {
      tableHead: ["Name", "Preis", "Beschreibung"],
      courseList: [],
      isModalVisible: false,
    };
  }

  componentDidMount() {
    // fetch("http://192.168.0.176:9000/api/fitness")
    //fetch("http://192.168.178.23:9000/api/fitness")
    fetch("http://192.168.178.23:9000/api/fitness")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ courseList: data });
      })
      .catch((error) => {
        throw error;
      });
    this.props.navigation.addListener("focus", () => {
      fetch("http://192.168.178.23:9000/api/fitness")
        .then((response) => response.json())
        .then((data) => {
          this.setState({ courseList: data });
        })
        .catch((error) => {
          throw error;
        });
    });
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  _addCourse() {
    console.log("Added");
  }
  _deleteCourse(id) {
    const { courseList } = this.state;
    fetch("http://192.168.178.23:9000/api/fitness/" + id, {
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
  _editCourse() {
    console.log("Edited");
  }

  render() {
    const courseList = this.state.courseList;

    return (
      <ScrollView>
        <Button
          title="Add"
          onPress={() => this.props.navigation.navigate("AddCourse")}
        ></Button>
        {courseList.map((course) => (
          <ListItem key={course.id} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{"Name"}</ListItem.Title>
              <ListItem.Subtitle>{course.name}</ListItem.Subtitle>
              <ListItem.Title>{"Preis"}</ListItem.Title>
              <ListItem.Subtitle>{course.price}</ListItem.Subtitle>
              <ListItem.Title>{"Beschreibung"}</ListItem.Title>
              <ListItem.Subtitle>{course.description}</ListItem.Subtitle>
              <Button
                title="Delete"
                onPress={() => this._deleteCourse(course.id)}
              ></Button>
              <Button
                title="Edit"
                onPress={() =>
                  this.props.navigation.navigate("EditCourse", {
                    id: course.id,
                  })
                }
              ></Button>
            </ListItem.Content>
          </ListItem>
        ))}
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
  text1: {
    textAlign: "left",
    marginVertical: 30,
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    // marginLeft: "auto",
  },
  text2: {
    textAlign: "center",
    marginVertical: 30,
    fontSize: 20,
    fontWeight: "bold",
    color: "blue",
    marginLeft: "auto",
  },
  text3: {
    textAlign: "right",
    marginVertical: 30,
    fontSize: 20,
    fontWeight: "bold",
    color: "orange",
    marginLeft: "auto",
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
  modalView: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  touchableHighlight: {
    backgroundColor: "white",
    marginVertical: 10,
    alignSelf: "stretch",
    alignItems: "center",
  },
});

export default FitnessinfoAdmin;

/*
{this.state.courseList.map((fitness) => (
                <tr key={fitness.id}>
                  <td>{fitness.name} </td>
                  <td>{fitness.price}</td>
                  <td>{fitness.description}</td>
                </tr>
                */
