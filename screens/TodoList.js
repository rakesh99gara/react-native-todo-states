import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  CheckBox,
  Image,
  Alert,
} from "react-native";

import Constants from "expo-constants";

function Item({
  title,
  id,
  imp,
  isImp,
  index,
  deleteMe,
  gotoEdit,
  category,
  remarks,
}) {
  return (
    <TouchableOpacity>
      <View style={styles.item}>
        <CheckBox value={imp} onChange={() => isImp(id)} />
        <Text
          style={[
            styles.title,
            { textDecorationLine: imp ? "line-through" : "none" },
          ]}
        >
          {title}
        </Text>
        {/* <Text>{remarks}</Text>
        <Text>{category}</Text> */}
        <TouchableOpacity
          style={styles.delete}
          onPress={() => gotoEdit(id, imp, title, category, remarks)}
        >
          <Image
            source={require("../assets/edit.png")}
            style={{ height: 30, width: 30 }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.delete}
          onPress={() => deleteMe(id, imp, index)}
        >
          <Image
            source={require("../assets/delete.png")}
            style={{ height: 30, width: 30 }}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

function TodoList({ route, navigation }) {
  useEffect(() => {
    if (route.params) {
      if (route.params.edit) {
        const index = todos.findIndex((todo) => {
          return todo.id === route.params.id;
        });
        const editOneTodo = Object.assign({}, todos[index]);
        editOneTodo.todo = route.params.todo;
        editOneTodo.remarks = route.params.remarks;
        editOneTodo.imp = route.params.imp;
        editOneTodo.category = route.params.category;

        const editDumTodos = Object.assign([], todos);

        editDumTodos[index] = editOneTodo;
        setTodos(editDumTodos);
      } else {
        setTodos((todos) => [
          ...todos,
          {
            id: route.params.id,
            todo: route.params.todo,
            remarks: route.params.remarks,
            imp: route.params.imp,
            category: route.params.category,
          },
        ]);
      }
    }
  }, [route.params]);

  const [todos, setTodos] = useState([]);

  console.log(todos);

  const addTodo = () => {
    setTodos((todos) => [
      ...todos,
      {
        id: new Date().getTime().toString(36),
        todo: "Do Something",
        remarks: "",
        imp: false,
        category: "No Category",
      },
    ]);
  };

  const pressHandler = () => {
    navigation.navigate("AddTodo");
  };
  const gotoEdit = (id, imp, title, category, remarks) => {
    const editTodo = {
      id: id,
      imp: imp,
      title: title,
      category: category,
      remarks: remarks,
    };
    navigation.navigate("EditTodo", editTodo);
  };

  function myStyle(imp) {
    if (imp) {
      alert(imp);
      return {
        fontSize: 50,
        color: "red",
      };
    } else {
      return {
        fontSize: 40,
        color: "blue",
      };
    }
  }

  const isImp = (id) => {
    const index = todos.findIndex((todo) => {
      return todo.id === id;
    });
    const oneTodo = Object.assign({}, todos[index]);
    oneTodo.imp = !todos[index].imp;

    const dumTodos = Object.assign([], todos);

    dumTodos[index] = oneTodo;
    setTodos(dumTodos);
  };

  const deleteMe = (id, imp, index) => {
    const oneTodo = Object.assign([], todos);
    oneTodo.splice(index, 1);
    console.log(oneTodo);
    setTodos(oneTodo);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={pressHandler} style={styles.add}>
        <Text style={styles.addText}>+</Text>
      </TouchableOpacity>
      <FlatList
        data={todos}
        renderItem={({ item, index }) => (
          <Item
            title={item.todo}
            category={item.category}
            remarks={item.remarks}
            imp={item.imp}
            id={item.id}
            isImp={isImp}
            index={index}
            deleteMe={deleteMe}
            gotoEdit={gotoEdit}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      {/* <Button title="addTodo" onPress={addTodo} /> */}
    </SafeAreaView>
    // <View>
    //   <Button title="addTodo" onPress={addTodo} />
    //   {todos.map((todo) => (
    //     <Text key={todo.id}>{todo.todo},{todo.id}</Text>
    //   ))}
    // </View>
  );
}

export default TodoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
    backgroundColor: "#d9b80e",
  },
  item: {
    backgroundColor: "#252525",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    color: "#d9b80e",
    flex: 4,
    paddingLeft: 10,
  },
  delete: {
    alignItems: "flex-end",
    flex: 1,
  },
  add: {
    position: "absolute",
    top: 650,
    left: 340,
    height: 60,
    width: 60,
    backgroundColor: "#99d4d9",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    zIndex: 2,
  },
  addText: {
    fontSize: 40,
    color: "#252525",
  },
});
