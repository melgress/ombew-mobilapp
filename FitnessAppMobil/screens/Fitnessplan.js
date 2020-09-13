import React, { Component } from "react";

import { View, Text, TextInput } from "react-native";
import { Agenda } from "react-native-calendars";
import { styles, buttons } from './styles';

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
      <View>
        <Text style={styles.textField}>{item.name}</Text>
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View>
        <Text style={styles.textField}>This is empty date!</Text>
      </View>
    );
  }

  render() {
    const eventsFormatted = this.state.eventsFormatted;

    if (!this.props.route.params.en) {
      return (
        <View style={styles.layout}>
          <TextInput style={styles.textInput}
            placeholder="Nach Kurs suchen..."
            autoCorrect={false}
            onChangeText={(text) => {
              this.handleSearch(text);
            }}
            value={this.state.search}
          />

          <Agenda
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
        <View style={styles.layout}>
          <TextInput style={styles.textInput}
            placeholder="Search for a course..."
            autoCorrect={false}
            onChangeText={(text) => {
              this.handleSearch(text);
            }}
            value={this.state.search}
          />

          <Agenda
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
