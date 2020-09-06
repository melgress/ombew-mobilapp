import React, { Component } from "react";

import { StyleSheet, View, Text, Button } from "react-native";
import { Agenda } from "react-native-calendars";
import { SearchBar } from "react-native-elements";

export default class FitnessplanAdmin extends Component {
  constructor(props) {
    super(props);
    this._deleteEvent = this._deleteEvent.bind(this);
    this.loadEvents = this.loadEvents.bind(this);
    this.state = {
      events: [],
      eventsFormatted: {},
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
  updateSearch = (text) => {
    this.setState({
      search: text,
    });
  };
  filterCalendar = () => {
    const events = this.state.events;
    const search = this.state.search;
    this.setState({
      events: events.filter((event) => event.name == search),
    });
    return this.state.events;
    console.log(this.state.events);
    console.log(this.state.search);
  };

  loadEvents = (day) => {
    //Charge les items du mois
    fetch("http://192.168.178.23:9000/api/fitnessevents")
      .then((response) => response.json())
      .then((events) => {
        console.log(`events: ${JSON.stringify(events)}`);
        return events;
      })
      .then((events) => {
        var eventsFormatted = {};
        if (events.length) {
          events.map((event) => {
            let day = event.date; //.toDate().toISOString().split("T")[0]; // Format to YYYY-MM-DD
            if (eventsFormatted[day]) {
              eventsFormatted[day].push(event);
            } else {
              eventsFormatted[day] = [event];
            }
          });
          this.setState({
            eventsFormatted: eventsFormatted,
          });
          console.log(`eventsFormatted: ${JSON.stringify(eventsFormatted)}`);
        }
      });
  };

  //to do: delete by unique id
  _deleteEvent(id) {
    const { eventsFormatted } = this.state;
    const events = this.state;
    fetch("http://192.168.178.23:9000/api/fitnessevents/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        this.setState({
          events: events.filter((event) => event.id !== id),
          // eventsFormatted: eventsFormatted.ke
        });
        return;
      })
      .catch((error) => {
        throw error;
      });
    this.forceUpdate();
    console.log("Deleted");
  }

  renderItem(item) {
    // console.log(item.name);
    return (
      <View>
        <Text>{item.name}</Text>
        <Button
          title="Edit"
          onPress={() =>
            this.props.navigation.navigate("EditCalendar", {
              id: item.id,
              name: item.name,
              date: item.date,
            })
          }
        ></Button>
        <Button
          title="Delete"
          onPress={() => this._deleteEvent(item.id)}
        ></Button>
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View>
        <Text>This is empty date!</Text>
      </View>
    );
  }
  /* renderDay() {
    return (
      <View>
        <Button title="Add"></Button>
      </View>
    );
  }*/

  render() {
    const eventsFormatted = this.state.eventsFormatted;
    const { search } = this.state.search;

    return (
      <View style={{ flex: 1, backgroundColor: "white", paddingBottom: 30 }}>
        <Button
          title="Add"
          onPress={() => this.props.navigation.navigate("AddToCalendar")}
        ></Button>
        <Agenda
          //style={styles.contentContainer}
          selected={"2020-09-04"}
          items={eventsFormatted}
          loadItemsForMonth={this.loadEvents}
          renderItem={this.renderItem.bind(this)}
          // renderDay={this.renderDay.bind(this)}
          renderEmptyData={() => null}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          //loadEvents={(day) => this.loadEvents(day)}
          events={this.state.eventsFormatted}
          onPressEvent={(event) =>
            this.props.navigation.navigate("Fitnessinfo", { event })
          }
        />
      </View>
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
/*
  <SearchBar
          placeholder="Type Here..."
          onChangeText={(text) => {
            this.updateSearch(text);
          }}
          value={search}
        />
         <Button title="Search" onPress={() => this.filterCalendar()}></Button>
*/
