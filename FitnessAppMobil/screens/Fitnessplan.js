import React, { Component } from "react";

import { StyleSheet, View, Text, TextInput } from "react-native";
import { Agenda } from "react-native-calendars";

export default class Fitnessplan extends Component {
  constructor(props) {
    super(props);

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

  loadEvents = (day) => {
    const url = this.props.route.params.url;
    if (!this.props.route.params.en) {
      fetch(url + "/fitnessevents")
        .then((response) => response.json())
        .then((events) => {
          // console.log(`events: ${JSON.stringify(events)}`);
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
            // console.log(this.state.events);
          }
        });
    } else {
      fetch(url + "/fitnessevents/en")
        .then((response) => response.json())
        .then((events) => {
          // console.log(`events: ${JSON.stringify(events)}`);
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
            // console.log(this.state.events);
          }
        });
    }
  };

  renderItem(item) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>{item.name}</Text>
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

          <Agenda
            //style={styles.calendar}
            items={eventsFormatted}
            loadItemsForMonth={this.loadEvents}
            renderItem={this.renderItem.bind(this)}
            renderEmptyData={() => null}
            renderEmptyDate={this.renderEmptyDate.bind(this)}
            onDayPress={(day) => {
              console.log("day pressed");
            }}
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

          <Agenda
            //style={styles.calendar}
            items={eventsFormatted}
            loadItemsForMonth={this.loadEvents}
            renderItem={this.renderItem.bind(this)}
            renderEmptyData={() => null}
            renderEmptyDate={this.renderEmptyDate.bind(this)}
            onDayPress={(day) => {
              console.log("day pressed");
            }}
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

  textInput: {
    width: "90%",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 30,
    borderColor: "gray",
    borderBottomWidth: 2,
    fontSize: 16,
  },
  calendar: {},
});
