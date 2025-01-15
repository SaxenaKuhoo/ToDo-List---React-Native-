import { StatusBar } from 'expo-status-bar';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from './components/Tasks';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [task, setTask] = useState();
  const [taskList, setTaskList] = useState([]);
  const saveData = async () => {
    try{
      await AsyncStorage.setItem('taskList', JSON.stringify(taskList));
    }
    catch (error){
      console.log("Error saving data", error);
    }
  }
  const loadData = async () => {
    try{
      const storedTasks = await AsyncStorage.getItem('taskList');
      if(storedTasks !== null ) {
        setTaskList(JSON.parse(storedTasks));
      }
    }
    catch (error) {
      console.log('Error while getting', error);
    }
  }
  useEffect(()=>{
    loadData();
  }, []);
  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskList([...taskList, task]);
    setTask(null);
  }
  const completeTask = (index) => {
    let listCopy = [...taskList];
    listCopy.splice(index, 1);
    setTaskList(listCopy);
  }
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>
            Today's Tasks
          </Text>
          <View style={styles.tasks}>
            {taskList.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task text={item}/>
                </TouchableOpacity>
              )}
            )}
          </View>
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
      <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)}></TextInput>
      <TouchableOpacity onPress={() => handleAddTask()}>
        <View style={styles.addWrapper}>
          <Text style={styles.addText} >+</Text>
        </View>
      </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tasks: {
    marginTop: 30
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250
  },
  addWrapper: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C0C0C0'
  },
  addText: {
    fontSize: 24
  }
});
