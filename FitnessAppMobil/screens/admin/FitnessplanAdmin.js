import React, { Component } from "react";

import { StyleSheet, View, Text, Button, TextInput } from "react-native";
import { Agenda } from "react-native-calendars";

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

  loadEvents = (day) => {
    const url = this.props.route.params.url;
    if (!this.props.route.params.en) {
      fetch(url + "/fitnessevents")
        .then((response) => response.json())
        .then((events) => {
          //console.log(`events: ${JSON.stringify(events)}`);
          return events;
        })
        .then((events) => {
          this.setState({ events: events });
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
            // console.log(`eventsFormatted: ${JSON.stringify(eventsFormatted)}`);
          }
        });
    } else {
      fetch(url + "/fitnessevents/en")
        .then((response) => response.json())
        .then((events) => {
          //console.log(`events: ${JSON.stringify(events)}`);
          return events;
        })
        .then((events) => {
          this.setState({ events: events });
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
            // console.log(`eventsFormatted: ${JSON.stringify(eventsFormatted)}`);
          }
        });
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
            events: events.filter((event) => event.id !== id),
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
            events: events.filter((event) => event.id !== id),
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

  handleSearch = (text) => {
    if (text) {
      const newData = this.state.events.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        events: newData,
        search: text,
      });
      var eventsFormatted = {};
      if (this.state.events.length) {
        this.state.events.map((event) => {
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
      }
    } else {
      this.setState({ search: "" });
      this.loadEvents();
    }
  };

  renderItem(item) {
    // console.log(item.name);
    if (!this.props.route.params.en) {
      return (
        <View>
          <Text>{item.name}</Text>
          <Button
            title="Bearbeiten"
            onPress={() =>
              this.props.navigation.navigate("EditCalendar", {
                id: item.id,
                name: item.name,
                date: item.date,
              })
            }
          ></Button>
          <Button
            title="Löschen"
            onPress={() => this._deleteEvent(item.id)}
          ></Button>
        </View>
      );
    } else {
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
                url: this.props.route.params.url,
                en: this.props.route.params.en,
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
  }

  renderEmptyDate() {
    return (
      <View>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  render() {
    const eventsFormatted = this.state.eventsFormatted;
    if (!this.props.route.params.en) {
      return (
        <View style={{ flex: 1, backgroundColor: "white", paddingBottom: 30 }}>
          <TextInput
            style={{ borderWidth: 1 }}
            placeholder="Nach Kurs suchen..."
            autoCorrect={false}
            onChangeText={(text) => {
              this.handleSearch(text);
            }}
            value={this.state.search}
          />
          <Button
            title="Kurs zum Kalendar hinzufügen"
            onPress={() =>
              this.props.navigation.navigate("AddToCalendar", {
                en: this.props.route.params.en,
                url: this.props.route.params.url,
              })
            }
          ></Button>
          <Agenda
            //style={styles.contentContainer}
            items={eventsFormatted}
            loadItemsForMonth={this.loadEvents.bind(this)}
            renderItem={this.renderItem.bind(this)}
            renderEmptyData={() => null}
            renderEmptyDate={this.renderEmptyDate.bind(this)}
            events={this.state.eventsFormatted}
          />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: "white", paddingBottom: 30 }}>
          <TextInput
            style={{ borderWidth: 1 }}
            placeholder="Search for a course..."
            autoCorrect={false}
            onChangeText={(text) => {
              this.handleSearch(text);
            }}
            value={this.state.search}
          />
          <Button
            title="Add course to calendar"
            onPress={() =>
              this.props.navigation.navigate("AddToCalendar", {
                en: this.props.route.params.en,
                url: this.props.route.params.url,
              })
            }
          ></Button>
          <Agenda
            //style={styles.contentContainer}
            items={eventsFormatted}
            loadItemsForMonth={this.loadEvents.bind(this)}
            renderItem={this.renderItem.bind(this)}
            renderEmptyData={() => null}
            renderEmptyDate={this.renderEmptyDate.bind(this)}
            events={this.state.eventsFormatted}
          />
        </View>
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
