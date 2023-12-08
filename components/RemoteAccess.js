import * as React from 'react'
import {VirtualizedList, TouchableOpacity, Button, FlatList, StyleSheet, Text, View} from 'react-native';

async function loadList(aurl,alist,asetlist,asetm) {
  const response = await fetch(aurl);
  const names = await response.json();
  names.forEach((item) => {
    alist.push(item);
  })

  var blist = <Marker
                coordinate={{latitude: 44.78825, 
                            longitude: -122.4324}}
                title={"title"}
                description={"description"}
              />

  const newList = alist.map((item) => {return item})

  const mList = alist.map((item) => {
    var newm = <Marker 
                  coordinate={{latitude: item.latitude, longitude: item.longitude}}
                  title={item.key}
                  description={"Airport"}
                />
                return newm
  })
  asetlist(newList);
  asetm(mList);
}

async function saveList(aurl, list) {
  const requestOptions ={
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(list),
  };
  const response = await fetch(aurl, requestOptions);
  console.log(response);
  console.log("save worked");
}

export {loadList}
export {saveList}