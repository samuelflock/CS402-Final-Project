// Import packages
import React, { useState, useEffect } from 'react';
import { VirtualizedList, Button, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { useWindowDimensions } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import Geocoder from 'react-native-geocoding';

// Import local js files
import { Item } from './components/ListItem.js';
import { loadList, saveList } from './components/RemoteAccess.js';

// Import styles
import { mainStyles } from './styles/main.js/';
import { hikeListStyles } from './styles/hikeList.js';

// Passed to the virtualized list
var emptyData = [];
Geocoder.init("AIzaSyDqW8jK0xxnIRKTKXACxIK-q3UerQTiCsA");

// declare virtualList App object
const MapList = () => {

  // State var's
  const [list, setlist] = useState([]);
  const [autonav, setnav] = useState(true);
  const [ashowme, setshowme] = useState(false);

  // locations
  var blist = <Marker
    coordinate={{
      latitude: 40.78825,
      longitude: -122.4324
    }}
    title={"place1"}
    description={"description"}
  />

  var mboise = <Marker
    coordinate={{
      latitude: 37.78825,
      longitude: -122.4324
    }}
    title={"place2"}
    description={"description"}
  />

  var mlist = [blist, mboise];

  const [markers, setMarks] = useState(mlist);

  // necessary functions for the <VirtualList> Component
  const getItemCount = (data) => list.length;
  const getItem = (data, index) => (list[index]);

  useEffect(() => {
    if (list.length == 0) {
      var urladdress = "https://cs.boisestate.edu/~scutchin/cs402/codesnips/loadjson.php?user=martinguzman"
      const response = loadList(urladdress, list, setlist, setMarks)
    }

  }, [list])

  function loadButton() {
    var urladdress = "https://cs.boisestate.edu/~scutchin/cs402/codesnips/loadjson.php?user=martinguzman"
    const response = loadList(urladdress, list, setlist)
  }


  function saveButton() {
    var urladdress = "https://cs.boisestate.edu/~scutchin/cs402/codesnips/savejson.php?user=martinguzman";
    const response = saveList(urladdress, list);
    console.log(response);
    console.log("saveButton() worked!")
  }

  function plusButton() {
    setshowme(true);
  }

  function addLocation(alocation) {
    var location = {};

    Geocoder.from(alocation)
      .then(json => {
        location = json.results[0].geometry.location;
        console.log(location);

        var newList = [{ key: alocation, selected: false, longitude: location.lng, latitude: location.lat }]
        var amark = <Marker
          coordinate={{ latitude: location.lat, longitude: location.lng }}
          title={alocation}
          description={"Airport"}
        />
        newList = newList.concat(list);
        var marklist = markers.concat(amark);
        setlist(newList);
        setMarks(marklist);
      })
      .catch(error => console.warn(error));
  }

  function minusButton() {
    const newList = [];
    list.forEach((item) => {
      if (!item.selected) {
        newList.push(item);
      }
    })

    setlist(newList);
  }

  const renderItem = ({ item, index }) => {
    const backgroundColor = item.selected ? 'black' : 'white';
    const color = item.selected ? 'white' : 'black';
    return (
      <Item item={item}
        onPress={() => { toggleList(index) }}
        styles={hikeListStyles}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  }

  function toggleList(aindex) {
    const newList = list.map((item, index) => {
      if (aindex == index) {
        if (item.selected) {
          item.selected = false;
        }
        else {
          if (autonav) {
            mapref.current.animateToRegion({
              latitude: item.latitude, longitude: item.longitude,
              latitudeDelta: 0.1, longitudeDelta: 0.1
            });
          }
          item.selected = true;
        }
      }
      else {
        item.selected = false;
      }
      return item;
    })
    setlist(newList);
  }

  // Create the logical and graphical representation of the page.
  var buttonrow = <View style={mainStyles.rowblock} >
    <View style={mainStyles.buttonContainer}>
      <Button title="+" onPress={() => plusButton()} />
      <Button title="-" onPress={() => minusButton()} />
      <Button title="Load" onPress={() => loadButton()} />
      <Button title="Save" onPress={() => saveButton()} />
      <Button title="Auto" onPress={() => setnav(!autonav)} />
    </View>
  </View>

  var virtualList = <VirtualizedList styles={mainStyles.list}
    data={emptyData}
    initialNumToRender={4}
    renderItem={renderItem}
    keyExtractor={(item, index) => index}
    getItemCount={getItemCount}
    getItem={getItem}
  />

  const mapref = React.createRef();
  const SCREEN_WIDTH = useWindowDimensions().width;
  const SCREEN_HEIGHT = useWindowDimensions().height;
  var smaps = { width: SCREEN_WIDTH, height: SCREEN_HEIGHT / 2 }
  if (SCREEN_WIDTH > SCREEN_HEIGHT) {
    smaps = { width: SCREEN_WIDTH, height: SCREEN_HEIGHT }
  }

  var mymap = <MapView ref={mapref} style={smaps} >
    {markers}
  </MapView>

  var alist = <View style={mainStyles.mainView} >
    {mymap}
    {buttonrow}
    {virtualList}
    <DialogInput isDialogVisible={ashowme}
      title="Enter Address"
      message="Enter The Adress To Add"
      submitInput={(inputText) => { setshowme(false); addLocation(inputText) }}
      closeDialog={() => { setshowme(false) }}
    >
      <Text>Something</Text>
    </DialogInput>
  </View>

  var ablist = <View style={mainStyles.mainView}>
    <View>
      {buttonrow}
      {virtualList}
      <DialogInput isDialogVisible={ashowme}
        title="Enter Address"
        message="Enter The Address To Add"
        submitInput={(inputText) => { setshowme(false); addLocation(inputText) }}
        closeDialog={() => { setshowme(false) }}
      >
        <Text>Something</Text>
      </DialogInput>
    </View>
    {mymap}
  </View>

  if (SCREEN_WIDTH > SCREEN_HEIGHT) {
    return ablist;
  }

  return (alist)
}

export default MapList
