
/* ----------------------------------------
 Functions for datahandling and saving (*fxdata, *fxsave)
-------------------------------------------*/

function getURLParameter(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++){
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam){
            return sParameterName[1];
        }
    }
    console.log("The input was not found")
    return 'no_query'
};

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}
function randomIndex(arrayLength){
    var randIndex = Math.floor(Math.random() * arrayLength);
    return randIndex
}

function randomChoice(array, numChoices) {
    var shuffledArray = shuffle(array);
    var selectedItems = [];
    for (var s = 0; s < numChoices; s++) {
        selectedItems.push(shuffledArray[s]);
    }
    return selectedItems
}

function randomChoiceIndex(arrayLength, numChoices) {
    var indexList = [];
    for (var i = 0; i < arrayLength; i++){
        indexList.push(i)
    }
    var shuffledIndexList = shuffle(indexList);
    var selectedIndexes = [];
    for (var si = 0; si < numChoices; si++){
        selectedIndexes.push(shuffledIndexList[si]);
    }
    return selectedIndexes
}

function randomIntFromRange(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}
