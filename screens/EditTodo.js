import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Switch,
  Picker,
  Button,
  Alert,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function EditTodo({ route, navigation }) {
  const [selectedValue, setSelectedValue] = useState([
    "No Category",
    "Work",
    "Personal",
    "Shopping",
  ]);

  const toggleimp = () => setnewTodo({ ...newTodo, imp: !newTodo.imp });

  const pressHandler = () => {
    if (newTodo.todo != "" && newTodo.remarks != "") {
      navigation.navigate("TodoList", newTodo);
    } else {
      Alert.alert("Do fill all the fields");
    }
  };

  const [newTodo, setnewTodo] = useState({});
  useEffect(() => {
    if (route.params) {
      setnewTodo({
        id: route.params.id,
        todo: route.params.title,
        remarks: route.params.remarks,
        imp: route.params.imp,
        category: route.params.category,
        edit: true,
      });
    }
  }, [route.params]);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.todoText}
        placeholder="Todo"
        value={newTodo.todo}
        onChangeText={(text) => setnewTodo({ ...newTodo, todo: text })}
      />

      <TextInput
        style={styles.todoRemarks}
        placeholder="Remarks"
        value={newTodo.remarks}
        onChangeText={(text) => setnewTodo({ ...newTodo, remarks: text })}
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
            setnewTodo({ ...newTodo, category: itemValue })
          }
        >
          {selectedValue.map((value, key) => (
            <Picker.Item key={key} label={value} value={value} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={pressHandler}>
        <Text style={styles.addButtonText}>Edit Todo</Text>
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
