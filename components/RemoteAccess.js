import * as React from 'react'


async function loadList(aurl,alist,asetlist,asetm) {
  const response = await fetch(aurl);
  const names = await response.json();
  names.forEach((item) => {alist.push(item);})

  const newList = alist.map((item) => {return item})

  const mList = alist.map((item) => {
    var newm = 
      <Marker coordinate={{latitude: item.latitude, longitude: item.longitude}}
              title={item.key}
              description={"Hike path"}/>
    return newm
  })
  asetlist(newList);
  asetm(mList);
}

async function saveList(aurl, list) {
  const requestOptions ={ method: 'POST',
                          headers: {'Content-Type': 'application/json'},
                          body: JSON.stringify(list),
  };
  const response = await fetch(aurl, requestOptions);
  console.log(response);
  console.log("save worked");
}

export {loadList}
export {saveList}