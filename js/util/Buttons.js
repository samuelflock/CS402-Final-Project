/**
 * HikeInfo.js
 * Description: Contains complex tags that display information relevant to a 
 * singular hike. Contains a map, hike distance, hike trail, etc... 
 * (Whatever info we can reasonably insert in time)
 */

// Import packages
import React, {useState, useEffect} from 'react';
import {Alert, Dimensions, VirtualizedList, TouchableOpacity, Button, FlatList, StyleSheet, Text, View} from 'react-native';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {useWindowDimensions} from 'react-native';
import DialogInput from 'react-native-dialog-input';
import Geocoder from 'react-native-geocoding';
import {StatusBar} from 'expo-status-bar';

import {loadList, saveList} from '../../js/util/RemoteAccess.js';


  /**
   * 
   */
async function loadButton() {
  var urladdress = "https://cs.boisestate.edu/~scutchin/cs402/codesnips/loadjson.php?user=martinguzman"
  const response = loadList(urladdress, list, setlist)
}


  /**
   * 
   */
async function saveButton() {
  var urladdress = "https://cs.boisestate.edu/~scutchin/cs402/codesnips/savejson.php?user=martinguzman";
  const response = saveList(urladdress, list);
  console.log(response);
  console.log("saveButton() worked!")
}



export {loadButton}
export {saveButton}
