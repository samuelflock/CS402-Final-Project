/**
 * main.css
 * Description: The main styles organizer of all elements in the app screen.
 * Stylizes the map container, buttons container, hike list container, and
 * hike info container.
 */
 
import {StyleSheet} from 'react-native';

const hikeInfoStyles=StyleSheet.create({
  
  // Container of the hike info view
  mainView: {
    flex: 1,
    backgroundColor: "#8FA",
    alignItems: 'center',
  },

  // Container of the buttons
  innerButtonView: {
    flex: 1,
    flexDirection: 'row',
    allignItems: 'center',
    justifyContent: 'center',
    maxHeight: 35,
    minHeight: 35,
    alignItems: 'center',
    backgroundColor: "#F00"
  },

  // Row container
  outerButtonView: {
    height: 80,
    padding: 10,
    backgroundColor: "#FFF"
  },


});


export {hikeInfoStyles}