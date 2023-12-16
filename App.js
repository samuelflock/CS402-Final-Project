/**
 * App.js
 * Description: Contains the main() of the program.
 * Has its tags divided into several other files for organization.
 */

// Import packages
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
// Import complex tags
import { HikeView } from "./screens/HikeInfo.js";
import { HikeList } from "./screens/HikeList.js";

// Create bottom tag navigator
const Tab = createBottomTabNavigator();

const HikingApp = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Current Hike" component={HikeView} />
        <Tab.Screen name="Past Hikes" component={HikeList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default HikingApp;
