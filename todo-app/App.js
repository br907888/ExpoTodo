import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text, TextInput, Button, View, Platform, Pressable } from 'react-native';
import { CheckBox, ThemeProvider } from '@rneui/themed';

export default function App() {
  const [tasks, setTasks] = useState([
    { id: "1", description: "Finish homework", completed: false },
    { id: "2", description: "Read for 30 minutes", completed: false },
    { id: "3", description: "Exercise for 60 minutes", completed: false }
  ]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: String(tasks.length + 1), description: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      {Platform.OS === "web" ? (
        <Pressable onPress={() => toggleTaskCompletion(item.id)}>
          <Text style={{ fontSize: 24 }}>{item.completed ? "☑️" : "⬜"}</Text>
        </Pressable>
      ) : (
        <CheckBox checked={item.completed} onPress={() => toggleTaskCompletion(item.id)} />
      )}
      <Text style={[styles.taskText, item.completed && styles.completedTask]}>{item.description}</Text>
    </View>
  );

  return (
    <ThemeProvider>
      <SafeAreaView style={styles.container}>
        <FlatList data={tasks} renderItem={renderItem} keyExtractor={item => item.id} />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="New task..."
            value={newTask}
            onChangeText={setNewTask}
          />
          <Button title="Add Task" onPress={addTask} color="#a14be3" />
        </View>
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  taskText: {
    fontSize: 18
  },
  completedTask: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    marginRight: 10
  }
});