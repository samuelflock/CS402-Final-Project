import * as React from 'react'
import {VirtualizedList, TouchableOpacity, Button, FlatList, StyleSheet, Text, View} from 'react-native';

/*
const itemstyles=StyleSheet.create({
  item: {
    padding: 0,
    fontSize:12,
    height: 44,
  },
  title: {
    fontSize: 22,
  }
});
*/

const Item = ({item, onPress, styles, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.key}</Text>
      <Text style={[styles.title]}></Text>
      </TouchableOpacity>
);

export {Item}