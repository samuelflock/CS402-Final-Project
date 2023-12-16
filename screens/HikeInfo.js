import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useWindowDimensions } from "react-native";
import DialogInput from "react-native-dialog-input";
import Geocoder from "react-native-geocoding";
import hikeInfoStyles from "../styles/hikeInfo.js";
import { GEOCODER_API_KEY } from "../constants.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

Geocoder.init(GEOCODER_API_KEY);

const HikeView = () => {
  const [list, setList] = useState([]);
  const [index, setIndex] = useState(0);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedHikes = await AsyncStorage.getItem("hikes");
        if (storedHikes !== null) {
          const hikes = JSON.parse(storedHikes);
          setList(hikes);
          updateMarkers(hikes);
        }
      } catch (error) {
        Alert.alert("Error", "Failed to load hikes.");
      }
    };
    fetchData();
  }, []);

  const updateMarkers = (hikes) => {
    const newMarkers = hikes.map((hike) => (
      <Marker
        key={hike.key}
        coordinate={{ latitude: hike.latitude, longitude: hike.longitude }}
        title={hike.key}
      />
    ));
    setMarkers(newMarkers);
  };

  const saveToAsyncStorage = async () => {
    try {
      const jsonValue = JSON.stringify(list);
      await AsyncStorage.setItem("hikes", jsonValue);
      console.log("Hikes saved to AsyncStorage");
    } catch (error) {
      Alert.alert("Error", "Failed to save hikes.");
    }
  };

  const saveToServerButton = () => {
    saveToAsyncStorage();
  };

  const prevButton = () => {
    setIndex(index === 0 ? list.length - 1 : index - 1);
  };

  const nextButton = () => {
    setIndex(index === list.length - 1 ? 0 : index + 1);
  };

  const plusButton = () => {
    setDialogVisible(true);
  };

  const addLocation = (loc) => {
    Geocoder.from(loc)
      .then((json) => {
        const location = json.results[0].geometry.location;
        const newHike = {
          key: loc,
          latitude: location.lat,
          longitude: location.lng,
        };
        setList([...list, newHike]);
        setMarkers([
          ...markers,
          <Marker key={loc} coordinate={location} title={loc} />,
        ]);
      })
      .catch((error) => console.warn(error));
  };

  const currentHike = list[index] || { key: "", latitude: 0, longitude: 0 };
  const mapref = React.createRef();
  const { width, height } = useWindowDimensions();

  var hikeMap = (
    <MapView ref={mapref} style={hikeInfoStyles.mapStyle}>
      {markers}
    </MapView>
  );

  var buttonrow = (
    <View style={hikeInfoStyles.buttonRow}>
      <Button title="Add hike" onPress={plusButton} color="#4CAF50" />
      <Button title="Prev" onPress={prevButton} color="#2196F3" />
      <Button title="Next" onPress={nextButton} color="#2196F3" />
      <Button
        title="Save Current Hike"
        onPress={saveToServerButton}
        color="#F44336"
      />
    </View>
  );

  var hikeInfo = (
    <View style={hikeInfoStyles.hikeInfo}>
      <Text style={hikeInfoStyles.hikeTitle}>{currentHike.key} Hike</Text>
      <Text style={hikeInfoStyles.hikeCoords}>
        Latitude: {currentHike.latitude} | Longitude: {currentHike.longitude}
      </Text>
    </View>
  );

  var hikeInfoTab = (
    <View style={hikeInfoStyles.mainView}>
      {width > height ? <View>{buttonrow}</View> : null}
      {hikeMap}
      {width <= height ? buttonrow : null}
      <DialogInput
        isDialogVisible={dialogVisible}
        title="Enter Location"
        message="Enter A Hike Location To Add:"
        submitInput={(inputText) => {
          setDialogVisible(false);
          addLocation(inputText);
        }}
        closeDialog={() => {
          setDialogVisible(false);
        }}
      ></DialogInput>
      {hikeInfo}
    </View>
  );

  return hikeInfoTab;
};

export { HikeView };
