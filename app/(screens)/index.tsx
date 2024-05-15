import {
  Button,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { FIRESTORE_DB } from "@/firebaseConfig";
import { ThemedText } from "@/components/ThemedText";
import { Entypo, Ionicons } from "@expo/vector-icons";

export interface Todo {
  id: string;
  title: string;
  done: boolean;
}

const List = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    const todoRef = collection(FIRESTORE_DB, "todos");

    const subsciber = onSnapshot(todoRef, {
      next: (snapshot) => {
        const todos: Todo[] = [];
        snapshot.docs.forEach((doc) => {
          todos.push({ id: doc.id, ...doc.data() } as Todo);
        });
        setTodos(todos);
      },
    });
    return () => subsciber();
  }, []);

  const addTodo = async () => {
    const doc = await addDoc(collection(FIRESTORE_DB, "todos"), {
      title: todo,
      done: false,
    });
    setTodo("");
  };

  const renderTodo = ({ item }: any) => {
    const ref = doc(FIRESTORE_DB, `todos/${item.id}`);
    const toggleDone = async () => {
      updateDoc(ref, { done: !item.done });
    };
    const deleteItem = async () => {
      deleteDoc(ref);
    };
    return (
      <ThemedView style={styles.todoContainer}
 
      >
        <TouchableOpacity onPress={toggleDone} style={styles.todo}>
          {item.done && (
            <ThemedText >
              <Ionicons name="checkmark-circle" size={24} color='green' />
            </ThemedText>
          )}
          {!item.done && (
            <ThemedText>
              <Entypo name="circle" size={24} />
            </ThemedText>
          )}

          <ThemedText type="default" darkColor="black" lightColor="black" style={styles.todoText}>{item.title}</ThemedText>
        </TouchableOpacity>
        <Ionicons
          name="trash-bin-outline"
          size={24}
          color="red"
          onPress={deleteItem}
        />
      </ThemedView>
    );
  };

  return (
    <ThemedView style={styles.container}>
      {/* <ThemedText type="title">This Link takes you to the Details screen.</ThemedText>
        <Link href="/details" style={styles.link}>
          <ThemedText type="link">Go to details Screen!</ThemedText>
        </Link> */}

      <ThemedView style={styles.form}>
        <TextInput
          placeholder="Add new Todo"
          onChangeText={(text: string) => setTodo(text)}
          value={todo}
          style={styles.input}
        />
        <Button onPress={addTodo} title="Add Todo" disabled={todo === ""} />
      </ThemedView>
      <ThemedView>
        {todos.length > 0 && (
          <FlatList
            data={todos}
            renderItem={(item) => renderTodo(item)}
            keyExtractor={(todo: Todo) => todo.id}
          />
        )}
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    padding: 20,
  },
  form: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  todoContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 4,
  },
  todoText: {
    flex: 1,
    paddingHorizontal: 4,
  },
  todo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default List;
