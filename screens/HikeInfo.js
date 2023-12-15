/**
 * HikeInfo.js
 * Description: Contains complex tags that display information relevant to a 
 * singular hike. Contains a map, hike distance, hike trail, etc... 
 * (Whatever info we can reasonably insert in time)
 */

// Import packages
import React, { useEffect, useState, } from 'react';
import { Button, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { useWindowDimensions } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import Geocoder from 'react-native-geocoding';


// Import 
import { loadList, saveList } from '../components/RemoteAccess';
import { hikeInfoStyles } from '../styles/hikeInfo.js';

var emptyData = [];

// Pass emptyData to VirtualList on initilaization
Geocoder.init("AIzaSyDqW8jK0xxnIRKTKXACxIK-q3UerQTiCsA");

const HikeView = () => {

    // Declare state variables
    const [list, setlist] = useState([]); // Use to track hikes on this tab?
    const [index, setIndex] = useState(0);
    const [curHikeLoc, setCurHikeLoc] = useState(null);
    const [curHikeLat, setCurHikeLat] = useState(null);
    const [curHikeLon, setCurHikeLon] = useState(null);
    const [ashowme, setshowme] = useState(false); // Useful for showing dialog prompt
    const [markers, setMarks] = useState([]); // Useful for showing markers on map
    const [curMarker, setCurMark] = useState([]); // Useful for showing markers on map

  const getItemCount = (data) => list.length;
  const getItem = (data, index) => (list[index]);


  useEffect(() => { // Does this execute on startup?
    if (list.length == 0)    
    {
      var urladdress = "https://cs.boisestate.edu/~scutchin/cs402/codesnips/loadjson.php?user=martinguzman"//
      const response = loadList(urladdress, list,setlist,setMarks)//
      //console.log("listLength: " + getItemCount(list))
      //console.log("bM1: " + list[0])
      setCurHikeLoc(getItem(list, 0));
      //console.log("aM1: " + curHike);      
    } else {
      var urladdress = "https://cs.boisestate.edu/~scutchin/cs402/codesnips/loadjson.php?user=martinguzman"//
      const response = loadList(urladdress, list,setlist,setMarks)//
      var i = index;
      setCurHikeLoc(list[i].key);
      setCurHikeLat(list[i].latitude);
      setCurHikeLon(list[i].longitude);
      setCurMark([<Marker
                coordinate={{latitude: 44.78825, 
                            longitude: -122.4324}}
                title={"title"}
                description={"description"}
              />])
    }

  }, [list, curHikeLoc, getItem,])

async function loadFromServerButton() {
  var urladdress = "https://cs.boisestate.edu/~scutchin/cs402/codesnips/loadjson.php?user=martinguzman"
  const response = loadList(urladdress, list, setlist)
  console.log("loadButton() used")
}

async function saveToServerButton() {
  var urladdress = "https://cs.boisestate.edu/~scutchin/cs402/codesnips/savejson.php?user=martinguzman";
  const response = saveList(urladdress, list);
  //console.log(response);
  console.log("saveButton() used")
}

    function plusButton() {
        setshowme(true);
    }

    function prevButton() {
      if (index < list.length-1) {
        setIndex(index+1);
      } else { 
        setIndex(0);
      }
    }

    function nextButton() {
      if (index >= 1) {
        setIndex(index-1);        
      } else {
        setIndex(list.length-1);        
      }

    }

    function addLocation(loc) {
        var location = {};

        Geocoder.from(loc).then(json => {
            location = json.results[0].geometry.location;
            console.log(location);

            var newList = [{ key: loc, selected: false, longitude: location.lng, latitude: location.lat }]
            var amark = <Marker coordinate={{ latitude: location.lat, longitude: location.lng }}
                title={loc} />

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
    var smaps = { width: SCREEN_WIDTH * (8 / 10), height: SCREEN_HEIGHT * (1 / 2) }
    if (SCREEN_WIDTH > SCREEN_HEIGHT) {
        smaps = { width: SCREEN_WIDTH, height: SCREEN_HEIGHT }
    }

    /* Assemble the subparts of the tab below into the "hikeInfo" tab! */

    var hikeMap =
        <MapView ref={mapref} style={smaps} > 
            {curMarker} 
        </MapView>

    var buttonrow =
        <View style={hikeInfoStyles.outerButtonView} >
            <View style={hikeInfoStyles.innerButtonView}>
                <Button title="Add hike" onPress={() => plusButton()} />
                <Button title="Prev" onPress={() => prevButton()} />
                <Button title="Next" onPress={() => nextButton()} />
                <Button title="Save Current Hike" onPress={() => saveToServerButton()} />
            </View>
        </View>

    var hikeInfo = 
        <View>
          <Text> {curHikeLoc} Hike</Text>
          <Text> Latitude: {curHikeLat} | Longitude: {curHikeLon} </Text>
          <Text></Text>
        </View>

    var hikeInfoTabV =
        <View style={hikeInfoStyles.mainView} >
            {hikeMap}
            {buttonrow}
            <DialogInput isDialogVisible={ashowme}
                title="Enter Location"
                message="Enter A Hike Location To Add:"
                submitInput={(inputText) => { setshowme(false); addLocation(inputText) }}
                closeDialog={() => { setshowme(false) }}
            >
            </DialogInput>
            {hikeInfo}
        </View>

    var hikeInfoTabH =
        <View style={hikeInfoStyles.mainView}>
            <View>
                {buttonrow}
                <DialogInput isDialogVisible={ashowme}
                    title="Enter Location"
                    message="Enter A Hike Location To Add:"
                    submitInput={(inputText) => { setshowme(false); addLocation(inputText) }}
                    closeDialog={() => { setshowme(false) }}>
                </DialogInput>
            </View>
            {hikeMap}
        </View>

    // Decide between which tab to display
    if (SCREEN_WIDTH > SCREEN_HEIGHT) {
        return hikeInfoTabH;
    }

    return (hikeInfoTabV)
};

export { HikeView }