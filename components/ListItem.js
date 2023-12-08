/**
 * listItem.js
 * Description: Acts as the list item for each hike entry on the 
 * hike list. Is a button itself and can be pressed to select 
 * for deletion.
 */

import * as React from 'react'
import { TouchableOpacity, Text } from 'react-native';


const Item = ({ item, onPress, styles, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.key}</Text>
    <Text style={[styles.title]}></Text>
  </TouchableOpacity>
);

export { Item }