
// Import packages
import React, {useState, useEffect} from 'react';
import {Alert, Dimensions, VirtualizedList, TouchableOpacity, Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {Item} from './components/ListItem.js';
import {loadList, saveList} from './components/RemoteAccess.js';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {useWindowDimensions} from 'react-native';
import DialogInput from 'react-native-dialog-input';
import Geocoder from 'react-native-geocoding';



// Passed to the virtualized list
var emptyData = [];
Geocoder.init("AIzaSyDqW8jK0xxnIRKTKXACxIK-q3UerQTiCsA");

// Create main body of application
const MapList = () => {
  // Declare dynamic variables
  const[list, setList] = useState([]);
  const[autoNav, setNav] = useState(true);
  const[aShowMe, setShowMe] = useState(false);

  // locations
  var blist = <Marker coordinate = {{latitude: 40.78825, longitude: -122.4324}}
                      title={"place1"}
                      description={"description"}/>;

  var mboise = <Marker  coordinate = {{latitude: 37.78825, longitude: -122.4324}}
                        title={"place2"}
                        description={"description"}/>;
  
  var mList = [blist,mboise];

  const [markers, setMarks] = useState(mList);

  // necessary functions for the <VirtualList> Component
  const getItemCount = (data) => list.length;
  const getItem = (data, index) => (list[index]);

  useEffect(() => {
    if (list.length == 0) {
      var urladdress = "https://cs.boisestate.edu/~scutchin/cs402/codesnips/loadjson.php?user=martinguzman"
      const response = loadList(urladdress, list,setList,setMarks)
    }

  }, [list])

  function load() {
    var urladdress = "https://cs.boisestate.edu/~scutchin/cs402/codesnips/loadjson.php?user=martinguzman"
    const response = loadList(urladdress, list, setList)
  }


  function save() {
    var urladdress = "https://cs.boisestate.edu/~scutchin/cs402/codesnips/savejson.php?user=martinguzman";
    const response = saveList(urladdress, list);
    console.log(response);
    console.log("saveButton() worked!")
  }

  function plusButton() {
    setShowMe(true);
  }

  function addLocation(alocation) {
    var location = {};

    Geocoder.from(alocation)
    .then(json => {
      location = json.results[0].geometry.location;
      console.log(location);
      
      var newList = [{key: alocation, selected: false, longitude: location.lng, latitude: location.lat}]
      var amark = <Marker
                    coordinate={{latitude:location.lat, longitude: location.lng}}
                    title = {alocation}
                    description={"Airport"}
                  />
      newList = newList.concat(list);
      var marklist = markers.concat(amark);
      setList(newList);
      setMarks(marklist);
    })
    .catch(error => console.warn(error));
  }

  function deleteButton() {
    const newList = [];
    list.forEach((item) => {
      if (!item.selected) {
        newList.push(item);
      }
    })

    setList(newList);
  }

  const renderItem = ({item, index}) => {
    const backgroundColor = item.selected ? 'black' : 'white';
    const color = item.selected ? 'white' : 'black';
    return (
      <Item item={item} 
        onPress={()=> {toggleList(index)}} 
        backgroundColor={{backgroundColor}} 
        textColor={{color}}
      />
    );
  }
  
  function toggleList(aindex){
    const newList = list.map((item, index) => {
      if (aindex == index) {
        if (item.selected) {
          item.selected=false;
        }
        else {
          if(autoNav) {
            mapRef.current.animateToRegion({latitude: item.latitude, longitude: item.longitude,
            latitudeDelta: 0.1, longitudeDelta: 0.1});
          }
          item.selected = true;
        }
      }
      else{
        item.selected=false;
      }
      return item;
    })
    setList(newList);
  }

  // Create the logical and graphical representation of the page.
  var buttonRow = <View style={styles.rowblock} >
                    <View style={styles.buttonContainer}>
                      <Button title="+" onPress={() => plusButton()} />
                      <Button title="-" onPress={() => deleteButton()} />
                      <Button title="Load" onPress={() => load()} />
                      <Button title="Save" onPress={() => save()} />
                      <Button title="Auto" onPress={() => setNav(!autoNav)} />
                    </View>
                  </View>;

  var virtualList = <VirtualizedList  styles={styles.list}
                                      data={emptyData}
                                      initialNumToRender={4}
                                      renderItem={renderItem}
                                      keyExtractor={(item,index)=>index}
                                      getItemCount={getItemCount}
                                      getItem={getItem}/>;

  const mapRef = React.createRef();
  const SCREEN_WIDTH = useWindowDimensions().width;
  const SCREEN_HEIGHT = useWindowDimensions().height;
  var smaps = {width: SCREEN_WIDTH, height: SCREEN_HEIGHT/2}
  if (SCREEN_WIDTH>SCREEN_HEIGHT) {
    smaps = {width: SCREEN_WIDTH, height: SCREEN_HEIGHT}
  }

  var mymap=<MapView ref={mapRef} style={smaps} >
                {markers}
            </MapView>    

  var alist=<View style={styles.container} >
      {mymap}
      {buttonRow}
      {virtualList}
      <DialogInput isDialogVisible={aShowMe}
        title="Enter Address"
        message="Enter The Adress To Add"
        submitInput={(inputText) => {setShowMe(false); addLocation(inputText)}}
        closeDialog={()=>{setShowMe(false)}}
        >
      <Text>Something</Text>
      </DialogInput>  
    </View>

  var ablist =  <View style={styles.container}>
                  <View>
                    {buttonRow}
                    {virtualList}
                    <DialogInput  isDialogVisible={aShowMe}
                                  title="EnterAddress"
                                  message="Enter The Address To Add"
                                  submitInput={(inputText) => {setShowMe(false); addLocation(inputText)}}
                                  closeDialog={()=>{setShowMe(false)}}>
                      <Text>Something</Text>
                    </DialogInput>
                  </View>
                  {mymap}
                </View>

  if (SCREEN_WIDTH>SCREEN_HEIGHT) {
    return ablist;
  }

  return (alist)
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    allignItems: 'center',
    justifyContent: 'center',
    maxHeight: 35,
    minHeight: 35,
    backgroundColor: "#FFF",
    alignItems: 'center',
  },
  list: {
    flex: 20,
    paddingTop: 5,
    backgroundColor: "gray",
    borderWidth: 5,
  },
  rowblock: {
    height: 80,
    width: 300,
    padding: 15,
    borderWidth: 2,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 5,
    padding: 0,
    paddingTop: 0,
  },
});

export default MapList