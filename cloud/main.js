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