/**
 * main.css
 * Description: The main styles organizer of all elements in the app screen.
 * Stylizes the map container, buttons container, hike list container, and
 * hike info container.
 */

import { StyleSheet } from "react-native";

const hikeInfoStyles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
  },
  mapStyle: {
    width: "100%",
    height: "50%",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    padding: 10,
  },
  hikeInfo: {
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginVertical: 10,
  },
  hikeTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  hikeCoords: {
    fontSize: 16,
  },
});

export default hikeInfoStyles;
