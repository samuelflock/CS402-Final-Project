

import {loadList, saveList} from './RemoteAccess.js';

async function loadButton() {
  var urladdress = "https://cs.boisestate.edu/~scutchin/cs402/codesnips/loadjson.php?user=martinguzman"
  const response = loadList(urladdress, list, setlist)
}

async function saveButton() {
  var urladdress = "https://cs.boisestate.edu/~scutchin/cs402/codesnips/savejson.php?user=martinguzman";
  const response = saveList(urladdress, list);
  console.log(response);
  console.log("saveButton() worked!")
}

export {loadButton}
export {saveButton}