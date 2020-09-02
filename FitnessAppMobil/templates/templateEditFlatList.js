import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Modal,
  TouchableHighlight,
} from "react-native";
import Data from "../screens/data/courses.json";

export default class FitnessInfo extends Component {
  constructor(props) {
    super(props);
    this.setInputName = this.setInputName.bind(this);
    this.setInputPrice = this.setInputPrice.bind(this);
    this.setInputDescription = this.setInputDescription.bind(this);

    this.initData = Data;
    this.state = {
      data: this.initData,
      isModalVisible: false,
      inputName: "",
      inputPrice: "",
      inputDescription: "",
      editedItem: 0,
    };
  }

  setModalVisible = (bool) => {
    this.setState({ isModalVisible: bool });
  };

  setInputName = (name) => {
    this.setState({ inputName: name });
  };
  setInputPrice = (price) => {
    this.setState({ inputPrice: price });
  };
  setInputDescription = (description) => {
    this.setState({ inputText: description });
  };

  setEditedItem = (item) => {
    this.setState({ editedItem: item });
  };

  handleEditItem = (editedItem) => {
    const newData = this.state.data.map((item) => {
      if (item.name === editedItem) {
        item.name = this.state.inputName;
        item.price = this.state.inputPrice;
        item.name = this.state.inputDescription;
        return item;
      }
      return item;
    });
    this.setState({ data: newData });
  };

  renderItem = ({ item }) => (
    <TouchableHighlight
      onPress={() => {
        this.setModalVisible(true);
        this.setInputName(item.name), this.setEditedItem(item.name);
        this.setInputPrice(item.price), this.setEditedItem(item.price);
        this.setInputName(item.description),
          this.setEditedItem(item.description);
      }}
      underlayColor={"#f1f1f1"}
    >
      <View style={styles.item}>
        <View style={styles.marginLeft}>
          <View style={[styles.menu, { backgroundColor: item.color }]}></View>
          <View style={[styles.menu, { backgroundColor: item.color }]}></View>
          <View style={[styles.menu, { backgroundColor: item.color }]}></View>
        </View>
        <Text style={styles.text}> {item.name} </Text>
        <Text style={styles.text}> {item.price} </Text>
        <Text style={styles.text}> {item.description} </Text>
      </View>
    </TouchableHighlight>
  );

  render() {
    return (
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}> List Header </Text>
        </View>
        <FlatList
          data={this.state.data}
          keyExtractor={(item) => item.name}
          renderItem={this.renderItem}
        />
        <Modal
          animationType="fade"
          visible={this.state.isModalVisible}
          onRequestClose={() => this.setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <Text style={styles.text}>Change text:</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(name) => {
                this.setState({ inputName: name });
                console.log("state ", this.state.inputName);
              }}
              defaultValue={this.state.inputName}
              editable={true}
              multiline={false}
              maxLength={200}
            />
            <TouchableHighlight
              onPress={() => {
                this.handleEditItem(this.state.editedItem);
                this.setModalVisible(false);
              }}
              style={[styles.touchableHighlight, { backgroundColor: "orange" }]}
              underlayColor={"#f1f1f1"}
            >
              <Text style={styles.text}>Save</Text>
            </TouchableHighlight>
            <TextInput
              style={styles.textInput}
              onChangePrice={(price) => {
                this.setState({ inputPrice: price });
                console.log("state ", this.state.inputPrice);
              }}
              //defaultValue={this.state.inputPrice}
              editable={true}
            />
            <TouchableHighlight
              onPress={() => {
                this.handleEditItem(this.state.editedItem);
                this.setModalVisible(false);
              }}
              style={[styles.touchableHighlight, { backgroundColor: "orange" }]}
              underlayColor={"#f1f1f1"}
            >
              <Text style={styles.text}>Save</Text>
            </TouchableHighlight>
          </View>
        </Modal>
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
