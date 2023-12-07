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

// Import 
import {loadButton, saveButton} from '../js/util/Buttons.js';
import {loadList, saveList} from '../js/util/RemoteAccess.js';

import {hikeInfoStyles} from '../css/hikeInfo.css';



var emptyData = [];

// Pass emptyData to VirtualList on initilaization
Geocoder.init("AIzaSyDqW8jK0xxnIRKTKXACxIK-q3UerQTiCsA");

const HikeView = () => {

  // Declare state variables
  const[list, setlist] = useState([]); // Use to track hikes on this tab?
  const[ashowme, setshowme] = useState(false); // Useful for showing dialog prompt
  const[markers, setMarks] = useState([]); // Useful for showing markers on map

  // Old functions for VirtualList (may be helpful to gather info about one specific hike)
  const getItemCount = (data) => list.length; // Use to select Hike by number?
  const getItem = (data, index) => (list[index]); // Use this in LoadHike?

  //useEffect(() => { // Does this execute on startup?
  //  if (list.length == 0) {
  //    var urladdress = "https://cs.boisestate.edu/~scutchin/cs402/codesnips/loadjson.php?user=martinguzman"
  //    const response = loadList(urladdress, list,setlist,setMarks)
  //  }
  //
  //}, [list])


  function plusButton() {
    setshowme(true);
  }

  /**
   * 
   */
  function addLocation(loc) {
    var location = {};

    Geocoder.from(loc).then(json => {
      location = json.results[0].geometry.location;
      console.log(location);
      
      var newList = [{key: loc, selected: false, longitude: location.lng, latitude: location.lat}]
      var amark = <Marker coordinate={{latitude:location.lat, longitude: location.lng}}
                          title = {loc}/>

      newList = newList.concat(list);
      var marklist = markers.concat(amark);
      setlist(newList);
      setMarks(marklist);
    })
    .catch(error => console.warn(error));
  }

  const mapref = React.createRef();

  // Decide upon dimensions of the map
  const SCREEN_WIDTH = useWindowDimensions().width;
  const SCREEN_HEIGHT = useWindowDimensions().height;
  var smaps = {width: SCREEN_WIDTH*(8/10), height: SCREEN_HEIGHT*(1/2)}
  if (SCREEN_WIDTH>SCREEN_HEIGHT) {
    smaps = {width: SCREEN_WIDTH, height: SCREEN_HEIGHT}
  }





  /* Assemble the subparts of the tab below into the "hikeInfo" tab! */

  var hikeMap=
    <MapView ref={mapref} style={smaps} >
      {markers}
    </MapView>  

  var buttonrow=
    <View style={hikeInfoStyles.outerButtonView} >
      <View style={hikeInfoStyles.innerButtonView}>
        <Button title="Add hike" onPress={() => plusButton()} />
        <Button title="Select Prev Hike" onPress={() => loadButton()} />
        <Button title="Save Current Hike" onPress={() => saveButton()} />
      </View>
    </View>    

  var hikeInfo = 
    <Text>Insert data here</Text> // TODO: Gather hike info here!


  // Note: Variable "hikeInfoTabV" or "hikeInfoTabH" is the container for this entire tab! 
  //  (depending on parameters)

  var hikeInfoTabV=
    <View style={hikeInfoStyles.mainView} >
      {hikeMap}
      {buttonrow}
      <DialogInput isDialogVisible={ashowme}
        title="Enter Location"
        message="Enter A Hike Location To Add:"
        submitInput={(inputText) => {setshowme(false); addLocation(inputText)}}
        closeDialog={()=>{setshowme(false)}}
        >
      </DialogInput>  
      <Text>(Location) Hike</Text>
      <Text>Info:</Text>
      {hikeInfo}
    </View>

  var hikeInfoTabH = 
    <View style={hikeInfoStyles.mainView}>
      <View>
        {buttonrow}
        <DialogInput isDialogVisible={ashowme}
          title="Enter Location"
          message="Enter A Hike Location To Add:"
          submitInput={(inputText) => {setshowme(false); addLocation(inputText)}}
          closeDialog={()=>{setshowme(false)}}>
        </DialogInput>
      </View>
      {hikeMap}
    </View>

  // Decide between which tab to display
  if (SCREEN_WIDTH>SCREEN_HEIGHT) {
    return hikeInfoTabH;
  }

  return (hikeInfoTabV)
};

export {HikeView}