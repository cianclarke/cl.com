function getRecent(){
  // returns the global in shared
  var ret = [];
  for (var i=0; i<recent.length; i++){
    var r = recent[i];
    if (!r.disabled){
      ret.push(r);   
    }
  }
  return ret;
}

function getDailies(){
  // returns the global in shared
  var ret = [];
  for (var i=dailies.length-1; i>0; i--){
    var r = dailies[i];
    if (!r.disabled){
      ret.push(r);   
    }
  }
  return ret;
}

function getExhibitions(){
  // returns the global in shared
  var ret = [];
  for (var i=0; i<exhibitions.length; i++){
    var r = dailies[i];
    if (!r.disabled){
      ret.push(r);   
    }
  }
  return exhibitions;
}