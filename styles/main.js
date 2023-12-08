/**
 * main.css
 * Description: The main styles organizer of all elements in the app screen.
 * Stylizes the map container, buttons container, hike list container, and
 * hike info container.
 */

import { StyleSheet } from 'react-native';

const mainStyles = StyleSheet.create({

  // Container of the entire view
  mainView: {
    flex: 1,
    backgroundColor: "blue",
    alignItems: 'center',

  },

  // Container of the buttons
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    allignItems: 'center',
    justifyContent: 'center',
    maxHeight: 35,
    minHeight: 35,
    alignItems: 'center',
  },

  // List container
  list: {
    flex: 20,
    paddingTop: 5,
    backgroundColor: "blue",
    borderWidth: 5,
  },

  // Row container
  rowblock: {
    height: 80,
    padding: 15,
    borderWidth: 2,
  },


});


export { mainStyles }