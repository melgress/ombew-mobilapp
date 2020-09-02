import React, { Component } from "react";
import { Button, View, Text, StyleSheet, ScrollView } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";
import WeeklyCalendar from "react-native-weekly-calendar";

class Fitnessplan extends Component {
  constructor(props) {
    super(props);

    this.state = { date: "" };
  }

  componentDidMount() {
    var that = this;

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds

    that.setState({
      //Setting the value of the date time
      date: date,
    });
  }

  render() {
    const sampleEvents = [
      {
        start: "2020-08-30 09:00:00",
        duration: "160:20:00",
        note: "Walk my dog",
      },
      /*{
        start: "2020-08-31 09:00:00",
        duration: "01:00:00",
        note: "Doctor's appointment",
      },
      {
        start: "2020-09-01 09:00:00",
        duration: "00:30:00",
        note: "Morning exercise",
      },
      {
        start: "2020-09-02 09:00:00",
        duration: "02:00:00",
        note: "Meeting with client",
      },
      {
        start: "2020-09-03 09:00:00",
        duration: "01:00:00",
        note: "Dinner with family",
      },
      {
        start: "2020-09-04 09:00:00",
        duration: "01:00:00",
        note: "Schedule 1",
      },
      {
        start: "2020-09-05 09:00:00",
        duration: "02:00:00",
        note: "Schedule 2",
      },
      {
        start: "2020-09-06 09:00:00",
        duration: "01:30:00",
        note: "Schedule 3",
      },
      {
        start: "2020-09-07 09:00:00",
        duration: "02:00:00",
        note: "Schedule 4",
      },
      {
        start: "2020-09-08 09:00:00",
        duration: "01:00:00",
        note: "Schedule 5",
      },*/
    ];
    return (
      <View style={styles.container}>
        <WeeklyCalendar events={sampleEvents} style={{ height: 400 }} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Fitnessplan;