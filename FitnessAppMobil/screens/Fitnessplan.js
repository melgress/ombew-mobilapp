import React, { Component } from "react";

import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
} from "react-native";
import { Agenda } from "react-native-calendars";
import { SearchBar } from "react-native-elements";
import filter from "lodash";

export default class Fitnessplan extends Component {
  constructor(props) {
    super(props);

    //this.filterCalendar = this.filterCalendar.bind(this);
    // this.searchText = this.searchText.bind(this);

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
    //Charge les items du mois
    fetch("http://192.168.178.23:9000/api/fitnessevents")
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
  /*renderDay(day) {
    return (
      <View>
        <Text>{item.day}</Text>
      </View>
    );
  }*/

  render() {
    const eventsFormatted = this.state.eventsFormatted;

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
          selected={"2020-09-04"}
          items={eventsFormatted}
          loadItemsForMonth={this.loadEvents}
          renderItem={this.renderItem.bind(this)}
          //renderDay={this.renderDay.bind(this)}
          renderEmptyData={() => null}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          onDayPress={(day) => {
            console.log("day pressed");
          }}
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
