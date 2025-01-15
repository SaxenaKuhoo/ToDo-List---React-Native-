import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Task = (props) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
      <View style={styles.circular}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center',
    borderRadius: 12,
    // borderWidth: 1,
    marginBottom: 20
  },
  itemLeft: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
  },
  circular: {
    width: 12,
    height: 12,
    borderWidth: 2,
    borderRadius: '50%',
    borderColor: '#55BCF6',
  },
  itemText: {
    maxWidth: '80%',
  }
})

export default Task;