import React, { Component } from "react";

import { StyleSheet, View, Text } from "react-native";
import { Agenda } from "react-native-calendars";
import { SearchBar } from "react-native-elements";

export default class Fitnessplan extends Component {
  constructor(props) {
    super(props);

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
    const height = "150";
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
  /* renderDay() {
    return (
      <View>
        <Button title="Add"></Button>
      </View>
    );
  }*/

  render() {
    const eventsFormatted = this.state.eventsFormatted;

    return (
      <View style={{ flex: 1, backgroundColor: "white", paddingBottom: 30 }}>
        <Agenda
          //style={styles.calendar}
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
            this.props.navigation.navigate("Login", { event })
          }
        />
      </View>
    );
  }
}
