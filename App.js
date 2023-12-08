/** 
  * App.js
  * Description: Contains the main() of the program. 
  * Has its tags divided into several other files for organization. 
  */

// Import packages
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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