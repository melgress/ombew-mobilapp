
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  text:{
    textAlign: "center",
    color: "black",
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 80,
  },
  text2:{
    textAlign: "center",
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  layout: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "white",
  },
  textInput: {
    borderColor: "black",
    height: 50,
    borderWidth: 2,
    fontSize: 16,
    color: "black",
    backgroundColor: "#f5dda9",
  },
  textInput2: {
    borderColor: "black",
    textAlign: "center",
    height: 50,
    borderWidth: 2,
    fontSize: 16,
    color: "black",
    backgroundColor: "#f5dda9",
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  textField: {
    padding: 20,
    marginTop: 20,
    marginRight: 15,
    backgroundColor: "#f5dda9",
    fontSize: 16,
    textAlign: "center",
    justifyContent: "center",
  },
  scrollView: {
    backgroundColor: "white",
  },
  listitem: {
    backgroundColor: "#f5dda9",
    alignItems: "center",
    paddingVertical: 20,
  },
  dropdown: {
    borderColor: "black",
    height: 50,
    borderWidth: 2,
    backgroundColor: "#f5dda9",
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
  }
  
});

const buttons = StyleSheet.create({
  button1: {
    elevation: 8,
    backgroundColor: "#ffa600",
    marginRight: 50,
    marginLeft: 50,
    marginBottom: 5,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  button2: {
    backgroundColor: "#f5dda9",
    marginBottom: 5,
    marginRight: 5,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  button3: {
    elevation: 8,
    backgroundColor: "#ffa600",
    marginTop:10,
    marginRight: 50,
    marginLeft: 50,
    marginBottom: 10,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  button4: {
    backgroundColor: "#32CD32",
    marginBottom: 5,
    marginRight: 5,
    marginTop:5,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  button5: {
    backgroundColor: "#FF0000",
    marginBottom: 5,
    marginRight: 5,
    marginTop:5,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  buttontext:{
    textAlign: "center",
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  }


});

export {styles, buttons};
  