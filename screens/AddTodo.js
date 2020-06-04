import React, { useState } from "react";
import {
  View,
  TextInput,
  Switch,
  Picker,
  Button,
  Alert,
  Text,
  StyleSheet,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function AddTodo({ navigation }) {
  const [newTodo, setNewTodo] = useState({
    id: new Date().getTime().toString(36),
    todo: "",
    remarks: "",
    imp: false,
    category: "No Category",
    edit: false,
  });

  const toggleimp = () => setNewTodo({ ...newTodo, imp: !newTodo.imp });

  const [selectedValue, setSelectedValue] = useState([
    "No Category",
    "Work",
    "Personal",
    "Shopping",
  ]);

  const pressHandler = () => {
    if (newTodo.todo != "" && newTodo.remarks != "") {
      navigation.navigate("TodoList", newTodo);
    } else {
      Alert.alert("Do fill all the fields");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.todoText}
        placeholder="Todo"
        onChangeText={(text) => setNewTodo({ ...newTodo, todo: text })}
      />

      <TextInput
        style={styles.todoRemarks}
        placeholder="Remarks"
        onChangeText={(text) => setNewTodo({ ...newTodo, remarks: text })}
      />
      <View style={styles.switchView}>
        <Text style={styles.switchText}>Imp</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#000000" }}
          thumbColor={newTodo.imp ? "#252525" : "#999999"}
          onValueChange={toggleimp}
          value={newTodo.imp}
        />
      </View>
      <View style={styles.categoryView}>
        <Text style={styles.categoryText}>Category</Text>
        <Picker
          selectedValue={newTodo.category}
          style={styles.categoryPicker}
          onValueChange={(itemValue) =>
            setNewTodo({ ...newTodo, category: itemValue })
          }
        >
          {selectedValue.map((value, key) => (
            <Picker.Item key={key} label={value} value={value} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={pressHandler}>
        <Text style={styles.addButtonText}>Add New Todo</Text>
      </TouchableOpacity>
      {/* <Button style={styles.addButton} title="Add New Todo" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    flex: 1,
    padding: 50,
    backgroundColor: "#d9b80e",
  },
  todoText: {
    height: 50,
    paddingLeft: 30,
    fontSize: 30,
    width: 300,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderColor: "#252525",
    borderRadius: 200,
    color: "#252525",
  },
  todoRemarks: {
    marginTop: 20,
    height: 50,
    paddingLeft: 30,
    fontSize: 30,
    width: 300,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderColor: "#252525",
    borderRadius: 200,
    color: "#252525",
  },
  switchView: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    height: 50,
    paddingLeft: 30,
    fontSize: 30,
    width: 300,
    alignItems: "center",
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderColor: "#252525",
    borderRadius: 200,
  },
  switchText: {
    fontSize: 30,
    color: "#252525",
    marginRight: 100,
  },
  categoryView: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    height: 50,
    paddingLeft: 30,
    fontSize: 30,
    width: 300,
    alignItems: "center",
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderColor: "#252525",
    borderRadius: 200,
  },
  categoryText: {
    fontSize: 20,
    color: "#252525",
    marginRight: 20,
  },
  categoryPicker: {
    height: 50,
    width: 150,
    color: "#252525",
  },
  addButton: {
    marginTop: 50,
    marginLeft: 80,
    height: 60,
    width: 150,
    backgroundColor: "#252525",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 200,
  },
  addButtonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#d9b80e",
  },
});
