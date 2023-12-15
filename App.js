/** 
  * App.js
  * Description: Contains the main() of the program. 
  * Has its tags divided into several other files for organization. 
  */

// Import packages
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState, } from 'react';
import { Button, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { useWindowDimensions } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import Geocoder from 'react-native-geocoding';
// Import complex tags
import { HikeView } from './screens/HikeInfo.js';
import { HikeList } from './screens/HikeList.js';

// Create bottom tag navigator
const Tab = createBottomTabNavigator();

// Create the main body of the app
const HikingApp = () => {
  /* Create main tabs "Current Hike" and "Hike List" for organization.
   * Note how each tab will be divided into its own file. */
  var maintabs =
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Current Hike" component={HikeView} />
        <Tab.Screen name="Past Hikes" component={HikeList} />
      </Tab.Navigator>
    </NavigationContainer>

  return (maintabs)
}



export default HikingApp