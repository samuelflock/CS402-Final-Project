/**
 * HikeList.js
 * Description: Contains complex tags that display information relevant to a 
 * list of saved hikes. Contains many buttons to alter this list.
 */
import React, {useState, useEffect} from 'react';
import { VirtualizedList, Button, View} from 'react-native';
import Geocoder from 'react-native-geocoding';


// Import utilities
import {loadButton, saveButton} from '../components/Buttons.js';
import {Item} from '../components/ListItem.js';

// Import Styles
import {hikeListStyles} from '../styles/hikeList.js';

var emptyData = [];
Geocoder.init("AIzaSyDqW8jK0xxnIRKTKXACxIK-q3UerQTiCsA");


const HikeList = () => {

  // Declare state variables
  const[list, setlist] = useState([]); // Useful for setting the list of

  // necessary functions for the <VirtualList> Component
  const getItemCount = (data) => list.length;
  const getItem = (data, index) => (list[index]);


// Pass emptyData to VirtualList on initilaization

  useEffect(() => { // Does this execute on startup?
    if (list.length == 0) 
    {
      // var urladdress = "https://cs.boisestate.edu/~scutchin/cs402/codesnips/loadjson.php?user=martinguzman"
      // const response = loadList(urladdress, list,setlist,setMarks)
    }

  }, [list])


  function minusButton() {
    const newList = [];
    list.forEach((item) => {
      if (!item.selected) {
        newList.push(item);
      }
    })

    setlist(newList);
  }

  const renderHikeEntry = ({item, index}) => {
    const backgroundColor = item.selected ? 'black' : 'white';
    const color = item.selected ? 'white' : 'black';
    return (
      <Item item={item} 
        onPress={()=> {toggleList(index)}}
        styles = {hikeListStyles}
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
          if(autonav) {
            // This code directly below moves the camera to the given location!
            //mapref.current.animateToRegion({latitude: item.latitude, longitude: item.longitude,
            //latitudeDelta: 0.1, longitudeDelta: 0.1});
          }
          item.selected = true;
        }
      }
      else{
        item.selected=false;
      }
      return item;
    })
    setlist(newList);
  }



  /* Assemble the subparts of the tab below into the "hikesList" tab! */
  var buttonrow=
    <View style={hikeListStyles.rowblock}>
      <View style={hikeListStyles.buttonContainer}>
        <Button title="Remove Hike" onPress={() => minusButton()} />
        <Button title="Save To Server" onPress={() => saveButton()} />
        <Button title="Load From Server" onPress={() => loadButton()} />
      </View>
    </View>

  var virtualList=
    <VirtualizedList styles={hikeListStyles.list} data={emptyData}
                                              initialNumToRender={4}
                                              renderItem={renderHikeEntry}
                                              keyExtractor={(item,index)=>index}
                                              getItemCount={getItemCount}
                                              getItem={getItem}/>

  // Note: Variable "hikesList" is the container for this entire tab!
  var hikesList=
    <View style={hikeListStyles.mainView}>
      {buttonrow}
      {virtualList}
    </View>

  return (hikesList)
}

export {HikeList}