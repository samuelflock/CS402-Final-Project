import React, { useState, useEffect } from "react";
import { Button, View, VirtualizedList, Alert } from "react-native";
import Geocoder from "react-native-geocoding";
import { Item } from "../components/ListItem.js";
import hikeListStyles from "../styles/hikeList.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GEOCODER_API_KEY } from "../constants.js";

Geocoder.init(GEOCODER_API_KEY);

const HikeList = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedHikes = await AsyncStorage.getItem("hikes");
        setList(storedHikes !== null ? JSON.parse(storedHikes) : []);
      } catch (error) {
        Alert.alert("Error", "Failed to load hikes from storage.");
      }
    };
    fetchData();
  }, []);

  function minusButton() {
    const updatedList = list.filter((item) => !item.selected);
    setList(updatedList);
    saveHikesToStorage(updatedList);
  }

  async function saveHikesToStorage(hikes) {
    try {
      const jsonValue = JSON.stringify(hikes);
      await AsyncStorage.setItem("hikes", jsonValue);
      console.log("Updated hikes saved to AsyncStorage");
    } catch (error) {
      Alert.alert("Error", "Failed to save updated hikes to storage.");
    }
  }
  function toggleList(index) {
    setList(
      list.map((item, idx) => ({
        ...item,
        selected: idx === index ? !item.selected : item.selected,
      }))
    );
  }

  const renderHikeEntry = ({ item, index }) => (
    <Item
      item={item}
      onPress={() => toggleList(index)}
      styles={hikeListStyles}
      backgroundColor={item.selected ? "black" : "white"}
      textColor={item.selected ? "white" : "black"}
    />
  );

  return (
    <View style={hikeListStyles.mainView}>
      <View style={hikeListStyles.buttonsContainer}>
        <Button title="Remove Hike" onPress={minusButton} color="#F44336" />
      </View>
      <VirtualizedList
        initialNumToRender={4}
        renderItem={renderHikeEntry}
        keyExtractor={(item, index) => `item-${index}`}
        getItemCount={() => list.length}
        getItem={(data, index) => list[index]}
        style={hikeListStyles.list}
      />
    </View>
  );
};

export { HikeList };
