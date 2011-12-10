
if(!this.JSON){JSON=function(){function f(n){return n<10?'0'+n:n;}
Date.prototype.toJSON=function(){return this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z';};var escapeable=/["\\\x00-\x1f\x7f-\x9f]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){return escapeable.test(string)?'"'+string.replace(escapeable,function(a){var c=meta[a];if(typeof c==='string'){return c;}
c=a.charCodeAt();return'\\u00'+Math.floor(c/16).toString(16)+
(c%16).toString(16);})+'"':'"'+string+'"';}
function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}
if(typeof rep==='function'){value=rep.call(holder,key,value);}
switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
gap+=indent;partial=[];if(typeof value.length==='number'&&!(value.propertyIsEnumerable('length'))){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}
v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}
if(typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value,rep);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){v=str(k,value,rep);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}
v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}
return{stringify:function(value,replacer,space){var i;gap='';indent='';if(space){if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}}
if(!replacer){rep=function(key,value){if(!Object.hasOwnProperty.call(this,key)){return undefined;}
return value;};}else if(typeof replacer==='function'||(typeof replacer==='object'&&typeof replacer.length==='number')){rep=replacer;}else{throw new Error('JSON.stringify');}
return str('',{'':value});},parse:function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
return reviver.call(holder,key,value);}
if(/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
throw new SyntaxError('JSON.parse');},quote:quote};}();}
(function(){if(window.google&&google.gears)
return;var F=null;if(typeof GearsFactory!='undefined'){F=new GearsFactory();}else{try{F=new ActiveXObject('Gears.Factory');if(F.getBuildInfo().indexOf('ie_mobile')!=-1)
F.privateSetGlobalObject(this);}catch(e){if((typeof navigator.mimeTypes!='undefined')&&navigator.mimeTypes["application/x-googlegears"]){F=document.createElement("object");F.style.display="none";F.width=0;F.height=0;F.type="application/x-googlegears";document.documentElement.appendChild(F);}}}
if(!F)
return;if(!window.google)
google={};if(!google.gears)
google.gears={factory:F};})();Persist=(function(){var VERSION='0.2.0',P,B,esc,init,empty,ec;ec=(function(){var EPOCH='Thu, 01-Jan-1970 00:00:01 GMT',RATIO=1000*60*60*24,KEYS=['expires','path','domain'],esc=escape,un=unescape,doc=document,me;var get_now=function(){var r=new Date();r.setTime(r.getTime());return r;}
var cookify=function(c_key,c_val){var i,key,val,r=[],opt=(arguments.length>2)?arguments[2]:{};r.push(esc(c_key)+'='+esc(c_val));for(i=0;i<KEYS.length;i++){key=KEYS[i];if(val=opt[key])
r.push(key+'='+val);}
if(opt.secure)
r.push('secure');return r.join('; ');}
var alive=function(){var k='__EC_TEST__',v=new Date();v=v.toGMTString();this.set(k,v);this.enabled=(this.remove(k)==v);return this.enabled;}
me={set:function(key,val){var opt=(arguments.length>2)?arguments[2]:{},now=get_now(),expire_at,cfg={};if(opt.expires){opt.expires*=RATIO;cfg.expires=new Date(now.getTime()+opt.expires);cfg.expires=cfg.expires.toGMTString();}
var keys=['path','domain','secure'];for(i=0;i<keys.length;i++)
if(opt[keys[i]])
cfg[keys[i]]=opt[keys[i]];var r=cookify(key,val,cfg);doc.cookie=r;return val;},has:function(key){key=esc(key);var c=doc.cookie,ofs=c.indexOf(key+'='),len=ofs+key.length+1,sub=c.substring(0,key.length);return((!ofs&&key!=sub)||ofs<0)?false:true;},get:function(key){key=esc(key);var c=doc.cookie,ofs=c.indexOf(key+'='),len=ofs+key.length+1,sub=c.substring(0,key.length),end;if((!ofs&&key!=sub)||ofs<0)
return null;end=c.indexOf(';',len);if(end<0)
end=c.length;return un(c.substring(len,end));},remove:function(k){var r=me.get(k),opt={expires:EPOCH};doc.cookie=cookify(k,'',opt);return r;},keys:function(){var c=doc.cookie,ps=c.split('; '),i,p,r=[];for(i=0;i<ps.length;i++){p=ps[i].split('=');r.push(un(p[0]));}
return r;},all:function(){var c=doc.cookie,ps=c.split('; '),i,p,r=[];for(i=0;i<ps.length;i++){p=ps[i].split('=');r.push([un(p[0]),un(p[1])]);}
return r;},version:'0.2.1',enabled:false};me.enabled=alive.call(me);return me;}());var index_of=(function(){if(Array.prototype.indexOf)
return function(ary,val){return Array.prototype.indexOf.call(ary,val);};else
return function(ary,val){var i,l;for(i=0,l=ary.length;i<l;i++)
if(ary[i]==val)
return i;return-1;};})();empty=function(){};esc=function(str){return'PS'+str.replace(/_/g,'__').replace(/ /g,'_s');};C={search_order:['localstorage','whatwg_db','globalstorage','gears','ie','flash','cookie'],name_re:/^[a-z][a-z0-9_ -]+$/i,methods:['init','get','set','remove','load','save'],sql:{version:'1',create:"CREATE TABLE IF NOT EXISTS persist_data (k TEXT UNIQUE NOT NULL PRIMARY KEY, v TEXT NOT NULL)",get:"SELECT v FROM persist_data WHERE k = ?",set:"INSERT INTO persist_data(k, v) VALUES (?, ?)",remove:"DELETE FROM persist_data WHERE k = ?"},flash:{div_id:'_persist_flash_wrap',id:'_persist_flash',path:'persist.swf',size:{w:1,h:1},args:{autostart:true}}};B={gears:{size:-1,test:function(){return(window.google&&window.google.gears)?true:false;},methods:{transaction:function(fn){var db=this.db;db.execute('BEGIN').close();fn.call(this,db);db.execute('COMMIT').close();},init:function(){var db;db=this.db=google.gears.factory.create('beta.database');db.open(esc(this.name));db.execute(C.sql.create).close();},get:function(key,fn,scope){var r,sql=C.sql.get;if(!fn)
return;this.transaction(function(t){var is_valid,val;r=t.execute(sql,[key]);is_valid=r.isValidRow();val=is_valid?r.field(0):null;r.close();fn.call(scope||this,is_valid,val);});},set:function(key,val,fn,scope){var rm_sql=C.sql.remove,sql=C.sql.set,r;this.transaction(function(t){t.execute(rm_sql,[key]).close();t.execute(sql,[key,val]).close();if(fn)
fn.call(scope||this,true,val);});},remove:function(key,fn,scope){var get_sql=C.sql.get;sql=C.sql.remove,r,val=null,is_valid=false;this.transaction(function(t){if(fn){r=t.execute(get_sql,[key]);is_valid=r.isValidRow();val=is_valid?r.field(0):null;r.close();}
if(!fn||is_valid){t.execute(sql,[key]).close();}
if(fn)
fn.call(scope||this,is_valid,val);});}}},whatwg_db:{size:200*1024,test:function(){var name='PersistJS Test',desc='Persistent database test.';if(!window.openDatabase)
return false;if(!window.openDatabase(name,C.sql.version,desc,B.whatwg_db.size))
return false;return true;},methods:{transaction:function(fn){if(!this.db_created){this.db.transaction(function(t){t.executeSql(C.sql.create,[],function(){this.db_created=true;});},empty);}
this.db.transaction(fn);},init:function(){this.db=openDatabase(this.name,C.sql.version,this.o.about||("Persistent storage for "+this.name),this.o.size||B.whatwg_db.size);},get:function(key,fn,scope){var sql=C.sql.get;if(!fn)
return;scope=scope||this;this.transaction(function(t){t.executeSql(sql,[key],function(t,r){if(r.rows.length>0)
fn.call(scope,true,r.rows.item(0)['v']);else
fn.call(scope,false,null);});});},set:function(key,val,fn,scope){var rm_sql=C.sql.remove,sql=C.sql.set;this.transaction(function(t){t.executeSql(rm_sql,[key],function(){t.executeSql(sql,[key,val],function(t,r){if(fn)
fn.call(scope||this,true,val);});});});return val;},remove:function(key,fn,scope){var get_sql=C.sql.get;sql=C.sql.remove;this.transaction(function(t){if(fn){t.executeSql(get_sql,[key],function(t,r){if(r.rows.length>0){var val=r.rows.item(0)['v'];t.executeSql(sql,[key],function(t,r){fn.call(scope||this,true,val);});}else{fn.call(scope||this,false,null);}});}else{t.executeSql(sql,[key]);}});}}},globalstorage:{size:5*1024*1024,test:function(){return window.globalStorage?true:false;},methods:{key:function(key){return esc(this.name)+esc(key);},init:function(){alert('domain = '+this.o.domain);this.store=globalStorage[this.o.domain];},get:function(key,fn,scope){key=this.key(key);if(fn)
fn.call(scope||this,true,this.store.getItem(key));},set:function(key,val,fn,scope){key=this.key(key);this.store.setItem(key,val);if(fn)
fn.call(scope||this,true,val);},remove:function(key,fn,scope){var val;key=this.key(key);val=this.store[key];this.store.removeItem(key);if(fn)
fn.call(scope||this,(val!==null),val);}}},localstorage:{size:-1,test:function(){return window.localStorage?true:false;},methods:{key:function(key){return esc(this.name)+esc(key);},init:function(){this.store=localStorage;},get:function(key,fn,scope){key=this.key(key);if(fn)
fn.call(scope||this,true,this.store.getItem(key));},set:function(key,val,fn,scope){key=this.key(key);this.store.setItem(key,val);if(fn)
fn.call(scope||this,true,val);},remove:function(key,fn,scope){var val;key=this.key(key);val=this.store.getItem(key);this.store.removeItem(key);if(fn)
fn.call(scope||this,(val!==null),val);}}},ie:{prefix:'_persist_data-',size:64*1024,test:function(){return window.ActiveXObject?true:false;},make_userdata:function(id){var el=document.createElement('div');el.id=id;el.style.display='none';el.addBehavior('#default#userdata');document.body.appendChild(el);return el;},methods:{init:function(){var id=B.ie.prefix+esc(this.name);this.el=B.ie.make_userdata(id);if(this.o.defer)
this.load();},get:function(key,fn,scope){var val;key=esc(key);if(!this.o.defer)
this.load();val=this.el.getAttribute(key);if(fn)
fn.call(scope||this,val?true:false,val);},set:function(key,val,fn,scope){key=esc(key);this.el.setAttribute(key,val);if(!this.o.defer)
this.save();if(fn)
fn.call(scope||this,true,val);},remove:function(key,fn,scope){var val;key=esc(key);if(!this.o.defer)
this.load();val=this.el.getAttribute(key);this.el.removeAttribute(key);if(!this.o.defer)
this.save();if(fn)
fn.call(scope||this,val?true:false,val);},load:function(){this.el.load(esc(this.name));},save:function(){this.el.save(esc(this.name));}}},cookie:{delim:':',size:4000,test:function(){return P.Cookie.enabled?true:false;},methods:{key:function(key){return this.name+B.cookie.delim+key;},get:function(key,fn,scope){var val;key=this.key(key);val=ec.get(key);if(fn)
fn.call(scope||this,val!=null,val);},set:function(key,val,fn,scope){key=this.key(key);ec.set(key,val,this.o);if(fn)
fn.call(scope||this,true,val);},remove:function(key,val,fn,scope){var val;key=this.key(key);val=ec.remove(key)
if(fn)
fn.call(scope||this,val!=null,val);}}},flash:{test:function(){if(!deconcept||!deconcept.SWFObjectUtil)
return false;var major=deconcept.SWFObjectUtil.getPlayerVersion().major;return(major>=8)?true:false;},methods:{init:function(){if(!B.flash.el){var o,key,el,cfg=C.flash;el=document.createElement('div');el.id=cfg.div_id;document.body.appendChild(el);o=new deconcept.SWFObject(this.o.swf_path||cfg.path,cfg.id,cfg.size.w,cfg.size.h,'8');for(key in cfg.args)
o.addVariable(key,cfg.args[key]);o.write(el);B.flash.el=document.getElementById(cfg.id);}
this.el=B.flash.el;},get:function(key,fn,scope){var val;key=esc(key);val=this.el.get(this.name,key);if(fn)
fn.call(scope||this,val!==null,val);},set:function(key,val,fn,scope){var old_val;key=esc(key);old_val=this.el.set(this.name,key,val);if(fn)
fn.call(scope||this,true,val);},remove:function(key,fn,scope){var val;key=esc(key);val=this.el.remove(this.name,key);if(fn)
fn.call(scope||this,true,val);}}}};var init=function(){var i,l,b,key,fns=C.methods,keys=C.search_order;for(i=0,l=fns.length;i<l;i++)
P.Store.prototype[fns[i]]=empty;P.type=null;P.size=-1;for(i=0,l=keys.length;!P.type&&i<l;i++){b=B[keys[i]];if(b.test()){P.type=keys[i];P.size=b.size;for(key in b.methods)
P.Store.prototype[key]=b.methods[key];}}
P._init=true;};P={VERSION:VERSION,type:null,size:0,add:function(o){B[o.id]=o;C.search_order=[o.id].concat(C.search_order);init();},remove:function(id){var ofs=index_of(C.search_order,id);if(ofs<0)
return;C.search_order.splice(ofs,1);delete B[id];init();},Cookie:ec,Store:function(name,o){if(!C.name_re.exec(name))
throw new Error("Invalid name");if(!P.type)
throw new Error("No suitable storage found");o=o||{};this.name=name;o.domain=o.domain||location.host||'localhost';o.domain=o.domain.replace(/:\d+$/,'')
this.o=o;o.expires=o.expires||365*2;o.path=o.path||'/';this.init();}};init();return P;})();if(typeof deconcept=="undefined")var deconcept=new Object();if(typeof deconcept.util=="undefined")deconcept.util=new Object();if(typeof deconcept.SWFObjectUtil=="undefined")deconcept.SWFObjectUtil=new Object();deconcept.SWFObject=function(swf,id,w,h,ver,c,quality,xiRedirectUrl,redirectUrl,detectKey){if(!document.getElementById){return;}
this.DETECT_KEY=detectKey?detectKey:'detectflash';this.skipDetect=deconcept.util.getRequestParameter(this.DETECT_KEY);this.params=new Object();this.variables=new Object();this.attributes=new Array();if(swf){this.setAttribute('swf',swf);}
if(id){this.setAttribute('id',id);}
if(w){this.setAttribute('width',w);}
if(h){this.setAttribute('height',h);}
if(ver){this.setAttribute('version',new deconcept.PlayerVersion(ver.toString().split(".")));}
this.installedVer=deconcept.SWFObjectUtil.getPlayerVersion();if(!window.opera&&document.all&&this.installedVer.major>7){deconcept.SWFObject.doPrepUnload=true;}
if(c){this.addParam('bgcolor',c);}
var q=quality?quality:'high';this.addParam('quality',q);this.setAttribute('useExpressInstall',false);this.setAttribute('doExpressInstall',false);var xir=(xiRedirectUrl)?xiRedirectUrl:window.location;this.setAttribute('xiRedirectUrl',xir);this.setAttribute('redirectUrl','');if(redirectUrl){this.setAttribute('redirectUrl',redirectUrl);}}
deconcept.SWFObject.prototype={useExpressInstall:function(path){this.xiSWFPath=!path?"expressinstall.swf":path;this.setAttribute('useExpressInstall',true);},setAttribute:function(name,value){this.attributes[name]=value;},getAttribute:function(name){return this.attributes[name];},addParam:function(name,value){this.params[name]=value;},getParams:function(){return this.params;},addVariable:function(name,value){this.variables[name]=value;},getVariable:function(name){return this.variables[name];},getVariables:function(){return this.variables;},getVariablePairs:function(){var variablePairs=new Array();var key;var variables=this.getVariables();for(key in variables){variablePairs.push(key+"="+variables[key]);}
return variablePairs;},getSWFHTML:function(){var swfNode="";if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","PlugIn");this.setAttribute('swf',this.xiSWFPath);}
swfNode='<embed type="application/x-shockwave-flash" src="'+this.getAttribute('swf')+'" width="'+this.getAttribute('width')+'" height="'+this.getAttribute('height')+'"';swfNode+=' id="'+this.getAttribute('id')+'" name="'+this.getAttribute('id')+'" ';var params=this.getParams();for(var key in params){swfNode+=[key]+'="'+params[key]+'" ';}
var pairs=this.getVariablePairs().join("&");if(pairs.length>0){swfNode+='flashvars="'+pairs+'"';}
swfNode+='/>';}else{if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","ActiveX");this.setAttribute('swf',this.xiSWFPath);}
swfNode='<object id="'+this.getAttribute('id')+'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+this.getAttribute('width')+'" height="'+this.getAttribute('height')+'">';swfNode+='<param name="movie" value="'+this.getAttribute('swf')+'" />';var params=this.getParams();for(var key in params){swfNode+='<param name="'+key+'" value="'+params[key]+'" />';}
var pairs=this.getVariablePairs().join("&");if(pairs.length>0){swfNode+='<param name="flashvars" value="'+pairs+'" />';}
swfNode+="</object>";}
return swfNode;},write:function(elementId){if(this.getAttribute('useExpressInstall')){var expressInstallReqVer=new deconcept.PlayerVersion([6,0,65]);if(this.installedVer.versionIsValid(expressInstallReqVer)&&!this.installedVer.versionIsValid(this.getAttribute('version'))){this.setAttribute('doExpressInstall',true);this.addVariable("MMredirectURL",escape(this.getAttribute('xiRedirectUrl')));document.title=document.title.slice(0,47)+" - Flash Player Installation";this.addVariable("MMdoctitle",document.title);}}
if(this.skipDetect||this.getAttribute('doExpressInstall')||this.installedVer.versionIsValid(this.getAttribute('version'))){var n=(typeof elementId=='string')?document.getElementById(elementId):elementId;n.innerHTML=this.getSWFHTML();return true;}else{if(this.getAttribute('redirectUrl')!=""){document.location.replace(this.getAttribute('redirectUrl'));}}
return false;}}
deconcept.SWFObjectUtil.getPlayerVersion=function(){var PlayerVersion=new deconcept.PlayerVersion([0,0,0]);if(navigator.plugins&&navigator.mimeTypes.length){var x=navigator.plugins["Shockwave Flash"];if(x&&x.description){PlayerVersion=new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));}}else{try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");}catch(e){try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");PlayerVersion=new deconcept.PlayerVersion([6,0,21]);axo.AllowScriptAccess="always";}catch(e){if(PlayerVersion.major==6){return PlayerVersion;}}
try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");}catch(e){}}
if(axo!=null){PlayerVersion=new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));}}
return PlayerVersion;}
deconcept.PlayerVersion=function(arrVersion){this.major=arrVersion[0]!=null?parseInt(arrVersion[0]):0;this.minor=arrVersion[1]!=null?parseInt(arrVersion[1]):0;this.rev=arrVersion[2]!=null?parseInt(arrVersion[2]):0;}
deconcept.PlayerVersion.prototype.versionIsValid=function(fv){if(this.major<fv.major)return false;if(this.major>fv.major)return true;if(this.minor<fv.minor)return false;if(this.minor>fv.minor)return true;if(this.rev<fv.rev)return false;return true;}
deconcept.util={getRequestParameter:function(param){var q=document.location.search||document.location.hash;if(q){var pairs=q.substring(1).split("&");for(var i=0;i<pairs.length;i++){if(pairs[i].substring(0,pairs[i].indexOf("="))==param){return pairs[i].substring((pairs[i].indexOf("=")+1));}}}
return"";}}
deconcept.SWFObjectUtil.cleanupSWFs=function(){var objects=document.getElementsByTagName("OBJECT");for(var i=0;i<objects.length;i++){objects[i].style.display='none';for(var x in objects[i]){if(typeof objects[i][x]=='function'){objects[i][x]=function(){};}}}}
if(deconcept.SWFObject.doPrepUnload){deconcept.SWFObjectUtil.prepUnload=function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){};window.attachEvent("onunload",deconcept.SWFObjectUtil.cleanupSWFs);}
window.attachEvent("onbeforeunload",deconcept.SWFObjectUtil.prepUnload);}
if(Array.prototype.push==null){Array.prototype.push=function(item){this[this.length]=item;return this.length;}}
var getQueryParamValue=deconcept.util.getRequestParameter;var FlashObject=deconcept.SWFObject;var SWFObject=deconcept.SWFObject;var biRadixBase=2;var biRadixBits=16;var bitsPerDigit=biRadixBits;var biRadix=1<<16;var biHalfRadix=biRadix>>>1;var biRadixSquared=biRadix*biRadix;var maxDigitVal=biRadix-1;var maxInteger=9999999999999998;var maxDigits;var ZERO_ARRAY;var bigZero,bigOne;function setMaxDigits(value){maxDigits=value;ZERO_ARRAY=new Array(maxDigits);for(var iza=0;iza<ZERO_ARRAY.length;iza++)ZERO_ARRAY[iza]=0;bigZero=new BigInt();bigOne=new BigInt();bigOne.digits[0]=1;}
setMaxDigits(20);var dpl10=15;var lr10=biFromNumber(1000000000000000);function BigInt(flag){if(typeof flag=="boolean"&&flag==true){this.digits=null;}else{this.digits=ZERO_ARRAY.slice(0);}
this.isNeg=false;}
function biFromDecimal(s){var isNeg=s.charAt(0)=='-';var i=isNeg?1:0;var result;while(i<s.length&&s.charAt(i)=='0')++i;if(i==s.length){result=new BigInt();}else{var digitCount=s.length-i;var fgl=digitCount%dpl10;if(fgl==0)fgl=dpl10;result=biFromNumber(Number(s.substr(i,fgl)));i+=fgl;while(i<s.length){result=biAdd(biMultiply(result,lr10),biFromNumber(Number(s.substr(i,dpl10))));i+=dpl10;}
result.isNeg=isNeg;}
return result;}
function biCopy(bi){var result=new BigInt(true);result.digits=bi.digits.slice(0);result.isNeg=bi.isNeg;return result;}
function biFromNumber(i){var result=new BigInt();result.isNeg=i<0;i=Math.abs(i);var j=0;while(i>0){result.digits[j++]=i&maxDigitVal;i>>=biRadixBits;}
return result;}
function reverseStr(s){var result="";for(var i=s.length-1;i>-1;--i){result+=s.charAt(i);}
return result;}
var hexatrigesimalToChar=new Array('0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');function biToString(x,radix)
{var b=new BigInt();b.digits[0]=radix;var qr=biDivideModulo(x,b);var result=hexatrigesimalToChar[qr[1].digits[0]];while(biCompare(qr[0],bigZero)==1){qr=biDivideModulo(qr[0],b);digit=qr[1].digits[0];result+=hexatrigesimalToChar[qr[1].digits[0]];}
return(x.isNeg?"-":"")+reverseStr(result);}
function biToDecimal(x){var b=new BigInt();b.digits[0]=10;var qr=biDivideModulo(x,b);var result=String(qr[1].digits[0]);while(biCompare(qr[0],bigZero)==1){qr=biDivideModulo(qr[0],b);result+=String(qr[1].digits[0]);}
return(x.isNeg?"-":"")+reverseStr(result);}
var hexToChar=new Array('0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f');function digitToHex(n){var mask=0xf;var result="";for(i=0;i<4;++i){result+=hexToChar[n&mask];n>>>=4;}
return reverseStr(result);}
function biToHex(x){var result="";var n=biHighIndex(x);for(var i=biHighIndex(x);i>-1;--i){result+=digitToHex(x.digits[i]);}
return result;}
function charToHex(c){var ZERO=48;var NINE=ZERO+9;var littleA=97;var littleZ=littleA+25;var bigA=65;var bigZ=65+25;var result;if(c>=ZERO&&c<=NINE){result=c-ZERO;}else if(c>=bigA&&c<=bigZ){result=10+c-bigA;}else if(c>=littleA&&c<=littleZ){result=10+c-littleA;}else{result=0;}
return result;}
function hexToDigit(s){var result=0;var sl=Math.min(s.length,4);for(var i=0;i<sl;++i){result<<=4;result|=charToHex(s.charCodeAt(i))}
return result;}
function biFromHex(s){var result=new BigInt();var sl=s.length;for(var i=sl,j=0;i>0;i-=4,++j){result.digits[j]=hexToDigit(s.substr(Math.max(i-4,0),Math.min(i,4)));}
return result;}
function biFromString(s,radix){var isNeg=s.charAt(0)=='-';var istop=isNeg?1:0;var result=new BigInt();var place=new BigInt();place.digits[0]=1;for(var i=s.length-1;i>=istop;i--){var c=s.charCodeAt(i);var digit=charToHex(c);var biDigit=biMultiplyDigit(place,digit);result=biAdd(result,biDigit);place=biMultiplyDigit(place,radix);}
result.isNeg=isNeg;return result;}
function biDump(b){return(b.isNeg?"-":"")+b.digits.join(" ");}
function biAdd(x,y){var result;if(x.isNeg!=y.isNeg){y.isNeg=!y.isNeg;result=biSubtract(x,y);y.isNeg=!y.isNeg;}else{result=new BigInt();var c=0;var n;for(var i=0;i<x.digits.length;++i){n=x.digits[i]+y.digits[i]+c;result.digits[i]=n&0xffff;c=Number(n>=biRadix);}
result.isNeg=x.isNeg;}
return result;}
function biSubtract(x,y){var result;if(x.isNeg!=y.isNeg){y.isNeg=!y.isNeg;result=biAdd(x,y);y.isNeg=!y.isNeg;}else{result=new BigInt();var n,c;c=0;for(var i=0;i<x.digits.length;++i){n=x.digits[i]-y.digits[i]+c;result.digits[i]=n&0xffff;if(result.digits[i]<0)result.digits[i]+=biRadix;c=0-Number(n<0);}
if(c==-1){c=0;for(var i=0;i<x.digits.length;++i){n=0-result.digits[i]+c;result.digits[i]=n&0xffff;if(result.digits[i]<0)result.digits[i]+=biRadix;c=0-Number(n<0);}
result.isNeg=!x.isNeg;}else{result.isNeg=x.isNeg;}}
return result;}
function biHighIndex(x){var result=x.digits.length-1;while(result>0&&x.digits[result]==0)--result;return result;}
function biNumBits(x){var n=biHighIndex(x);var d=x.digits[n];var m=(n+1)*bitsPerDigit;var result;for(result=m;result>m-bitsPerDigit;--result){if((d&0x8000)!=0)break;d<<=1;}
return result;}
function biMultiply(x,y){var result=new BigInt();var c;var n=biHighIndex(x);var t=biHighIndex(y);var u,uv,k;for(var i=0;i<=t;++i){c=0;k=i;for(j=0;j<=n;++j,++k){uv=result.digits[k]+x.digits[j]*y.digits[i]+c;result.digits[k]=uv&maxDigitVal;c=uv>>>biRadixBits;}
result.digits[i+n+1]=c;}
result.isNeg=x.isNeg!=y.isNeg;return result;}
function biMultiplyDigit(x,y){var n,c,uv;result=new BigInt();n=biHighIndex(x);c=0;for(var j=0;j<=n;++j){uv=result.digits[j]+x.digits[j]*y+c;result.digits[j]=uv&maxDigitVal;c=uv>>>biRadixBits;}
result.digits[1+n]=c;return result;}
function arrayCopy(src,srcStart,dest,destStart,n){var m=Math.min(srcStart+n,src.length);for(var i=srcStart,j=destStart;i<m;++i,++j){dest[j]=src[i];}}
var highBitMasks=new Array(0x0000,0x8000,0xC000,0xE000,0xF000,0xF800,0xFC00,0xFE00,0xFF00,0xFF80,0xFFC0,0xFFE0,0xFFF0,0xFFF8,0xFFFC,0xFFFE,0xFFFF);function biShiftLeft(x,n){var digitCount=Math.floor(n/bitsPerDigit);var result=new BigInt();arrayCopy(x.digits,0,result.digits,digitCount,result.digits.length-digitCount);var bits=n%bitsPerDigit;var rightBits=bitsPerDigit-bits;for(var i=result.digits.length-1,i1=i-1;i>0;--i,--i1){result.digits[i]=((result.digits[i]<<bits)&maxDigitVal)|((result.digits[i1]&highBitMasks[bits])>>>(rightBits));}
result.digits[0]=((result.digits[i]<<bits)&maxDigitVal);result.isNeg=x.isNeg;return result;}
var lowBitMasks=new Array(0x0000,0x0001,0x0003,0x0007,0x000F,0x001F,0x003F,0x007F,0x00FF,0x01FF,0x03FF,0x07FF,0x0FFF,0x1FFF,0x3FFF,0x7FFF,0xFFFF);function biShiftRight(x,n){var digitCount=Math.floor(n/bitsPerDigit);var result=new BigInt();arrayCopy(x.digits,digitCount,result.digits,0,x.digits.length-digitCount);var bits=n%bitsPerDigit;var leftBits=bitsPerDigit-bits;for(var i=0,i1=i+1;i<result.digits.length-1;++i,++i1){result.digits[i]=(result.digits[i]>>>bits)|((result.digits[i1]&lowBitMasks[bits])<<leftBits);}
result.digits[result.digits.length-1]>>>=bits;result.isNeg=x.isNeg;return result;}
function biMultiplyByRadixPower(x,n){var result=new BigInt();arrayCopy(x.digits,0,result.digits,n,result.digits.length-n);return result;}
function biDivideByRadixPower(x,n){var result=new BigInt();arrayCopy(x.digits,n,result.digits,0,result.digits.length-n);return result;}
function biModuloByRadixPower(x,n){var result=new BigInt();arrayCopy(x.digits,0,result.digits,0,n);return result;}
function biCompare(x,y){if(x.isNeg!=y.isNeg){return 1-2*Number(x.isNeg);}
for(var i=x.digits.length-1;i>=0;--i){if(x.digits[i]!=y.digits[i]){if(x.isNeg){return 1-2*Number(x.digits[i]>y.digits[i]);}else{return 1-2*Number(x.digits[i]<y.digits[i]);}}}
return 0;}
function biDivideModulo(x,y){var nb=biNumBits(x);var tb=biNumBits(y);var origYIsNeg=y.isNeg;var q,r;if(nb<tb){if(x.isNeg){q=biCopy(bigOne);q.isNeg=!y.isNeg;x.isNeg=false;y.isNeg=false;r=biSubtract(y,x);x.isNeg=true;y.isNeg=origYIsNeg;}else{q=new BigInt();r=biCopy(x);}
return new Array(q,r);}
q=new BigInt();r=x;var t=Math.ceil(tb/bitsPerDigit)-1;var lambda=0;while(y.digits[t]<biHalfRadix){y=biShiftLeft(y,1);++lambda;++tb;t=Math.ceil(tb/bitsPerDigit)-1;}
r=biShiftLeft(r,lambda);nb+=lambda;var n=Math.ceil(nb/bitsPerDigit)-1;var b=biMultiplyByRadixPower(y,n-t);while(biCompare(r,b)!=-1){++q.digits[n-t];r=biSubtract(r,b);}
for(var i=n;i>t;--i){var ri=(i>=r.digits.length)?0:r.digits[i];var ri1=(i-1>=r.digits.length)?0:r.digits[i-1];var ri2=(i-2>=r.digits.length)?0:r.digits[i-2];var yt=(t>=y.digits.length)?0:y.digits[t];var yt1=(t-1>=y.digits.length)?0:y.digits[t-1];if(ri==yt){q.digits[i-t-1]=maxDigitVal;}else{q.digits[i-t-1]=Math.floor((ri*biRadix+ri1)/yt);}
var c1=q.digits[i-t-1]*((yt*biRadix)+yt1);var c2=(ri*biRadixSquared)+((ri1*biRadix)+ri2);while(c1>c2){--q.digits[i-t-1];c1=q.digits[i-t-1]*((yt*biRadix)|yt1);c2=(ri*biRadix*biRadix)+((ri1*biRadix)+ri2);}
b=biMultiplyByRadixPower(y,i-t-1);r=biSubtract(r,biMultiplyDigit(b,q.digits[i-t-1]));if(r.isNeg){r=biAdd(r,b);--q.digits[i-t-1];}}
r=biShiftRight(r,lambda);q.isNeg=x.isNeg!=origYIsNeg;if(x.isNeg){if(origYIsNeg){q=biAdd(q,bigOne);}else{q=biSubtract(q,bigOne);}
y=biShiftRight(y,lambda);r=biSubtract(y,r);}
if(r.digits[0]==0&&biHighIndex(r)==0)r.isNeg=false;return new Array(q,r);}
function biDivide(x,y){return biDivideModulo(x,y)[0];}
function biModulo(x,y){return biDivideModulo(x,y)[1];}
function biMultiplyMod(x,y,m){return biModulo(biMultiply(x,y),m);}
function biPow(x,y){var result=bigOne;var a=x;while(true){if((y&1)!=0)result=biMultiply(result,a);y>>=1;if(y==0)break;a=biMultiply(a,a);}
return result;}
function biPowMod(x,y,m){var result=bigOne;var a=x;var k=y;while(true){if((k.digits[0]&1)!=0)result=biMultiplyMod(result,a,m);k=biShiftRight(k,1);if(k.digits[0]==0&&biHighIndex(k)==0)break;a=biMultiplyMod(a,a,m);}
return result;}
function BarrettMu(m){this.modulus=biCopy(m);this.k=biHighIndex(this.modulus)+1;var b2k=new BigInt();b2k.digits[2*this.k]=1;this.mu=biDivide(b2k,this.modulus);this.bkplus1=new BigInt();this.bkplus1.digits[this.k+1]=1;this.modulo=BarrettMu_modulo;this.multiplyMod=BarrettMu_multiplyMod;this.powMod=BarrettMu_powMod;}
function BarrettMu_modulo(x){var q1=biDivideByRadixPower(x,this.k-1);var q2=biMultiply(q1,this.mu);var q3=biDivideByRadixPower(q2,this.k+1);var r1=biModuloByRadixPower(x,this.k+1);var r2term=biMultiply(q3,this.modulus);var r2=biModuloByRadixPower(r2term,this.k+1);var r=biSubtract(r1,r2);if(r.isNeg){r=biAdd(r,this.bkplus1);}
var rgtem=biCompare(r,this.modulus)>=0;while(rgtem){r=biSubtract(r,this.modulus);rgtem=biCompare(r,this.modulus)>=0;}
return r;}
function BarrettMu_multiplyMod(x,y){var xy=biMultiply(x,y);return this.modulo(xy);}
function BarrettMu_powMod(x,y){var result=new BigInt();result.digits[0]=1;var a=x;var k=y;while(true){if((k.digits[0]&1)!=0)result=this.multiplyMod(result,a);k=biShiftRight(k,1);if(k.digits[0]==0&&biHighIndex(k)==0)break;a=this.multiplyMod(a,a);}
return result;}
function RSAKeyPair(encryptionExponent,decryptionExponent,modulus){this.e=biFromHex(encryptionExponent);this.d=biFromHex(decryptionExponent);this.m=biFromHex(modulus);this.chunkSize=2*biHighIndex(this.m);this.radix=16;this.barrett=new BarrettMu(this.m);}
function twoDigit(n){return(n<10?"0":"")+String(n);}
function encryptedString(key,s)
{var a=new Array();var sl=s.length;var i=0;while(i<sl){a[i]=s.charCodeAt(i);i++;}
while(a.length%key.chunkSize!=0){a[i++]=0;}
var al=a.length;var result="";var j,k,block;for(i=0;i<al;i+=key.chunkSize){block=new BigInt();j=0;for(k=i;k<i+key.chunkSize;++j){block.digits[j]=a[k++];block.digits[j]+=a[k++]<<8;}
var crypt=key.barrett.powMod(block,key.e);var text=key.radix==16?biToHex(crypt):biToString(crypt,key.radix);result+=text+" ";}
return result.substring(0,result.length-1);}
function decryptedString(key,s){var blocks=s.split(" ");var result="";var i,j,block;for(i=0;i<blocks.length;++i){var bi;if(key.radix==16){bi=biFromHex(blocks[i]);}else{bi=biFromString(blocks[i],key.radix);}
block=key.barrett.powMod(bi,key.d);for(j=0;j<=biHighIndex(block);++j){result+=String.fromCharCode(block.digits[j]&255,block.digits[j]>>8);}}
if(result.charCodeAt(result.length-1)==0){result=result.substring(0,result.length-1);}
return result;}
var __Crypto=__Crypto||{};function initPackages(__scope){var __package=function(packageRoot,pathString){var paths=pathString.split(".");var currentPackage=packageRoot;for(var i=0;i<paths.length;i++){var id=paths[i];if(currentPackage[id]==null){currentPackage[id]={};}
currentPackage=currentPackage[id];}
return currentPackage;};var __export=function(packageRoot,pathString,object){var paths=pathString.split(".");var currentPackage=packageRoot;for(var i=0;i<paths.length;i++){var id=paths[i];if(i<paths.length-1){if(currentPackage[id]==null){currentPackage[id]={};}}else{if(currentPackage[id]==null){currentPackage[id]=object;}else{throw"The specified package path is already defined. "+pathString;}}
currentPackage=currentPackage[id];}
return currentPackage;};var __import=function(packageRoot,pathString,object){var paths=pathString.split(".");var currentPackage=packageRoot;var currentPath="[package root]";for(var i=0;i<paths.length;i++){var id=paths[i];currentPath+="."+id;if(currentPackage[id]==null){throw pathString+" is not found. "+currentPath+" is null in "+__CURRENT_UNIT.unit_name+".";}
currentPackage=currentPackage[id];}
return currentPackage;};var __DEFINED_UNITS={};var __CURRENT_UNIT="";var __unit=function(unit_name){__DEFINED_UNITS[unit_name]=true;__CURRENT_UNIT={unit_name:unit_name,requring_units:{}};}
var __uses=function(unit_name){if(__DEFINED_UNITS[unit_name]){__CURRENT_UNIT.requring_units[unit_name]=true;return true;}else{throw"Unit Not Found Error : "+__CURRENT_UNIT.unit_name+" requires "+unit_name;}};__scope.__package=__package;__scope.__import=__import;__scope.__export=__export;__scope.__unit=__unit;__scope.__uses=__uses;__scope.__DEFINED_UNITS=__DEFINED_UNITS;__scope.__PACKAGE_ENABLED=true;__unit("packages.js");}
initPackages(__Crypto);function initBinary(packageRoot){if(packageRoot.__PACKAGE_ENABLED){__Crypto.__unit("binary.js");}
var i2a=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9','+','/'];function base64_encode(s){var length=s.length;var groupCount=Math.floor(length/3);var remaining=length-3*groupCount;var result="";var idx=0;for(var i=0;i<groupCount;i++){var b0=s[idx++]&0xff;var b1=s[idx++]&0xff;var b2=s[idx++]&0xff;result+=(i2a[b0>>2]);result+=(i2a[(b0<<4)&0x3f|(b1>>4)]);result+=(i2a[(b1<<2)&0x3f|(b2>>6)]);result+=(i2a[b2&0x3f]);}
if(remaining==0){}else if(remaining==1){var b0=s[idx++]&0xff;result+=(i2a[b0>>2]);result+=(i2a[(b0<<4)&0x3f]);result+=("==");}else if(remaining==2){var b0=s[idx++]&0xff;var b1=s[idx++]&0xff;result+=(i2a[b0>>2]);result+=(i2a[(b0<<4)&0x3f|(b1>>4)]);result+=(i2a[(b1<<2)&0x3f]);result+=('=');}else{throw"never happen";}
return result;}
var a2i=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51];function get_a2i(c){var result=(0<=c)&&(c<a2i.length)?a2i[c]:-1;if(result<0)throw"Illegal character "+c;return result;}
function base64_decode(s){var length=s.length;var groupCount=Math.floor(length/4);if(4*groupCount!=length)throw"String length must be a multiple of four.";var missing=0;if(length!=0){if(s.charAt(length-1)=='='){missing++;groupCount--;}
if(s.charAt(length-2)=='=')missing++;}
var len=(3*groupCount-missing);if(len<0){len=0;}
var result=new Array(len);var idx_in=0;var idx_out=0;for(var i=0;i<groupCount;i++){var c0=get_a2i(s.charCodeAt(idx_in++));var c1=get_a2i(s.charCodeAt(idx_in++));var c2=get_a2i(s.charCodeAt(idx_in++));var c3=get_a2i(s.charCodeAt(idx_in++));result[idx_out++]=0xFF&((c0<<2)|(c1>>4));result[idx_out++]=0xFF&((c1<<4)|(c2>>2));result[idx_out++]=0xFF&((c2<<6)|c3);}
if(missing==0){}else if(missing==1){var c0=get_a2i(s.charCodeAt(idx_in++));var c1=get_a2i(s.charCodeAt(idx_in++));var c2=get_a2i(s.charCodeAt(idx_in++));result[idx_out++]=0xFF&((c0<<2)|(c1>>4));result[idx_out++]=0xFF&((c1<<4)|(c2>>2));}else if(missing==2){var c0=get_a2i(s.charCodeAt(idx_in++));var c1=get_a2i(s.charCodeAt(idx_in++));result[idx_out++]=0xFF&((c0<<2)|(c1>>4));}else{throw"never happen";}
return result;}
function base64x_encode(s){return base64x_pre_encode(base64_encode(s));}
function base64x_decode(s){return base64_decode(base64x_pre_decode(s));}
var base64x_pre_encode_map={};base64x_pre_encode_map["x"]="xx";base64x_pre_encode_map["+"]="xa";base64x_pre_encode_map["/"]="xb";base64x_pre_encode_map["="]="";function base64x_pre_encode(s){var ss="";for(var i=0;i<s.length;i++){var c=s.charAt(i);var cc=base64x_pre_encode_map[c];if(cc!=null){ss=ss+cc;}else{ss=ss+c;}}
return ss;}
var base64x_pre_decode_map={};base64x_pre_decode_map['x']='x';base64x_pre_decode_map['a']='+';base64x_pre_decode_map['b']='/';function base64x_pre_decode(s){var ss="";for(var i=0;i<s.length;i++){var c=s.charAt(i);if(c=='x'){c=s.charAt(++i);var cc=base64x_pre_decode_map[c];if(cc!=null){ss=ss+cc;}else{}}else{ss=ss+c;}}
while(ss.length%4!=0){ss+="=";}
return ss;}
function equals(a,b){if(a.length!=b.length)return false;var size=a.length;for(var i=0;i<size;i++){if(a[i]!=b[i])return false;}
return true;}
function hex(i){if(i==null)return"??";i&=0xff;var result=i.toString(16);return(result.length<2)?"0"+result:result;}
function base16(data,columns,delim){return base16_encode(data,columns,delim);}
function base16_encode(data,columns,delim){if(delim==null){delim="";}
if(columns==null){columns=256;}
var result="";for(var i=0;i<data.length;i++){result+=hex(data[i])+delim;}
return result.toUpperCase();}
var amap={};amap['0']=0;amap['1']=1;amap['2']=2;amap['3']=3;amap['4']=4;amap['5']=5;amap['6']=6;amap['7']=7;amap['8']=8;amap['9']=9;amap['A']=10;amap['B']=11;amap['C']=12;amap['D']=13;amap['E']=14;amap['F']=15;amap['a']=10;amap['b']=11;amap['c']=12;amap['d']=13;amap['e']=14;amap['f']=15;function get_amap(c){var cc=amap[c];if(cc==null)throw"found an invalid character.";return cc;}
function base16_decode(data){var ca=[];for(var i=0,j=0;i<data.length;i++){var c=data.charAt(i);if(c=="\s"){continue;}else{ca[j++]=c;}}
if(ca.length%2!=0){throw"data must be a multiple of two.";}
var result=new Array(ca.length>>1);for(var i=0;i<ca.length;i+=2){var v=0xff&((get_amap(ca[i])<<4)|(get_amap(ca[i+1])));result[i>>1]=v;}
return result;}
var B10000000=0x80;var B11000000=0xC0;var B11100000=0xE0;var B11110000=0xF0;var B11111000=0xF8;var B11111100=0xFC;var B11111110=0xFE;var B01111111=0x7F;var B00111111=0x3F;var B00011111=0x1F;var B00001111=0x0F;var B00000111=0x07;var B00000011=0x03;var B00000001=0x01;function str2utf8(str){var result=[];var length=str.length;var idx=0;for(var i=0;i<length;i++){var c=str.charCodeAt(i);if(c<=0x7f){result[idx++]=c;}else if(c<=0x7ff){result[idx++]=B11000000|(B00011111&(c>>>6));result[idx++]=B10000000|(B00111111&(c>>>0));}else if(c<=0xffff){result[idx++]=B11100000|(B00001111&(c>>>12));result[idx++]=B10000000|(B00111111&(c>>>6));result[idx++]=B10000000|(B00111111&(c>>>0));}else if(c<=0x10ffff){result[idx++]=B11110000|(B00000111&(c>>>18));result[idx++]=B10000000|(B00111111&(c>>>12));result[idx++]=B10000000|(B00111111&(c>>>6));result[idx++]=B10000000|(B00111111&(c>>>0));}else{throw"error";}}
return result;}
function utf82str(data){var result="";var length=data.length;for(var i=0;i<length;){var c=data[i++];if(c<0x80){result+=String.fromCharCode(c);}else if((c<B11100000)){result+=String.fromCharCode(((B00011111&c)<<6)|((B00111111&data[i++])<<0));}else if((c<B11110000)){result+=String.fromCharCode(((B00001111&c)<<12)|((B00111111&data[i++])<<6)|((B00111111&data[i++])<<0));}else if((c<B11111000)){result+=String.fromCharCode(((B00000111&c)<<18)|((B00111111&data[i++])<<12)|((B00111111&data[i++])<<6)|((B00111111&data[i++])<<0));}else if((c<B11111100)){result+=String.fromCharCode(((B00000011&c)<<24)|((B00111111&data[i++])<<18)|((B00111111&data[i++])<<12)|((B00111111&data[i++])<<6)|((B00111111&data[i++])<<0));}else if((c<B11111110)){result+=String.fromCharCode(((B00000001&c)<<30)|((B00111111&data[i++])<<24)|((B00111111&data[i++])<<18)|((B00111111&data[i++])<<12)|((B00111111&data[i++])<<6)|((B00111111&data[i++])<<0));}}
return result;}
function char2str(ca){var result="";for(var i=0;i<ca.length;i++){result+=String.fromCharCode(ca[i]);}
return result;}
function str2char(str){var result=new Array(str.length);for(var i=0;i<str.length;i++){result[i]=str.charCodeAt(i);}
return result;}
function i2ba_be(i){return[0xff&(i>>24),0xff&(i>>16),0xff&(i>>8),0xff&(i>>0)];}
function ba2i_be(bs){return((bs[0]<<24)|(bs[1]<<16)|(bs[2]<<8)|(bs[3]<<0));}
function s2ba_be(i){return[0xff&(i>>8),0xff&(i>>0)];}
function ba2s_be(bs){return(0|(bs[0]<<8)|(bs[1]<<0));}
function i2ba_le(i){return[0xff&(i>>0),0xff&(i>>8),0xff&(i>>16),0xff&(i>>24)];}
function ba2i_le(bs){return(0|(bs[3]<<0)|(bs[2]<<8)|(bs[1]<<16)|(bs[0]<<24));}
function s2ba_le(i){return[0xff&(i>>0),0xff&(i>>8)];}
function ba2s_le(bs){return(0|(bs[1]<<0)|(bs[0]<<8));}
function ia2ba_be(ia){var length=ia.length<<2;var ba=new Array(length);for(var ii=0,bi=0;ii<ia.length&&bi<ba.length;){ba[bi++]=0xff&(ia[ii]>>24);ba[bi++]=0xff&(ia[ii]>>16);ba[bi++]=0xff&(ia[ii]>>8);ba[bi++]=0xff&(ia[ii]>>0);ii++;}
return ba;}
function ba2ia_be(ba){var length=(ba.length+3)>>2;var ia=new Array(length);;for(var ii=0,bi=0;ii<ia.length&&bi<ba.length;){ia[ii++]=(bi<ba.length?(ba[bi++]<<24):0)|(bi<ba.length?(ba[bi++]<<16):0)|(bi<ba.length?(ba[bi++]<<8):0)|(bi<ba.length?(ba[bi++]):0);}
return ia;}
function ia2ba_le(ia){var length=ia.length<<2;var ba=new Array(length);for(var ii=0,bi=0;ii<ia.length&&bi<ba.length;){ba[bi++]=0xff&(ia[ii]>>0);ba[bi++]=0xff&(ia[ii]>>8);ba[bi++]=0xff&(ia[ii]>>16);ba[bi++]=0xff&(ia[ii]>>24);ii++;}
return ba;}
function ba2ia_le(ba){var length=(ba.length+3)>>2;var ia=new Array(length);;for(var ii=0,bi=0;ii<ia.length&&bi<ba.length;){ia[ii++]=(bi<ba.length?(ba[bi++]):0)|(bi<ba.length?(ba[bi++]<<8):0)|(bi<ba.length?(ba[bi++]<<16):0)|(bi<ba.length?(ba[bi++]<<24):0);}
return ia;}
function trim(s){var result="";for(var idx=0;idx<s.length;idx++){var c=s.charAt(idx);if(c=="\s"||c=="\t"||c=="\r"||c=="\n"){}else{result+=c;}}
return result;}
function mktst(encode,decode){return function(trial,from,to){var flg=true;for(var i=0;i<trial;i++){for(var j=from;j<to;j++){var arr=new Array(j);for(var k=0;k<j;k++)
arr[k]=Math.floor(Math.random()*256);var s=encode(arr);var b=decode(s);trace("in :"+arr.length+":"+base16_encode(arr));trace("b64:"+s.length+":"+s);trace("out:"+b.length+":"+base16_encode(arr));if(equals(arr,b)){trace("OK! ( "+i+","+j+")");}else{trace("ERR ( "+i+","+j+")");flg=false;}
trace("-----------");}}
if(flg){trace("ALL OK! ");}else{trace("FOUND ERROR!");}};}
packageRoot.base64_encode=base64_encode;packageRoot.base64_decode=base64_decode;packageRoot.base64_test=mktst(base64_encode,base64_decode);packageRoot.base64x_encode=base64x_encode;packageRoot.base64x_decode=base64x_decode;packageRoot.base64x_test=mktst(base64x_encode,base64x_decode);packageRoot.base64x_pre_encode=base64x_pre_encode;packageRoot.base64x_pre_decode=base64x_pre_decode;packageRoot.base16_encode=base16_encode;packageRoot.base16_decode=base16_decode;packageRoot.base16=base16;packageRoot.hex=base16;packageRoot.utf82str=utf82str;packageRoot.str2utf8=str2utf8;packageRoot.str2char=str2char;packageRoot.char2str=char2str;packageRoot.i2ba=i2ba_be;packageRoot.ba2i=ba2i_be;packageRoot.i2ba_be=i2ba_be;packageRoot.ba2i_be=ba2i_be;packageRoot.i2ba_le=i2ba_le;packageRoot.ba2i_le=ba2i_le;packageRoot.s2ba=s2ba_be;packageRoot.ba2s=ba2s_be;packageRoot.s2ba_be=s2ba_be;packageRoot.ba2s_be=ba2s_be;packageRoot.s2ba_le=s2ba_le;packageRoot.ba2s_le=ba2s_le;packageRoot.ba2ia=ba2ia_be;packageRoot.ia2ba=ia2ba_be;packageRoot.ia2ba_be=ia2ba_be;packageRoot.ba2ia_be=ba2ia_be;packageRoot.ia2ba_le=ia2ba_le;packageRoot.ba2ia_le=ba2ia_le;packageRoot.cmparr=equals;}
initBinary(__Crypto);function initBlockCipher(packageRoot){__Crypto.__unit("Cipher.js");__Crypto.__uses("packages.js");var MAXINT=0xFFFFFFFF;function rotb(b,n){return(b<<n|b>>>(8-n))&0xFF;}
function rotw(w,n){return(w<<n|w>>>(32-n))&MAXINT;}
function getW(a,i){return a[i]|a[i+1]<<8|a[i+2]<<16|a[i+3]<<24;}
function setW(a,i,w){a.splice(i,4,w&0xFF,(w>>>8)&0xFF,(w>>>16)&0xFF,(w>>>24)&0xFF);}
function setWInv(a,i,w){a.splice(i,4,(w>>>24)&0xFF,(w>>>16)&0xFF,(w>>>8)&0xFF,w&0xFF);}
function getB(x,n){return(x>>>(n*8))&0xFF;}
function getNrBits(i){var n=0;while(i>0){n++;i>>>=1;}
return n;}
function getMask(n){return(1<<n)-1;}
function randByte(){return Math.floor(Math.random()*256);}
var ALGORITHMS={};function createRijndael(){var keyBytes=null;var dataBytes=null;var dataOffset=-1;var algorithmName=null;algorithmName="rijndael"
var aesNk;var aesNr;var aesPows;var aesLogs;var aesSBox;var aesSBoxInv;var aesRco;var aesFtable;var aesRtable;var aesFi;var aesRi;var aesFkey;var aesRkey;function aesMult(x,y){return(x&&y)?aesPows[(aesLogs[x]+aesLogs[y])%255]:0;}
function aesPackBlock(){return[getW(dataBytes,dataOffset),getW(dataBytes,dataOffset+4),getW(dataBytes,dataOffset+8),getW(dataBytes,dataOffset+12)];}
function aesUnpackBlock(packed){for(var j=0;j<4;j++,dataOffset+=4)setW(dataBytes,dataOffset,packed[j]);}
function aesXTime(p){p<<=1;return p&0x100?p^0x11B:p;}
function aesSubByte(w){return aesSBox[getB(w,0)]|aesSBox[getB(w,1)]<<8|aesSBox[getB(w,2)]<<16|aesSBox[getB(w,3)]<<24;}
function aesProduct(w1,w2){return aesMult(getB(w1,0),getB(w2,0))^aesMult(getB(w1,1),getB(w2,1))^aesMult(getB(w1,2),getB(w2,2))^aesMult(getB(w1,3),getB(w2,3));}
function aesInvMixCol(x){return aesProduct(0x090d0b0e,x)|aesProduct(0x0d0b0e09,x)<<8|aesProduct(0x0b0e090d,x)<<16|aesProduct(0x0e090d0b,x)<<24;}
function aesByteSub(x){var y=aesPows[255-aesLogs[x]];x=y;x=rotb(x,1);y^=x;x=rotb(x,1);y^=x;x=rotb(x,1);y^=x;x=rotb(x,1);return x^y^0x63;}
function aesGenTables(){var i,y;aesPows=[1,3];aesLogs=[0,0,null,1];aesSBox=new Array(256);aesSBoxInv=new Array(256);aesFtable=new Array(256);aesRtable=new Array(256);aesRco=new Array(30);for(i=2;i<256;i++){aesPows[i]=aesPows[i-1]^aesXTime(aesPows[i-1]);aesLogs[aesPows[i]]=i;}
aesSBox[0]=0x63;aesSBoxInv[0x63]=0;for(i=1;i<256;i++){y=aesByteSub(i);aesSBox[i]=y;aesSBoxInv[y]=i;}
for(i=0,y=1;i<30;i++){aesRco[i]=y;y=aesXTime(y);}
for(i=0;i<256;i++){y=aesSBox[i];aesFtable[i]=aesXTime(y)|y<<8|y<<16|(y^aesXTime(y))<<24;y=aesSBoxInv[i];aesRtable[i]=aesMult(14,y)|aesMult(9,y)<<8|aesMult(13,y)<<16|aesMult(11,y)<<24;}}
function aesInit(key){keyBytes=key;keyBytes=keyBytes.slice(0,32);var i,k,m;var j=0;var l=keyBytes.length;while(l!=16&&l!=24&&l!=32)keyBytes[l++]=keyBytes[j++];aesGenTables();aesNk=keyBytes.length>>>2;aesNr=6+aesNk;var N=4*(aesNr+1);aesFi=new Array(12);aesRi=new Array(12);aesFkey=new Array(N);aesRkey=new Array(N);for(m=j=0;j<4;j++,m+=3){aesFi[m]=(j+1)%4;aesFi[m+1]=(j+2)%4;aesFi[m+2]=(j+3)%4;aesRi[m]=(4+j-1)%4;aesRi[m+1]=(4+j-2)%4;aesRi[m+2]=(4+j-3)%4;}
for(i=j=0;i<aesNk;i++,j+=4)aesFkey[i]=getW(keyBytes,j);for(k=0,j=aesNk;j<N;j+=aesNk,k++){aesFkey[j]=aesFkey[j-aesNk]^aesSubByte(rotw(aesFkey[j-1],24))^aesRco[k];if(aesNk<=6)for(i=1;i<aesNk&&(i+j)<N;i++)aesFkey[i+j]=aesFkey[i+j-aesNk]^aesFkey[i+j-1];else{for(i=1;i<4&&(i+j)<N;i++)aesFkey[i+j]=aesFkey[i+j-aesNk]^aesFkey[i+j-1];if((j+4)<N)aesFkey[j+4]=aesFkey[j+4-aesNk]^aesSubByte(aesFkey[j+3]);for(i=5;i<aesNk&&(i+j)<N;i++)aesFkey[i+j]=aesFkey[i+j-aesNk]^aesFkey[i+j-1];}}
for(j=0;j<4;j++)aesRkey[j+N-4]=aesFkey[j];for(i=4;i<N-4;i+=4){k=N-4-i;for(j=0;j<4;j++)aesRkey[k+j]=aesInvMixCol(aesFkey[i+j]);}
for(j=N-4;j<N;j++)aesRkey[j-N+4]=aesFkey[j];}
function aesClose(){aesPows=aesLogs=aesSBox=aesSBoxInv=aesRco=null;aesFtable=aesRtable=aesFi=aesRi=aesFkey=aesRkey=null;}
function aesRounds(block,key,table,inc,box){var tmp=new Array(4);var i,j,m,r;for(r=0;r<4;r++)block[r]^=key[r];for(i=1;i<aesNr;i++){for(j=m=0;j<4;j++,m+=3){tmp[j]=key[r++]^table[block[j]&0xFF]^rotw(table[(block[inc[m]]>>>8)&0xFF],8)^rotw(table[(block[inc[m+1]]>>>16)&0xFF],16)^rotw(table[(block[inc[m+2]]>>>24)&0xFF],24);}
var t=block;block=tmp;tmp=t;}
for(j=m=0;j<4;j++,m+=3)
tmp[j]=key[r++]^box[block[j]&0xFF]^rotw(box[(block[inc[m]]>>>8)&0xFF],8)^rotw(box[(block[inc[m+1]]>>>16)&0xFF],16)^rotw(box[(block[inc[m+2]]>>>24)&0xFF],24);return tmp;}
function aesEncrypt(data,offset){dataBytes=data;dataOffset=offset;aesUnpackBlock(aesRounds(aesPackBlock(),aesFkey,aesFtable,aesFi,aesSBox));}
function aesDecrypt(data,offset){dataBytes=data;dataOffset=offset;aesUnpackBlock(aesRounds(aesPackBlock(),aesRkey,aesRtable,aesRi,aesSBoxInv));}
return{name:"rijndael",blocksize:128/8,open:aesInit,close:aesClose,encrypt:aesEncrypt,decrypt:aesDecrypt};}
ALGORITHMS.RIJNDAEL={create:createRijndael};function createSerpent(){var keyBytes=null;var dataBytes=null;var dataOffset=-1;var algorithmName=null;algorithmName="serpent";var srpKey=[];function srpK(r,a,b,c,d,i){r[a]^=srpKey[4*i];r[b]^=srpKey[4*i+1];r[c]^=srpKey[4*i+2];r[d]^=srpKey[4*i+3];}
function srpLK(r,a,b,c,d,e,i){r[a]=rotw(r[a],13);r[c]=rotw(r[c],3);r[b]^=r[a];r[e]=(r[a]<<3)&MAXINT;r[d]^=r[c];r[b]^=r[c];r[b]=rotw(r[b],1);r[d]^=r[e];r[d]=rotw(r[d],7);r[e]=r[b];r[a]^=r[b];r[e]=(r[e]<<7)&MAXINT;r[c]^=r[d];r[a]^=r[d];r[c]^=r[e];r[d]^=srpKey[4*i+3];r[b]^=srpKey[4*i+1];r[a]=rotw(r[a],5);r[c]=rotw(r[c],22);r[a]^=srpKey[4*i+0];r[c]^=srpKey[4*i+2];}
function srpKL(r,a,b,c,d,e,i){r[a]^=srpKey[4*i+0];r[b]^=srpKey[4*i+1];r[c]^=srpKey[4*i+2];r[d]^=srpKey[4*i+3];r[a]=rotw(r[a],27);r[c]=rotw(r[c],10);r[e]=r[b];r[c]^=r[d];r[a]^=r[d];r[e]=(r[e]<<7)&MAXINT;r[a]^=r[b];r[b]=rotw(r[b],31);r[c]^=r[e];r[d]=rotw(r[d],25);r[e]=(r[a]<<3)&MAXINT;r[b]^=r[a];r[d]^=r[e];r[a]=rotw(r[a],19);r[b]^=r[c];r[d]^=r[c];r[c]=rotw(r[c],29);}
var srpS=[function(r,x0,x1,x2,x3,x4){r[x4]=r[x3];r[x3]|=r[x0];r[x0]^=r[x4];r[x4]^=r[x2];r[x4]=~r[x4];r[x3]^=r[x1];r[x1]&=r[x0];r[x1]^=r[x4];r[x2]^=r[x0];r[x0]^=r[x3];r[x4]|=r[x0];r[x0]^=r[x2];r[x2]&=r[x1];r[x3]^=r[x2];r[x1]=~r[x1];r[x2]^=r[x4];r[x1]^=r[x2];},function(r,x0,x1,x2,x3,x4){r[x4]=r[x1];r[x1]^=r[x0];r[x0]^=r[x3];r[x3]=~r[x3];r[x4]&=r[x1];r[x0]|=r[x1];r[x3]^=r[x2];r[x0]^=r[x3];r[x1]^=r[x3];r[x3]^=r[x4];r[x1]|=r[x4];r[x4]^=r[x2];r[x2]&=r[x0];r[x2]^=r[x1];r[x1]|=r[x0];r[x0]=~r[x0];r[x0]^=r[x2];r[x4]^=r[x1];},function(r,x0,x1,x2,x3,x4){r[x3]=~r[x3];r[x1]^=r[x0];r[x4]=r[x0];r[x0]&=r[x2];r[x0]^=r[x3];r[x3]|=r[x4];r[x2]^=r[x1];r[x3]^=r[x1];r[x1]&=r[x0];r[x0]^=r[x2];r[x2]&=r[x3];r[x3]|=r[x1];r[x0]=~r[x0];r[x3]^=r[x0];r[x4]^=r[x0];r[x0]^=r[x2];r[x1]|=r[x2];},function(r,x0,x1,x2,x3,x4){r[x4]=r[x1];r[x1]^=r[x3];r[x3]|=r[x0];r[x4]&=r[x0];r[x0]^=r[x2];r[x2]^=r[x1];r[x1]&=r[x3];r[x2]^=r[x3];r[x0]|=r[x4];r[x4]^=r[x3];r[x1]^=r[x0];r[x0]&=r[x3];r[x3]&=r[x4];r[x3]^=r[x2];r[x4]|=r[x1];r[x2]&=r[x1];r[x4]^=r[x3];r[x0]^=r[x3];r[x3]^=r[x2];},function(r,x0,x1,x2,x3,x4){r[x4]=r[x3];r[x3]&=r[x0];r[x0]^=r[x4];r[x3]^=r[x2];r[x2]|=r[x4];r[x0]^=r[x1];r[x4]^=r[x3];r[x2]|=r[x0];r[x2]^=r[x1];r[x1]&=r[x0];r[x1]^=r[x4];r[x4]&=r[x2];r[x2]^=r[x3];r[x4]^=r[x0];r[x3]|=r[x1];r[x1]=~r[x1];r[x3]^=r[x0];},function(r,x0,x1,x2,x3,x4){r[x4]=r[x1];r[x1]|=r[x0];r[x2]^=r[x1];r[x3]=~r[x3];r[x4]^=r[x0];r[x0]^=r[x2];r[x1]&=r[x4];r[x4]|=r[x3];r[x4]^=r[x0];r[x0]&=r[x3];r[x1]^=r[x3];r[x3]^=r[x2];r[x0]^=r[x1];r[x2]&=r[x4];r[x1]^=r[x2];r[x2]&=r[x0];r[x3]^=r[x2];},function(r,x0,x1,x2,x3,x4){r[x4]=r[x1];r[x3]^=r[x0];r[x1]^=r[x2];r[x2]^=r[x0];r[x0]&=r[x3];r[x1]|=r[x3];r[x4]=~r[x4];r[x0]^=r[x1];r[x1]^=r[x2];r[x3]^=r[x4];r[x4]^=r[x0];r[x2]&=r[x0];r[x4]^=r[x1];r[x2]^=r[x3];r[x3]&=r[x1];r[x3]^=r[x0];r[x1]^=r[x2];},function(r,x0,x1,x2,x3,x4){r[x1]=~r[x1];r[x4]=r[x1];r[x0]=~r[x0];r[x1]&=r[x2];r[x1]^=r[x3];r[x3]|=r[x4];r[x4]^=r[x2];r[x2]^=r[x3];r[x3]^=r[x0];r[x0]|=r[x1];r[x2]&=r[x0];r[x0]^=r[x4];r[x4]^=r[x3];r[x3]&=r[x0];r[x4]^=r[x1];r[x2]^=r[x4];r[x3]^=r[x1];r[x4]|=r[x0];r[x4]^=r[x1];}];var srpSI=[function(r,x0,x1,x2,x3,x4){r[x4]=r[x3];r[x1]^=r[x0];r[x3]|=r[x1];r[x4]^=r[x1];r[x0]=~r[x0];r[x2]^=r[x3];r[x3]^=r[x0];r[x0]&=r[x1];r[x0]^=r[x2];r[x2]&=r[x3];r[x3]^=r[x4];r[x2]^=r[x3];r[x1]^=r[x3];r[x3]&=r[x0];r[x1]^=r[x0];r[x0]^=r[x2];r[x4]^=r[x3];},function(r,x0,x1,x2,x3,x4){r[x1]^=r[x3];r[x4]=r[x0];r[x0]^=r[x2];r[x2]=~r[x2];r[x4]|=r[x1];r[x4]^=r[x3];r[x3]&=r[x1];r[x1]^=r[x2];r[x2]&=r[x4];r[x4]^=r[x1];r[x1]|=r[x3];r[x3]^=r[x0];r[x2]^=r[x0];r[x0]|=r[x4];r[x2]^=r[x4];r[x1]^=r[x0];r[x4]^=r[x1];},function(r,x0,x1,x2,x3,x4){r[x2]^=r[x1];r[x4]=r[x3];r[x3]=~r[x3];r[x3]|=r[x2];r[x2]^=r[x4];r[x4]^=r[x0];r[x3]^=r[x1];r[x1]|=r[x2];r[x2]^=r[x0];r[x1]^=r[x4];r[x4]|=r[x3];r[x2]^=r[x3];r[x4]^=r[x2];r[x2]&=r[x1];r[x2]^=r[x3];r[x3]^=r[x4];r[x4]^=r[x0];},function(r,x0,x1,x2,x3,x4){r[x2]^=r[x1];r[x4]=r[x1];r[x1]&=r[x2];r[x1]^=r[x0];r[x0]|=r[x4];r[x4]^=r[x3];r[x0]^=r[x3];r[x3]|=r[x1];r[x1]^=r[x2];r[x1]^=r[x3];r[x0]^=r[x2];r[x2]^=r[x3];r[x3]&=r[x1];r[x1]^=r[x0];r[x0]&=r[x2];r[x4]^=r[x3];r[x3]^=r[x0];r[x0]^=r[x1];},function(r,x0,x1,x2,x3,x4){r[x2]^=r[x3];r[x4]=r[x0];r[x0]&=r[x1];r[x0]^=r[x2];r[x2]|=r[x3];r[x4]=~r[x4];r[x1]^=r[x0];r[x0]^=r[x2];r[x2]&=r[x4];r[x2]^=r[x0];r[x0]|=r[x4];r[x0]^=r[x3];r[x3]&=r[x2];r[x4]^=r[x3];r[x3]^=r[x1];r[x1]&=r[x0];r[x4]^=r[x1];r[x0]^=r[x3];},function(r,x0,x1,x2,x3,x4){r[x4]=r[x1];r[x1]|=r[x2];r[x2]^=r[x4];r[x1]^=r[x3];r[x3]&=r[x4];r[x2]^=r[x3];r[x3]|=r[x0];r[x0]=~r[x0];r[x3]^=r[x2];r[x2]|=r[x0];r[x4]^=r[x1];r[x2]^=r[x4];r[x4]&=r[x0];r[x0]^=r[x1];r[x1]^=r[x3];r[x0]&=r[x2];r[x2]^=r[x3];r[x0]^=r[x2];r[x2]^=r[x4];r[x4]^=r[x3];},function(r,x0,x1,x2,x3,x4){r[x0]^=r[x2];r[x4]=r[x0];r[x0]&=r[x3];r[x2]^=r[x3];r[x0]^=r[x2];r[x3]^=r[x1];r[x2]|=r[x4];r[x2]^=r[x3];r[x3]&=r[x0];r[x0]=~r[x0];r[x3]^=r[x1];r[x1]&=r[x2];r[x4]^=r[x0];r[x3]^=r[x4];r[x4]^=r[x2];r[x0]^=r[x1];r[x2]^=r[x0];},function(r,x0,x1,x2,x3,x4){r[x4]=r[x3];r[x3]&=r[x0];r[x0]^=r[x2];r[x2]|=r[x4];r[x4]^=r[x1];r[x0]=~r[x0];r[x1]|=r[x3];r[x4]^=r[x0];r[x0]&=r[x2];r[x0]^=r[x1];r[x1]&=r[x2];r[x3]^=r[x2];r[x4]^=r[x3];r[x2]&=r[x3];r[x3]|=r[x0];r[x1]^=r[x4];r[x3]^=r[x4];r[x4]&=r[x0];r[x4]^=r[x2];}];var srpKc=[7788,63716,84032,7891,78949,25146,28835,67288,84032,40055,7361,1940,77639,27525,24193,75702,7361,35413,83150,82383,58619,48468,18242,66861,83150,69667,7788,31552,40054,23222,52496,57565,7788,63716];var srpEc=[44255,61867,45034,52496,73087,56255,43827,41448,18242,1939,18581,56255,64584,31097,26469,77728,77639,4216,64585,31097,66861,78949,58006,59943,49676,78950,5512,78949,27525,52496,18670,76143];var srpDc=[44255,60896,28835,1837,1057,4216,18242,77301,47399,53992,1939,1940,66420,39172,78950,45917,82383,7450,67288,26469,83149,57565,66419,47400,58006,44254,18581,18228,33048,45034,66508,7449];function srpInit(key){keyBytes=key;var i,j,m,n;function keyIt(a,b,c,d,i){srpKey[i]=r[b]=rotw(srpKey[a]^r[b]^r[c]^r[d]^0x9e3779b9^i,11);}
function keyLoad(a,b,c,d,i){r[a]=srpKey[i];r[b]=srpKey[i+1];r[c]=srpKey[i+2];r[d]=srpKey[i+3];}
function keyStore(a,b,c,d,i){srpKey[i]=r[a];srpKey[i+1]=r[b];srpKey[i+2]=r[c];srpKey[i+3]=r[d];}
keyBytes.reverse();keyBytes[keyBytes.length]=1;while(keyBytes.length<32)keyBytes[keyBytes.length]=0;for(i=0;i<8;i++){srpKey[i]=(keyBytes[4*i+0]&0xff)|(keyBytes[4*i+1]&0xff)<<8|(keyBytes[4*i+2]&0xff)<<16|(keyBytes[4*i+3]&0xff)<<24;}
var r=[srpKey[3],srpKey[4],srpKey[5],srpKey[6],srpKey[7]];i=0;j=0;while(keyIt(j++,0,4,2,i++),keyIt(j++,1,0,3,i++),i<132){keyIt(j++,2,1,4,i++);if(i==8){j=0;}
keyIt(j++,3,2,0,i++);keyIt(j++,4,3,1,i++);}
i=128;j=3;n=0;while(m=srpKc[n++],srpS[j++%8](r,m%5,m%7,m%11,m%13,m%17),m=srpKc[n],keyStore(m%5,m%7,m%11,m%13,i),i>0){i-=4;keyLoad(m%5,m%7,m%11,m%13,i);}}
function srpClose(){srpKey=[];}
function srpEncrypt(data,offset){dataBytes=data;dataOffset=offset;var blk=dataBytes.slice(dataOffset,dataOffset+16);blk.reverse();var r=[getW(blk,0),getW(blk,4),getW(blk,8),getW(blk,12)];srpK(r,0,1,2,3,0);var n=0,m=srpEc[n];while(srpS[n%8](r,m%5,m%7,m%11,m%13,m%17),n<31){m=srpEc[++n];srpLK(r,m%5,m%7,m%11,m%13,m%17,n);}
srpK(r,0,1,2,3,32);for(var j=3;j>=0;j--,dataOffset+=4)setWInv(dataBytes,dataOffset,r[j]);}
function srpDecrypt(data,offset){dataBytes=data;dataOffset=offset;var blk=dataBytes.slice(dataOffset,dataOffset+16);blk.reverse();var r=[getW(blk,0),getW(blk,4),getW(blk,8),getW(blk,12)];srpK(r,0,1,2,3,32);var n=0,m=srpDc[n];while(srpSI[7-n%8](r,m%5,m%7,m%11,m%13,m%17),n<31){m=srpDc[++n];srpKL(r,m%5,m%7,m%11,m%13,m%17,32-n);}
srpK(r,2,3,1,4,0);setWInv(dataBytes,dataOffset,r[4]);setWInv(dataBytes,dataOffset+4,r[1]);setWInv(dataBytes,dataOffset+8,r[3]);setWInv(dataBytes,dataOffset+12,r[2]);dataOffset+=16;}
return{name:"serpent",blocksize:128/8,open:srpInit,close:srpClose,encrypt:srpEncrypt,decrypt:srpDecrypt};}
ALGORITHMS.SERPENT={create:createSerpent};function createTwofish(){var keyBytes=null;var dataBytes=null;var dataOffset=-1;var algorithmName=null;algorithmName="twofish";var tfsKey=[];var tfsM=[[],[],[],[]];function tfsInit(key){keyBytes=key;var i,a,b,c,d,meKey=[],moKey=[],inKey=[];var kLen;var sKey=[];var f01,f5b,fef;var q0=[[8,1,7,13,6,15,3,2,0,11,5,9,14,12,10,4],[2,8,11,13,15,7,6,14,3,1,9,4,0,10,12,5]];var q1=[[14,12,11,8,1,2,3,5,15,4,10,6,7,0,9,13],[1,14,2,11,4,12,3,7,6,13,10,5,15,9,0,8]];var q2=[[11,10,5,14,6,13,9,0,12,8,15,3,2,4,7,1],[4,12,7,5,1,6,9,10,0,14,13,8,2,11,3,15]];var q3=[[13,7,15,4,1,2,6,14,9,11,3,0,8,5,12,10],[11,9,5,1,12,3,13,14,6,4,7,15,2,0,8,10]];var ror4=[0,8,1,9,2,10,3,11,4,12,5,13,6,14,7,15];var ashx=[0,9,2,11,4,13,6,15,8,1,10,3,12,5,14,7];var q=[[],[]];var m=[[],[],[],[]];function ffm5b(x){return x^(x>>2)^[0,90,180,238][x&3];}
function ffmEf(x){return x^(x>>1)^(x>>2)^[0,238,180,90][x&3];}
function mdsRem(p,q){var i,t,u;for(i=0;i<8;i++){t=q>>>24;q=((q<<8)&MAXINT)|p>>>24;p=(p<<8)&MAXINT;u=t<<1;if(t&128){u^=333;}
q^=t^(u<<16);u^=t>>>1;if(t&1){u^=166;}
q^=u<<24|u<<8;}
return q;}
function qp(n,x){var a,b,c,d;a=x>>4;b=x&15;c=q0[n][a^b];d=q1[n][ror4[b]^ashx[a]];return q3[n][ror4[d]^ashx[c]]<<4|q2[n][c^d];}
function hFun(x,key){var a=getB(x,0),b=getB(x,1),c=getB(x,2),d=getB(x,3);switch(kLen){case 4:a=q[1][a]^getB(key[3],0);b=q[0][b]^getB(key[3],1);c=q[0][c]^getB(key[3],2);d=q[1][d]^getB(key[3],3);case 3:a=q[1][a]^getB(key[2],0);b=q[1][b]^getB(key[2],1);c=q[0][c]^getB(key[2],2);d=q[0][d]^getB(key[2],3);case 2:a=q[0][q[0][a]^getB(key[1],0)]^getB(key[0],0);b=q[0][q[1][b]^getB(key[1],1)]^getB(key[0],1);c=q[1][q[0][c]^getB(key[1],2)]^getB(key[0],2);d=q[1][q[1][d]^getB(key[1],3)]^getB(key[0],3);}
return m[0][a]^m[1][b]^m[2][c]^m[3][d];}
keyBytes=keyBytes.slice(0,32);i=keyBytes.length;while(i!=16&&i!=24&&i!=32)keyBytes[i++]=0;for(i=0;i<keyBytes.length;i+=4){inKey[i>>2]=getW(keyBytes,i);}
for(i=0;i<256;i++){q[0][i]=qp(0,i);q[1][i]=qp(1,i);}
for(i=0;i<256;i++){f01=q[1][i];f5b=ffm5b(f01);fef=ffmEf(f01);m[0][i]=f01+(f5b<<8)+(fef<<16)+(fef<<24);m[2][i]=f5b+(fef<<8)+(f01<<16)+(fef<<24);f01=q[0][i];f5b=ffm5b(f01);fef=ffmEf(f01);m[1][i]=fef+(fef<<8)+(f5b<<16)+(f01<<24);m[3][i]=f5b+(f01<<8)+(fef<<16)+(f5b<<24);}
kLen=inKey.length/2;for(i=0;i<kLen;i++){a=inKey[i+i];meKey[i]=a;b=inKey[i+i+1];moKey[i]=b;sKey[kLen-i-1]=mdsRem(a,b);}
for(i=0;i<40;i+=2){a=0x1010101*i;b=a+0x1010101;a=hFun(a,meKey);b=rotw(hFun(b,moKey),8);tfsKey[i]=(a+b)&MAXINT;tfsKey[i+1]=rotw(a+2*b,9);}
for(i=0;i<256;i++){a=b=c=d=i;switch(kLen){case 4:a=q[1][a]^getB(sKey[3],0);b=q[0][b]^getB(sKey[3],1);c=q[0][c]^getB(sKey[3],2);d=q[1][d]^getB(sKey[3],3);case 3:a=q[1][a]^getB(sKey[2],0);b=q[1][b]^getB(sKey[2],1);c=q[0][c]^getB(sKey[2],2);d=q[0][d]^getB(sKey[2],3);case 2:tfsM[0][i]=m[0][q[0][q[0][a]^getB(sKey[1],0)]^getB(sKey[0],0)];tfsM[1][i]=m[1][q[0][q[1][b]^getB(sKey[1],1)]^getB(sKey[0],1)];tfsM[2][i]=m[2][q[1][q[0][c]^getB(sKey[1],2)]^getB(sKey[0],2)];tfsM[3][i]=m[3][q[1][q[1][d]^getB(sKey[1],3)]^getB(sKey[0],3)];}}}
function tfsG0(x){return tfsM[0][getB(x,0)]^tfsM[1][getB(x,1)]^tfsM[2][getB(x,2)]^tfsM[3][getB(x,3)];}
function tfsG1(x){return tfsM[0][getB(x,3)]^tfsM[1][getB(x,0)]^tfsM[2][getB(x,1)]^tfsM[3][getB(x,2)];}
function tfsFrnd(r,blk){var a=tfsG0(blk[0]);var b=tfsG1(blk[1]);blk[2]=rotw(blk[2]^(a+b+tfsKey[4*r+8])&MAXINT,31);blk[3]=rotw(blk[3],1)^(a+2*b+tfsKey[4*r+9])&MAXINT;a=tfsG0(blk[2]);b=tfsG1(blk[3]);blk[0]=rotw(blk[0]^(a+b+tfsKey[4*r+10])&MAXINT,31);blk[1]=rotw(blk[1],1)^(a+2*b+tfsKey[4*r+11])&MAXINT;}
function tfsIrnd(i,blk){var a=tfsG0(blk[0]);var b=tfsG1(blk[1]);blk[2]=rotw(blk[2],1)^(a+b+tfsKey[4*i+10])&MAXINT;blk[3]=rotw(blk[3]^(a+2*b+tfsKey[4*i+11])&MAXINT,31);a=tfsG0(blk[2]);b=tfsG1(blk[3]);blk[0]=rotw(blk[0],1)^(a+b+tfsKey[4*i+8])&MAXINT;blk[1]=rotw(blk[1]^(a+2*b+tfsKey[4*i+9])&MAXINT,31);}
function tfsClose(){tfsKey=[];tfsM=[[],[],[],[]];}
function tfsEncrypt(data,offset){dataBytes=data;dataOffset=offset;var blk=[getW(dataBytes,dataOffset)^tfsKey[0],getW(dataBytes,dataOffset+4)^tfsKey[1],getW(dataBytes,dataOffset+8)^tfsKey[2],getW(dataBytes,dataOffset+12)^tfsKey[3]];for(var j=0;j<8;j++){tfsFrnd(j,blk);}
setW(dataBytes,dataOffset,blk[2]^tfsKey[4]);setW(dataBytes,dataOffset+4,blk[3]^tfsKey[5]);setW(dataBytes,dataOffset+8,blk[0]^tfsKey[6]);setW(dataBytes,dataOffset+12,blk[1]^tfsKey[7]);dataOffset+=16;}
function tfsDecrypt(data,offset){dataBytes=data;dataOffset=offset;var blk=[getW(dataBytes,dataOffset)^tfsKey[4],getW(dataBytes,dataOffset+4)^tfsKey[5],getW(dataBytes,dataOffset+8)^tfsKey[6],getW(dataBytes,dataOffset+12)^tfsKey[7]];for(var j=7;j>=0;j--){tfsIrnd(j,blk);}
setW(dataBytes,dataOffset,blk[2]^tfsKey[0]);setW(dataBytes,dataOffset+4,blk[3]^tfsKey[1]);setW(dataBytes,dataOffset+8,blk[0]^tfsKey[2]);setW(dataBytes,dataOffset+12,blk[1]^tfsKey[3]);dataOffset+=16;}
return{name:"twofish",blocksize:128/8,open:tfsInit,close:tfsClose,encrypt:tfsEncrypt,decrypt:tfsDecrypt};}
ALGORITHMS.TWOFISH={create:createTwofish};var MODES={};function createECB(){function encryptOpenECB(){this.algorithm.open(this.keyBytes);this.dataLength=this.dataBytes.length;this.dataOffset=0;return;}
function encryptCloseECB(){this.algorithm.close();}
function encryptProcECB(){this.algorithm.encrypt(this.dataBytes,this.dataOffset);this.dataOffset+=this.algorithm.blocksize;if(this.dataLength<=this.dataOffset){return 0;}else{return this.dataLength-this.dataOffset;}}
function decryptOpenECB(){this.algorithm.open(this.keyBytes);this.dataLength=this.dataBytes.length;this.dataOffset=0;return;}
function decryptProcECB(){this.algorithm.decrypt(this.dataBytes,this.dataOffset);this.dataOffset+=this.algorithm.blocksize;if(this.dataLength<=this.dataOffset){return 0;}else{return this.dataLength-this.dataOffset;}}
function decryptCloseECB(){this.algorithm.close();while(this.dataBytes[this.dataBytes.length-1]==0)
this.dataBytes.pop();}
return{encrypt:{open:encryptOpenECB,exec:encryptProcECB,close:encryptCloseECB},decrypt:{open:decryptOpenECB,exec:decryptProcECB,close:decryptCloseECB}};}
MODES.ECB=createECB();function createCBC(){function encryptOpenCBC(){this.algorithm.open(this.keyBytes);this.dataBytes.unshift(randByte(),randByte(),randByte(),randByte(),randByte(),randByte(),randByte(),randByte(),randByte(),randByte(),randByte(),randByte(),randByte(),randByte(),randByte(),randByte());this.dataLength=this.dataBytes.length;this.dataOffset=16;return;}
function encryptProcCBC(){for(var idx2=this.dataOffset;idx2<this.dataOffset+16;idx2++)
this.dataBytes[idx2]^=this.dataBytes[idx2-16];this.algorithm.encrypt(this.dataBytes,this.dataOffset);this.dataOffset+=this.algorithm.blocksize;if(this.dataLength<=this.dataOffset){return 0;}else{return this.dataLength-this.dataOffset;}}
function encryptCloseCBC(){this.algorithm.close();}
function decryptOpenCBC(){this.algorithm.open(this.keyBytes);this.dataLength=this.dataBytes.length;this.dataOffset=16;this.iv=this.dataBytes.slice(0,16);return;}
function decryptProcCBC(){var iv2=this.dataBytes.slice(this.dataOffset,this.dataOffset+16);this.algorithm.decrypt(this.dataBytes,this.dataOffset);for(var ii=0;ii<16;ii++)
this.dataBytes[this.dataOffset+ii]^=this.iv[ii];this.dataOffset+=this.algorithm.blocksize;this.iv=iv2;if(this.dataLength<=this.dataOffset){return 0;}else{return this.dataLength-this.dataOffset;}}
function decryptCloseCBC(){this.algorithm.close();this.dataBytes.splice(0,16);while(this.dataBytes[this.dataBytes.length-1]==0)
this.dataBytes.pop();}
return{encrypt:{open:encryptOpenCBC,exec:encryptProcCBC,close:encryptCloseCBC},decrypt:{open:decryptOpenCBC,exec:decryptProcCBC,close:decryptCloseCBC}};}
MODES.CBC=createCBC();function createCFB(){function encryptOpenCFB(){throw"not implemented!";}
function encryptProcCFB(){throw"not implemented!";}
function encryptCloseCFB(){throw"not implemented!";}
function decryptOpenCFB(){throw"not implemented!";}
function decryptProcCFB(){throw"not implemented!";}
function decryptCloseCFB(){throw"not implemented!";}
return{encrypt:{open:encryptOpenCFB,exec:encryptProcCFB,close:encryptCloseCFB},decrypt:{open:decryptOpenCFB,exec:decryptProcCFB,close:decryptCloseCFB}};}
MODES.CFB=createCFB();function createOFB(){function encryptOpenOFB(){throw"not implemented!";}
function encryptProcOFB(){throw"not implemented!";}
function encryptCloseOFB(){throw"not implemented!";}
function decryptOpenOFB(){throw"not implemented!";}
function decryptProcOFB(){throw"not implemented!";}
function decryptCloseOFB(){throw"not implemented!";}
return{encrypt:{open:encryptOpenOFB,exec:encryptProcOFB,close:encryptCloseOFB},decrypt:{open:decryptOpenOFB,exec:decryptProcOFB,close:decryptCloseOFB}};}
MODES.OFB=createOFB();function createCTR(){function encryptOpenCTR(){throw"not implemented!";}
function encryptProcCTR(){throw"not implemented!";}
function encryptCloseCTR(){throw"not implemented!";}
function decryptOpenCTR(){throw"not implemented!";}
function decryptProcCTR(){throw"not implemented!";}
function decryptCloseCTR(){throw"not implemented!";}
return{encrypt:{open:encryptOpenCTR,exec:encryptProcCTR,close:encryptCloseCTR},decrypt:{open:decryptOpenCTR,exec:decryptProcCTR,close:decryptCloseCTR}};}
MODES.CTR=createCTR();var PADDINGS={};function createRFC1321(){function appendPaddingRFC1321(data){var len=16-(data.length%16);data.push(0x80);for(var i=1;i<len;i++){data.push(0x00);}
return data;}
function removePaddingRFC1321(data){for(var i=data.length-1;0<=i;i--){var val=data[i];if(val==0x80){data.splice(i);break;}else if(val!=0x00){break;}}
return data;}
return{append:appendPaddingRFC1321,remove:removePaddingRFC1321};};PADDINGS.RFC1321=createRFC1321();function createANSIX923(){function appendPaddingANSIX923(data){var len=16-(data.length%16);for(var i=0;i<len-1;i++){data.push(0x00);}
data.push(len);return data;}
function removePaddingANSIX923(data){var len=data.pop();if(16<len)len=16;for(var i=1;i<len;i++){data.pop();}
return data;}
return{append:appendPaddingANSIX923,remove:removePaddingANSIX923};}
PADDINGS.ANSIX923=createANSIX923();function createISO10126(){function appendPaddingISO10126(data){var len=16-(data.length%16);for(var i=0;i<len-1;i++){data.push(randByte());}
data.push(len);return data;}
function removePaddingISO10126(data){var len=data.pop();if(16<len)len=16;for(var i=1;i<len;i++){data.pop();}
return data;}
return{append:appendPaddingISO10126,remove:removePaddingISO10126};}
PADDINGS.ISO10126=createISO10126();function createPKCS7(){function appendPaddingPKCS7(data){var len=16-(data.length%16);for(var i=0;i<len;i++){data.push(len);}
return data;}
function removePaddingPKCS7(data){var len=data.pop();if(16<len)len=0;for(var i=1;i<len;i++){data.pop();}
return data;}
return{append:appendPaddingPKCS7,remove:removePaddingPKCS7};}
PADDINGS.PKCS7=createPKCS7();function createNoPadding(){function appendPaddingNone(data){return data;}
function removePaddingNone(data){return data;}
return{append:appendPaddingNone,remove:removePaddingNone};}
PADDINGS.NO_PADDING=createNoPadding();var DIRECTIONS={ENCRYPT:"encrypt",DECRYPT:"decrypt"};function Cipher(algorithm,direction,mode,padding){this.algorithm=algorithm;this.direction=direction;this.mode=mode;this.padding=padding;this.modeOpen=mode[direction].open;this.modeExec=mode[direction].exec;this.modeClose=mode[direction].close;this.keyBytes=null;this.dataBytes=null;this.dataOffset=-1;this.dataLength=-1;}
Cipher.prototype=new Object();Cipher.prototype.inherit=Cipher;function open(keyBytes,dataBytes){if(keyBytes==null)throw"keyBytes is null";if(dataBytes==null)throw"dataBytes is null";this.keyBytes=keyBytes.concat();this.dataBytes=dataBytes;this.dataOffset=0;this.dataLength=dataBytes.length;if(this.direction==DIRECTIONS.ENCRYPT){this.padding.append(this.dataBytes);}
this.modeOpen();}
function operate(){return this.modeExec();}
function close(){this.modeClose();if(this.direction==DIRECTIONS.DECRYPT){this.padding.remove(this.dataBytes);}
return this.dataBytes;}
function execute(keyBytes,dataBytes){this.open(keyBytes,dataBytes);for(;;){var size=this.operate();if(0<size){continue;}else{break;}}
return this.close();}
Cipher.prototype.open=open;Cipher.prototype.close=close;Cipher.prototype.operate=operate;Cipher.prototype.execute=execute;Cipher.ENCRYPT="ENCRYPT";Cipher.DECRYPT="DECRYPT";Cipher.RIJNDAEL="RIJNDAEL";Cipher.SERPENT="SERPENT";Cipher.TWOFISH="TWOFISH";Cipher.ECB="ECB";Cipher.CBC="CBC";Cipher.CFB="CFB";Cipher.OFB="OFB";Cipher.CTR="CTR";Cipher.RFC1321="RFC1321";Cipher.ANSIX923="ANSIX923";Cipher.ISO10126="ISO10126";Cipher.PKCS7="PKCS7";Cipher.NO_PADDING="NO_PADDING";Cipher.create=function(algorithmName,directionName,modeName,paddingName){if(algorithmName==null)algorithmName=Cipher.RIJNDAEL;if(directionName==null)directionName=Cipher.ENCRYPT;if(modeName==null)modeName=Cipher.CBC;if(paddingName==null)paddingName=Cipher.PKCS7;var algorithm=ALGORITHMS[algorithmName];var direction=DIRECTIONS[directionName];var mode=MODES[modeName];var padding=PADDINGS[paddingName];if(algorithm==null)throw"Invalid algorithm name '"+algorithmName+"'.";if(direction==null)throw"Invalid direction name '"+directionName+"'.";if(mode==null)throw"Invalid mode name '"+modeName+"'.";if(padding==null)throw"Invalid padding name '"+paddingName+"'.";return new Cipher(algorithm.create(),direction,mode,padding);};Cipher.algorithm=function(algorithmName){if(algorithmName==null)throw"Null Pointer Exception ( algorithmName )";var algorithm=ALGORITHMS[algorithmName];if(algorithm==null)throw"Invalid algorithm name '"+algorithmName+"'.";return algorithm.create();}
__Crypto.__export(packageRoot,"titaniumcore.crypto.Cipher",Cipher);}
initBlockCipher(__Crypto);function initRNG(packages){__Crypto.__unit("SecureRandom.js");__Crypto.__uses("packages.js");var Arcfour=function(){this.i=0;this.j=0;this.S=new Array();};Arcfour.prototype.init=function(key){var i,j,t;for(i=0;i<256;++i)
this.S[i]=i;j=0;for(i=0;i<256;++i){j=(j+this.S[i]+key[i%key.length])&255;t=this.S[i];this.S[i]=this.S[j];this.S[j]=t;}
this.i=0;this.j=0;};Arcfour.prototype.next=function(){var t;this.i=(this.i+1)&255;this.j=(this.j+this.S[this.i])&255;t=this.S[this.i];this.S[this.i]=this.S[this.j];this.S[this.j]=t;return this.S[(t+this.S[this.i])&255];};Arcfour.create=function(){return new Arcfour();};Arcfour.rng_psize=256;var rng_state=null;var rng_pool=[];var rng_pptr=0;rng_seed_int=function(x){rng_pool[rng_pptr]^=x&255;rng_pptr++;rng_pool[rng_pptr]^=(x>>8)&255;rng_pptr++;rng_pool[rng_pptr]^=(x>>16)&255;rng_pptr++;rng_pool[rng_pptr]^=(x>>24)&255;rng_pptr++;if(rng_pptr>=Arcfour.rng_psize)rng_pptr-=Arcfour.rng_psize;};rng_seed_time=function(){rng_seed_int(new Date().getTime());};pool_init=function(){var t;while(rng_pptr<Arcfour.rng_psize){t=Math.floor(65536*Math.random());rng_pool[rng_pptr++]=t>>>8;rng_pool[rng_pptr++]=t&255;}
rng_pptr=0;rng_seed_time();};var rng_get_byte=function(){if(rng_state==null){rng_seed_time();rng_state=Arcfour.create();rng_state.init(rng_pool);for(rng_pptr=0;rng_pptr<rng_pool.length;++rng_pptr)
rng_pool[rng_pptr]=0;rng_pptr=0;}
return rng_state.next();};var SecureRandom=function(){};SecureRandom.prototype.nextBytes=function(ba){for(var i=0;i<ba.length;++i)
ba[i]=rng_get_byte();};pool_init();__Crypto.__export(packages,"titaniumcore.crypto.SecureRandom",SecureRandom);};initRNG(__Crypto);var hexcase=0;var b64pad="";function hex_md5(s){return rstr2hex(rstr_md5(str2rstr_utf8(s)));}
function b64_md5(s){return rstr2b64(rstr_md5(str2rstr_utf8(s)));}
function any_md5(s,e){return rstr2any(rstr_md5(str2rstr_utf8(s)),e);}
function hex_hmac_md5(k,d)
{return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k),str2rstr_utf8(d)));}
function b64_hmac_md5(k,d)
{return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k),str2rstr_utf8(d)));}
function any_hmac_md5(k,d,e)
{return rstr2any(rstr_hmac_md5(str2rstr_utf8(k),str2rstr_utf8(d)),e);}
function md5_vm_test()
{return hex_md5("abc").toLowerCase()=="900150983cd24fb0d6963f7d28e17f72";}
function rstr_md5(s)
{return binl2rstr(binl_md5(rstr2binl(s),s.length*8));}
function rstr_hmac_md5(key,data)
{var bkey=rstr2binl(key);if(bkey.length>16)bkey=binl_md5(bkey,key.length*8);var ipad=Array(16),opad=Array(16);for(var i=0;i<16;i++)
{ipad[i]=bkey[i]^0x36363636;opad[i]=bkey[i]^0x5C5C5C5C;}
var hash=binl_md5(ipad.concat(rstr2binl(data)),512+data.length*8);return binl2rstr(binl_md5(opad.concat(hash),512+128));}
function rstr2hex(input)
{try{hexcase}catch(e){hexcase=0;}
var hex_tab=hexcase?"0123456789ABCDEF":"0123456789abcdef";var output="";var x;for(var i=0;i<input.length;i++)
{x=input.charCodeAt(i);output+=hex_tab.charAt((x>>>4)&0x0F)
+hex_tab.charAt(x&0x0F);}
return output;}
function rstr2b64(input)
{try{b64pad}catch(e){b64pad='';}
var tab="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var output="";var len=input.length;for(var i=0;i<len;i+=3)
{var triplet=(input.charCodeAt(i)<<16)|(i+1<len?input.charCodeAt(i+1)<<8:0)|(i+2<len?input.charCodeAt(i+2):0);for(var j=0;j<4;j++)
{if(i*8+j*6>input.length*8)output+=b64pad;else output+=tab.charAt((triplet>>>6*(3-j))&0x3F);}}
return output;}
function rstr2any(input,encoding)
{var divisor=encoding.length;var i,j,q,x,quotient;var dividend=Array(Math.ceil(input.length/2));for(i=0;i<dividend.length;i++)
{dividend[i]=(input.charCodeAt(i*2)<<8)|input.charCodeAt(i*2+1);}
var full_length=Math.ceil(input.length*8/(Math.log(encoding.length)/Math.log(2)));var remainders=Array(full_length);for(j=0;j<full_length;j++)
{quotient=Array();x=0;for(i=0;i<dividend.length;i++)
{x=(x<<16)+dividend[i];q=Math.floor(x/divisor);x-=q*divisor;if(quotient.length>0||q>0)
quotient[quotient.length]=q;}
remainders[j]=x;dividend=quotient;}
var output="";for(i=remainders.length-1;i>=0;i--)
output+=encoding.charAt(remainders[i]);return output;}
function str2rstr_utf8(input)
{var output="";var i=-1;var x,y;while(++i<input.length)
{x=input.charCodeAt(i);y=i+1<input.length?input.charCodeAt(i+1):0;if(0xD800<=x&&x<=0xDBFF&&0xDC00<=y&&y<=0xDFFF)
{x=0x10000+((x&0x03FF)<<10)+(y&0x03FF);i++;}
if(x<=0x7F)
output+=String.fromCharCode(x);else if(x<=0x7FF)
output+=String.fromCharCode(0xC0|((x>>>6)&0x1F),0x80|(x&0x3F));else if(x<=0xFFFF)
output+=String.fromCharCode(0xE0|((x>>>12)&0x0F),0x80|((x>>>6)&0x3F),0x80|(x&0x3F));else if(x<=0x1FFFFF)
output+=String.fromCharCode(0xF0|((x>>>18)&0x07),0x80|((x>>>12)&0x3F),0x80|((x>>>6)&0x3F),0x80|(x&0x3F));}
return output;}
function str2rstr_utf16le(input)
{var output="";for(var i=0;i<input.length;i++)
output+=String.fromCharCode(input.charCodeAt(i)&0xFF,(input.charCodeAt(i)>>>8)&0xFF);return output;}
function str2rstr_utf16be(input)
{var output="";for(var i=0;i<input.length;i++)
output+=String.fromCharCode((input.charCodeAt(i)>>>8)&0xFF,input.charCodeAt(i)&0xFF);return output;}
function rstr2binl(input)
{var output=Array(input.length>>2);for(var i=0;i<output.length;i++)
output[i]=0;for(var i=0;i<input.length*8;i+=8)
output[i>>5]|=(input.charCodeAt(i/8)&0xFF)<<(i%32);return output;}
function binl2rstr(input)
{var output="";for(var i=0;i<input.length*32;i+=8)
output+=String.fromCharCode((input[i>>5]>>>(i%32))&0xFF);return output;}
function binl_md5(x,len)
{x[len>>5]|=0x80<<((len)%32);x[(((len+64)>>>9)<<4)+14]=len;var a=1732584193;var b=-271733879;var c=-1732584194;var d=271733878;for(var i=0;i<x.length;i+=16)
{var olda=a;var oldb=b;var oldc=c;var oldd=d;a=md5_ff(a,b,c,d,x[i+0],7,-680876936);d=md5_ff(d,a,b,c,x[i+1],12,-389564586);c=md5_ff(c,d,a,b,x[i+2],17,606105819);b=md5_ff(b,c,d,a,x[i+3],22,-1044525330);a=md5_ff(a,b,c,d,x[i+4],7,-176418897);d=md5_ff(d,a,b,c,x[i+5],12,1200080426);c=md5_ff(c,d,a,b,x[i+6],17,-1473231341);b=md5_ff(b,c,d,a,x[i+7],22,-45705983);a=md5_ff(a,b,c,d,x[i+8],7,1770035416);d=md5_ff(d,a,b,c,x[i+9],12,-1958414417);c=md5_ff(c,d,a,b,x[i+10],17,-42063);b=md5_ff(b,c,d,a,x[i+11],22,-1990404162);a=md5_ff(a,b,c,d,x[i+12],7,1804603682);d=md5_ff(d,a,b,c,x[i+13],12,-40341101);c=md5_ff(c,d,a,b,x[i+14],17,-1502002290);b=md5_ff(b,c,d,a,x[i+15],22,1236535329);a=md5_gg(a,b,c,d,x[i+1],5,-165796510);d=md5_gg(d,a,b,c,x[i+6],9,-1069501632);c=md5_gg(c,d,a,b,x[i+11],14,643717713);b=md5_gg(b,c,d,a,x[i+0],20,-373897302);a=md5_gg(a,b,c,d,x[i+5],5,-701558691);d=md5_gg(d,a,b,c,x[i+10],9,38016083);c=md5_gg(c,d,a,b,x[i+15],14,-660478335);b=md5_gg(b,c,d,a,x[i+4],20,-405537848);a=md5_gg(a,b,c,d,x[i+9],5,568446438);d=md5_gg(d,a,b,c,x[i+14],9,-1019803690);c=md5_gg(c,d,a,b,x[i+3],14,-187363961);b=md5_gg(b,c,d,a,x[i+8],20,1163531501);a=md5_gg(a,b,c,d,x[i+13],5,-1444681467);d=md5_gg(d,a,b,c,x[i+2],9,-51403784);c=md5_gg(c,d,a,b,x[i+7],14,1735328473);b=md5_gg(b,c,d,a,x[i+12],20,-1926607734);a=md5_hh(a,b,c,d,x[i+5],4,-378558);d=md5_hh(d,a,b,c,x[i+8],11,-2022574463);c=md5_hh(c,d,a,b,x[i+11],16,1839030562);b=md5_hh(b,c,d,a,x[i+14],23,-35309556);a=md5_hh(a,b,c,d,x[i+1],4,-1530992060);d=md5_hh(d,a,b,c,x[i+4],11,1272893353);c=md5_hh(c,d,a,b,x[i+7],16,-155497632);b=md5_hh(b,c,d,a,x[i+10],23,-1094730640);a=md5_hh(a,b,c,d,x[i+13],4,681279174);d=md5_hh(d,a,b,c,x[i+0],11,-358537222);c=md5_hh(c,d,a,b,x[i+3],16,-722521979);b=md5_hh(b,c,d,a,x[i+6],23,76029189);a=md5_hh(a,b,c,d,x[i+9],4,-640364487);d=md5_hh(d,a,b,c,x[i+12],11,-421815835);c=md5_hh(c,d,a,b,x[i+15],16,530742520);b=md5_hh(b,c,d,a,x[i+2],23,-995338651);a=md5_ii(a,b,c,d,x[i+0],6,-198630844);d=md5_ii(d,a,b,c,x[i+7],10,1126891415);c=md5_ii(c,d,a,b,x[i+14],15,-1416354905);b=md5_ii(b,c,d,a,x[i+5],21,-57434055);a=md5_ii(a,b,c,d,x[i+12],6,1700485571);d=md5_ii(d,a,b,c,x[i+3],10,-1894986606);c=md5_ii(c,d,a,b,x[i+10],15,-1051523);b=md5_ii(b,c,d,a,x[i+1],21,-2054922799);a=md5_ii(a,b,c,d,x[i+8],6,1873313359);d=md5_ii(d,a,b,c,x[i+15],10,-30611744);c=md5_ii(c,d,a,b,x[i+6],15,-1560198380);b=md5_ii(b,c,d,a,x[i+13],21,1309151649);a=md5_ii(a,b,c,d,x[i+4],6,-145523070);d=md5_ii(d,a,b,c,x[i+11],10,-1120210379);c=md5_ii(c,d,a,b,x[i+2],15,718787259);b=md5_ii(b,c,d,a,x[i+9],21,-343485551);a=safe_add(a,olda);b=safe_add(b,oldb);c=safe_add(c,oldc);d=safe_add(d,oldd);}
return Array(a,b,c,d);}
function md5_cmn(q,a,b,x,s,t)
{return safe_add(bit_rol(safe_add(safe_add(a,q),safe_add(x,t)),s),b);}
function md5_ff(a,b,c,d,x,s,t)
{return md5_cmn((b&c)|((~b)&d),a,b,x,s,t);}
function md5_gg(a,b,c,d,x,s,t)
{return md5_cmn((b&d)|(c&(~d)),a,b,x,s,t);}
function md5_hh(a,b,c,d,x,s,t)
{return md5_cmn(b^c^d,a,b,x,s,t);}
function md5_ii(a,b,c,d,x,s,t)
{return md5_cmn(c^(b|(~d)),a,b,x,s,t);}
function safe_add(x,y)
{var lsw=(x&0xFFFF)+(y&0xFFFF);var msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&0xFFFF);}
function bit_rol(num,cnt)
{return(num<<cnt)|(num>>>(32-cnt));}
var FeedHenryContainer=function(){var self={init:function(){self.paramsArray=new Array();self.fhClientArray=new Array();self.prefsArray=new Array();self.swaggerTimerArray=new Array();self.destinationArray=new Array();},addFhClient:function(fhClient){self.fhClientArray[fhClient.instance]=fhClient;},addInstance:function(widgetParams){self.paramsArray[widgetParams.instance]=widgetParams;if(typeof TimeRecorder!="undefined"){var timer=new TimeRecorder(widgetParams.timerParams);self.addTimer(timer);}},addTimer:function(swaggerTimer){self.swaggerTimerArray[swaggerTimer.instance]=swaggerTimer;$fhjq('#widget_'+swaggerTimer.instance).mouseenter(function(){var widgetInstance=$fhjq(this).attr('id').substr(7);if(self.currentInstance!=widgetInstance){self.mouseIn(widgetInstance);self.currentInstance=widgetInstance;}}).mouseleave(function(){var widgetInstance=$fhjq(this).attr('id').substr(7);if(self.currentInstance!=''){self.mouseOut(widgetInstance);self.currentInstance='';}});},getTimer:function(guid){var swaggerTimer=self.swaggerTimerArray[guid];return swaggerTimer;},mouseIn:function(guid){var swaggerTimer=self.swaggerTimerArray[guid];swaggerTimer.mouseIn();},mouseOut:function(guid){var swaggerTimer=self.swaggerTimerArray[guid];swaggerTimer.mouseOut();},watchTimer:function(guid){var swaggerTimer=self.swaggerTimerArray[guid];swaggerTimer.watchTimer();},getParams:function(guid){var containerParams=self.paramsArray[guid];var clientParams=self.fhClientArray[guid];var params=new Object();params.container=containerParams;params.client=clientParams;return params;},getFhClient:function(guid){var fhclient=self.fhClientArray[guid];return fhclient;},getElementById:function(elementName,guid){var element=$fhjq('#'+elementName+"_"+guid);return element;},getPrefsObj:function(guid){var prefsObj=self.prefsArray[guid];if(prefsObj==undefined){var params=self.getParams(guid);var prefsData=params.container.widgetprefs;prefsObj=new fhprefs(self,guid,prefsData);self.prefsArray[guid]=prefsObj;}
return prefsObj;},showHeader:function(guid){$fhjq("#header_"+guid).show();},hideHeader:function(guid){$fhjq("#header_"+guid).hide();},showFooter:function(guid){$fhjq("#footer_"+guid).show();},hideFooter:function(guid){$fhjq("#footer_"+guid).hide();},iframeLoad:function(guid){},toggleExpandState:function(guid,newState){var params=self.getParams(guid);if(newState=="false"){$fhjq("#body_"+guid).addClass("fh_wc_widgetbody_expanded");$fhjq("#body_"+guid).removeClass('fh_wc_widgetbody_collapsed');$fhjq("#header_"+guid).find(".fh_wc_but-expand-shown").show();$fhjq("#header_"+guid).find(".fh_wc_but-expand-hidden").hide();$fhjq("#header_left_"+guid).removeClass('fh_wc_header_left_collapsed');$fhjq("#header_right_"+guid).removeClass('fh_wc_header_right_collapsed');$fhjq("#footer_"+guid).show();}
else
if(newState=="true"){$fhjq("#body_"+guid).removeClass('fh_wc_widgetbody_expanded');$fhjq("#body_"+guid).addClass('fh_wc_widgetbody_collapsed');$fhjq("#header_"+guid).find(".fh_wc_but-expand-shown").hide();$fhjq("#header_"+guid).find(".fh_wc_but-expand-hidden").show();$fhjq("#header_left_"+guid).addClass('fh_wc_header_left_collapsed');$fhjq("#header_right_"+guid).addClass('fh_wc_header_right_collapsed');$fhjq("#footer_"+guid).hide();}
else{newState="false";}
if("feedhenry"==params.container.destination){$fhjq.post(StartPage.apiPrefix+StartPage.domain+'/instances/changeExpandState',JSON.stringify({subscription_id:guid,expandState:newState}),function(data){StartPage.fh_page.adjustFooter();},'json');}},reload:function(guid){self.openIfClosed(guid);var params=self.getParams(guid);self.getPrefsObj(guid).dropColorChange();if(params.client.widget.inline){var reloadPath=$fh.legacy.widgetpath+'/file/'+params.container.startFile;$fhjq.get(reloadPath,'',function(data){$fhjq('#widgetbody_'+guid).html(data);self.resizeWidgetBody(guid,'widgetbody_');});}
else{var iframe=$fhjq("#widgetbody_"+guid+" #iframe_"+guid);var srcVal=iframe.attr('src');iframe.attr('src',srcVal);}
self.hideAll(guid);$fhjq("#widgetbody_"+guid).show();self.fh_call_log_event(guid,'ClickReload','0','TitleBar','','0','','','',params.container.viewGuid);},resizeWidgetBody:function(guid,fromDiv){var params=self.getParams(guid);if("feedhenry"==params.container.destination){StartPage.fh_page.adjustFooter();}},calculateWidgetHeight:function(guid){var height=$fhjq("#widgetbody_"+guid).height();var minheight=$fhjq("#widgetbody_"+guid).css("min-height");minheight=minheight.substring(0,(minheight.length-2));height=(minheight>height)?minheight:height-20;return height;},showEdit:function(guid){self.openIfClosed(guid);var params=self.getParams(guid);var editUrl=$fh.legacy.widgetpath+'/edit';$fhjq.get(editUrl,function(data){$fhjq('#editDiv_'+guid).html(data);$fhjq('#editDiv_'+guid).height(self.calculateWidgetHeight(guid));self.hideAll(guid);$fhjq('#editDiv_'+guid).show();});self.fh_call_log_event(guid,'ClickEditPreferences','0','TitleBar','','1','','','',params.container.viewGuid);},hideEdit:function(guid){var params=self.getParams(guid);self.getPrefsObj(guid).dropColorChange();self.hideAll(guid);$fhjq("#widgetbody_"+guid).show();self.fh_call_log_event(guid,'ClickExitButton','1','Preferences','','0','','cancel','',params.container.viewGuid);},doEdit:function(guid){var params=self.getParams(guid);var fhClient=self.getFhClient(guid);var domain=params.container.domain;var prefsObj=self.getPrefsObj(guid);prefsObj.setPrefs(fhClient,guid,domain);},setPrefNames:function(guid,names){var params=self.getParams(guid);params.container.editPrefsNames=names;},getPrefs:function(guid){var prefsObj=self.getPrefsObj(guid);return prefsObj.getPrefs();},colorChange:function(guid,color){var prefsObj=self.getPrefsObj(guid);prefsObj.logColorChange(color);$fhjq('#colorpicker_'+guid+' span').removeClass('activeColor');$fhjq('#'+color+'_'+guid).addClass('activeColor');},showShare:function(guid){self.openIfClosed(guid);self.getPrefsObj(guid).dropColorChange();var params=self.getParams(guid);var shareUrl=$fh.legacy.widgetpath+'/share';$fhjq.get(shareUrl,function(data){$fhjq('#shareDiv_'+guid).html(data);var existingHeight=$fhjq('#shareDiv_'+guid).height();var widgetCurrentHeight=self.calculateWidgetHeight(guid);if(existingHeight<widgetCurrentHeight){$fhjq('#shareDiv_'+guid).height(widgetCurrentHeight);}
self.hideAll(guid);$fhjq('#shareDiv_'+guid).show();});self.fh_call_log_event(guid,'ClickShare','0','TitleBar','','1','','','',params.container.viewGuid);},hideShare:function(guid){var params=self.getParams(guid);self.hideAll(guid);$fhjq("#widgetbody_"+guid).show();self.fh_call_log_event(guid,'ClickCancelButton','1','Sharing','','0','','','',params.container.viewGuid);},doShare:function(guid){},openIfClosed:function(guid){if("none"==$fhjq("#header_"+guid).find(".fh_wc_but-expand-shown").css("display")){self.toggleExpandState(guid,'false');}},showRemove:function(guid){var params=self.getParams(guid);self.openIfClosed(guid);$fhjq('#deleteDiv_'+guid).height(self.calculateWidgetHeight(guid));self.hideAll(guid);$fhjq("#deleteDiv_"+guid).show();self.fh_call_log_event(guid,'ClickDelete','0','TitleBar','','0','','','',params.container.viewGuid);},hideRemove:function(guid){self.hideAll(guid);$fhjq("#widgetbody_"+guid).show();},doRemove:function(guid){var params=self.getParams(guid);if("feedhenry"==params.container.destination){StartPage.Widgets.destroy(guid);}
else{var removePath=$fh.legacy.widgetpath+'/remove';$fhjq.post(removePath,'',function(data){$fhjq('#widget_'+guid).html('');});}},hideAll:function(guid){$fhjq("#editDiv_"+guid).hide();$fhjq("#shareDiv_"+guid).hide();$fhjq("#deleteDiv_"+guid).hide();$fhjq("#widgetbody_"+guid).hide();},fh_call_log_event:function(_guid,_action,_fromLevel,_fromLocation,_source,_toLevel,_toLocation,_toLocationCategory,_toLocationSubCategory,_swaggerGuid){var myJSONObject={"type":"In-Widget","data":{"action":_action,"source":_guid,"fromLocation":_fromLocation,"toLocation":_toLocation,"toLocationCategory":_toLocationCategory,"toLocationSubCategory":_toLocationSubCategory,"fromLevel":_fromLevel,"viewGuid":_swaggerGuid,"toLevel":_toLevel}};var reqjson=JSON.stringify(myJSONObject);},dynamicResize:function(guid){var currentWidgetHeight=$fhjq('#subscription_'+guid).height();currentWidgetHeight=currentWidgetHeight+$fhjq('#subscription_'+guid).height()+$fhjq('#shareDiv_'+guid).height()+$fhjq('#preferencesDiv_'+guid).height();$fhjq('#subscription_'+guid).css('height',currentWidgetHeight);},initialise:function(guid){$fh.env({},function(env_props){$fh.data({key:'__fhinit__'},function(res){var params=self.getParams(guid);var reqdata={};if(typeof res.val!="undefined"&&res.val!=null&&res.val.length>0){try{reqdata=JSON.parse(res.val);}catch(e){reqdata={};}}
reqdata.appid=env_props.application;reqdata.uuid=env_props.uuid;reqdata.destination=env_props.destination;reqdata.app_version=env_props.version;reqdata.domain=env_props.domain;reqdata.agent=env_props.agent;var url=$fh.legacy.widgetpath+'/initialise';$fhjq.ajax({type:'POST',url:url,data:JSON.stringify(reqdata),success:function(data){$fh.data({act:'save',key:'__fhinit__',val:data});}});});});},share:function(){var share={init:function(){share.mainDiv='share_options_area_';share.destinationsDiv='share_destinations_area_';share.DestinationClass='fh_wc_share_destination_';share.destinationDiv='share_destination_';share.linkShareId='fh_linkShare_';share.linkShareText='fh_linkShare_destination_';share.sharingLink='fh_wc_sharing_link';},setMinHeight:function(guid,height){share["min-height-"+guid]=height;},showDestinationShare:function(guid,destination){var existingHeight=$fhjq('#shareDiv_'+guid).height();var min=share["min-height-"+guid];if(null==min){share.setMinHeight(guid,existingHeight);min=existingHeight;}
$fhjq('.'+share.DestinationClass+guid).hide();share.doLinkShare(guid,destination);$fhjq('#'+share.destinationsDiv+guid).show();$fhjq('#'+share.destinationDiv+destination+"_"+guid).show();$fhjq('#shareDiv_'+guid).height("auto");var newHeight=$fhjq('#shareDiv_'+guid).height();if(newHeight<min){$fhjq('#shareDiv_'+guid).height(min);}
$fhjq('.fh_dock_accordion_preview_wrapper').jScrollPane({showArrows:false,scrollbarWidth:16,arrowSize:14,paneFixed:false});self.resizeWidgetBody(guid,'shareDiv_');},doBack:function(guid){$fhjq('.'+share.DestinationClass+guid).hide();$fhjq('#'+share.destinationsDiv+guid).hide();$fhjq('#'+share.mainDiv+guid).show();},doLinkShare:function(guid,destination){var params=self.getParams(guid);var linkShare=$fh.legacy.widgetpath+'/share/'+destination;var linkShareText='Your widget has been shared to '+destination;if('netvibes'===destination){linkShareText='Before you can share to Netvibes, your <a class="" target="_blank" href="http://www.netvibes.com">dashboard</a> must be already set up.';$fhjq('.'+share.linkShareId+guid).parent().html('Once set up, please <a class="'+share.linkShareId+guid+'" target="_blank">click here</a> to go to your widget')}
$fhjq('.'+share.linkShareId+guid).attr('href',linkShare);$fhjq('.'+share.linkShareText+guid).html(linkShareText);},doEmailShare:function(guid){var params=self.getParams(guid);var shareUrl=$fh.legacy.widgetpath+'/share/email';var reqData=new Object();var fieldBase="fh_share_mail_";reqData.fromName=$fhjq('#'+fieldBase+'from_name_'+guid).val();reqData.fromEmail=$fhjq('#'+fieldBase+'from_email_'+guid).val();reqData.toName=$fhjq('#'+fieldBase+'to_name_'+guid).val();reqData.toEmail=$fhjq('#'+fieldBase+'to_email_'+guid).val();reqData.message=$fhjq('#'+fieldBase+'message_'+guid).val();$fhjq.post(shareUrl,JSON.stringify(reqData),function(data){share.finishEmailShare(guid,data,reqData);},'json');},doClearField:function(id){$fhjq('#'+id).val("");},finishEmailShare:function(guid,res,reqData){var message="Your widget has been shared.";if(res.result=="fail"){message="There was an error sharing you widget. "+res.reason;}
$fhjq('#share_email_results_'+guid).show();$fhjq('#share_email_div_'+guid).hide();$fhjq('#share_email_message_'+guid).html(message);}};share.init();return{showDestinationShare:share.showDestinationShare,doBack:share.doBack,doEmailShare:share.doEmailShare,setMinHeight:share.setMinHeight,doClearField:share.doClearField};}};self.init();return{addInstance:self.addInstance,addFhClient:self.addFhClient,showHeader:self.showHeader,hideHeader:self.hideHeader,showFooter:self.showFooter,hideFooter:self.hideFooter,iframeLoad:self.iframeLoad,toggleExpandState:self.toggleExpandState,reload:self.reload,getPrefs:self.getPrefs,setPrefs:self.setPrefs,setPrefNames:self.setPrefNames,showEdit:self.showEdit,hideEdit:self.hideEdit,doEdit:self.doEdit,colorChange:self.colorChange,showShare:self.showShare,hideShare:self.hideShare,doShare:self.doShare,showRemove:self.showRemove,hideRemove:self.hideRemove,doRemove:self.doRemove,showDestinationShare:self.share().showDestinationShare,shareBack:self.share().doBack,doEmailShare:self.share().doEmailShare,addTimer:self.addTimer,getTimer:self.getTimer,mouseIn:self.mouseIn,mouseOut:self.mouseOut,watchTimer:self.watchTimer,getElementById:self.getElementById,doClearField:self.share().doClearField,initialise:self.initialise};};var fhprefs=function(container,guid,data){var self={init:function(){self.data=data;self.guid=guid;self.container=container;self.currentColor='';self.originalColor='';},logColorChange:function(color){var newColor=color;var params=self.container.getParams(self.guid);if(self.currentColor==''){self.currentColor=params.container.color;}
if(self.originalColor==''){self.originalColor=params.container.color;}
if(''!==newColor&&self.currentColor!==newColor){self.applyColourChange(self.guid,self.currentColor,newColor);self.currentColor=newColor;}},dropColorChange:function(){if(''!==self.originalColor&&self.currentColor!==self.originalColor){self.applyColourChange(self.guid,self.currentColor,self.originalColor);}
self.currentColor=self.originalColor;},applyColourChange:function(guid,oldColor,newColor){var params=self.container.getParams(self.guid);if(params.container.showHeader){$fhjq('#header_'+guid).removeClass(oldColor);$fhjq('#header_'+guid).addClass(newColor);}
if(params.container.showFooter){$fhjq('#footer_'+guid).removeClass(oldColor);$fhjq('#footer_'+guid).addClass(newColor);}},setPrefs:function(fhclient,guid,domain){var isValid=$fhjq('#edit_'+guid).valid();if(!isValid){return;}
var params=self.container.getParams(guid);var prefs={};var prefContainer=$fhjq('#edit_'+guid);var prefNames=params.container.editPrefsNames;var len=prefNames.length;for(nI=0;nI<len;nI++){var pName=prefNames[nI];var prefId='#'+guid+'_'+pName;var pref=$fhjq(prefId);var fh_editprefs_type=pref.attr("type");switch(fh_editprefs_type){case'checkbox':prefs[pName]=pref.attr("checked")===true?"true":"false";break;case'radio':var number_of_stories=$fhjq("#edit_"+guid+" input[name='"+prefId.substring(1,prefId.length)+"']:radio:checked").val();if(typeof number_of_stories!='undefined'){prefs[pName]=number_of_stories;}
break;case'textarea':var fh_editpref_textarea_value=pref.val().replace(new RegExp("\\n","g"),"");fh_editpref_textarea_value=fh_editpref_textarea_value.replace(/^\s*|\s*$/g,'');prefs[pName]=fh_editpref_textarea_value;break;default:if(pName=="widgetColor"){prefs[pName]=self.currentColor;}
else{prefs[pName]=pref.val();}
break;}}
prefs.viewGuid=params.container.viewGuid;fhclient.call('act/wid/prefs/save',{instance:guid,domain:domain,destination:params.container.destination,prefs:prefs},self.responseSave);},responseSave:function(res){var params=self.container.getParams(guid);var destination=params.container.destination;if(res.errors){if(destination!='desktop'){var errors=res.errors;for(i=0;i<errors.length;i++){fh_alert(errors[i]);}}}
else{var prefs=res.prefs;self.data=prefs;self.originalColor=self.currentColor;if(destination!='mobile'){self.container.reload(self.guid);}}},fh_alert:function(msg){$fhjq('#alertMessages_'+self.guid).html(msg);$fhjq('#alerts_'+self.guid).show();},getPrefs:function(){return self.data;}};self.init();return{getPrefs:self.getPrefs,setPrefs:self.setPrefs,logColorChange:self.logColorChange,dropColorChange:self.dropColorChange};};$fh={APP_MODE_DEBUG:'debug',APP_MODE_RELEASE:'release',APP_MODE_DISTRIBUTION:'distribution',CLOUD_TYPE_FH:'fh',CLOUD_TYPE_NODE:'node'};;(function(){$fh.__is_ready=false;$fh.__ready_list=[];var __ready_bound=false;var __security_loaded=false;var __module_paths={'security':'fhext/js/security.js'};var __ready=function(){if(!$fh.__is_ready){$fh.__is_ready=true;if($fh.__ready_list){try{while($fh.__ready_list[0]){$fh.__ready_list.shift().apply(document,[]);}}finally{}
$fh.__ready_list=null;}}};$fh.__bind_ready=function(){if(__ready_bound)return;__ready_bound=true;if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,false);__ready();},false);window.addEventListener("load",__ready,false);}else if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);__ready();}});window.attachEvent("onload",__ready);if(document.documentElement.doScroll&&window==window.top)(function(){if($fh.__is_ready)return;try{document.documentElement.doScroll("left");}catch(error){setTimeout(arguments.callee,0);return;}
__ready();})();}};$fh.__bind_ready();var __XMLHttpRequest__=window.ActiveXObject?ActiveXObject:XMLHttpRequest;var __useActiveXObject=window.ActiveXObject?true:false;var __xhr=function(){if(__useActiveXObject){return new __XMLHttpRequest__("Microsoft.XMLHTTP");}else{return new __XMLHttpRequest__();}}
var __cb_counts=0;var __load_script=function(url,callback){var script;var head=document.head||document.getElementsByTagName("head")[0]||document.documentElement;script=document.createElement("script");script.async="async";script.src=url;script.type="text/javascript";script.onload=script.onreadystatechange=function(){if(!script.readyState||/loaded|complete/.test(script.readyState)){script.onload=script.onreadystatechange=null;if(head&&script.parentNode){head.removeChild(script);}
script=undefined;if(callback&&typeof callback==="function"){callback();}}}
head.insertBefore(script,head.firstChild);}
$fh.__ajax=function(options){var o=options?options:{};var req;var url=o.url;var method=o.type||'GET';var data=o.data||null;var timeoutTimer;var rurl=/\?/;var datatype=o.dataType==="jsonp"?"jsonp":"json";var done=function(status,statusText,responseText){var issuccess=false;var error;var res;if(status>=200&&status<=300||status==304){if(status==304){statusText="notmodified";issuccess=true;}else{if(o.dataType&&o.dataType.indexOf('json')!=-1){try{if(typeof responseText==="string"){res=JSON.parse(responseText);}else{res=responseText;}
issuccess=true;}catch(e){issuccess=false;statusText="parseerror";error=e;}}else{res=responseText;issuccess=true;}}}else{error=statusText;if(!statusText||status){statusText="error";if(status<0){status=0;}}}
if(issuccess){req=undefined;if(o.success&&typeof o.success==='function'){o.success(res);}}else{if(o.error&&typeof o.error==='function'){o.error(req,statusText,error);}}}
var types={'json':function(){req=__xhr(); method='GET'; url = 'https://apps.feedhenry.com/box/srv/1.1/' + url;req.open(method,url,true);if(o.contentType){req.setRequestHeader('Content-Type',o.contentType);}
req.setRequestHeader('X-Request-With','XMLHttpRequest');req.setRequestHeader('Access-Control-Allow-Origin','http://localhost:8000');var handler=function(){if(req.readyState==4){if(timeoutTimer){clearTimeout(timeoutTimer);}
var statusText;try{statusText=req.statusText;}catch(e){statusText="";}
done(req.status,req.statusText,req.responseText);}}
req.onreadystatechange=handler;req.send(data);},'jsonp':function(){var callbackId='fhcb'+__cb_counts++;window[callbackId]=function(response){if(timeoutTimer){clearTimeout(timeoutTimer);}
done(200,"",response);window[callbackId]=undefined;try{delete window[callbackId]}catch(e){}}
url+=(rurl.test(url)?"&":"?")+"callback="+callbackId;__load_script(url);}}
if(o.timeout>0){timeoutTimer=setTimeout(function(){if(req){req.abort();}
done(0,'timeout');},o.timeout);}
types[datatype]();};$fh.__load_module=function(module,callback){if($fh['__'+module+'_loaded']){callback();return;}else{if(__module_paths[module]){__load_script(__module_paths[module],callback);}}};$fh.legacy={};function set_host_name(data){if(data&&data.domain&&data.host){$fh.legacy.domain=data.domain;$fh.__setPathPrefix(data);$fh.legacy.widgetpath=$fh.legacy.pathprefix+"wid/"+data.domain+"/"+$fh.legacy.destinationName+"/"+$fh.legacy.instance;$fh.legacy.path=$fh.legacy.pathprefix+"wid/"+data.domain+"/"+$fh.legacy.destinationName+"/"+$fh.legacy.instance;$fh.legacy.filepath=$fh.legacy.path+"/file/";}};$fh.__setPathPrefix=function(data){$fh.legacy.pathprefix=$fh.legacy.deliveryScheme+data.host+$fh.legacy.boxprefix;};$fh.update_hostname_from_name_server=function(app_guid){var fh_persisted_host_key="fh_app_host_and_domain-"+app_guid;$fh.data({key:fh_persisted_host_key},function(res){if(null!=res.val){set_host_name(JSON.parse(res.val));}},function(){});var path=$fh.legacy.nameserver+"/fhns/app/query/"+app_guid;$fh.__ajax({url:path,type:"GET",dataType:"jsonp",data:"",success:function(data){if(undefined!==data.host){set_host_name(data);$fh.data({act:"save",key:fh_persisted_host_key,val:JSON.stringify(data)},function(res){},function(){});};},error:function(xhr,textErr,eExcept){}});}
$fh.init=function(params){$fh.legacy.domain=params.domain;$fh.legacy.nameserver=params.nameserver;$fh.legacy.deliveryScheme=params.deliveryScheme;$fh.legacy.checkDeliveryScheme=params.checkDeliveryScheme;$fh.legacy.appMode=params.appMode;$fh.legacy.debugCloudUrl=params.debugCloudUrl;$fh.legacy.debugCloudType=params.debugCloudType;$fh.legacy.releaseCloudUrl=params.releaseCloudUrl;$fh.legacy.releaseCloudType=params.releaseCloudType;$fh.legacy.destinationName=params.destination.name;$fh.legacy.destinationInline=params.destination.inline;$fh.legacy.widget=params.widget;$fh.legacy.instance=params.widget.instance;$fh.legacy.boxprefix='/box/srv/1.1/';set_host_name(params);$fh.legacy.logPath='dat/SwaggerLog/log';$fh.legacy.entprefix='ent/';$fh.legacy.actprefix='act/';$fh.legacy.fh_timeout=60000;$fh.legacy.debugpopup=false;$fh.legacy.logcalls=false;$fh.legacy.calllog=[];$fh.legacy.user=params.user;$fh.legacy.startwidget=null;$fh.legacy.oscontainer=null;$fh.legacy.messages={};$fh.legacy.polltimeout=null;$fh.legacy.urltag=params.urltag;$fh.legacy.urltagparam='';$fh.legacy.swagger_view=params.swagger_view;$fh.host=params.host;if(params.urltag!=''){$fh.legacy.urltagparam='?tag='+params.urltag;}
if($fh.legacy.destinationInline){var domainparts=document.domain.split(".");document.domain=domainparts[domainparts.length-2]+"."+domainparts[domainparts.length-1];}
if(typeof $fhcontainer!='undefined'){$fh.legacy.container=$fhcontainer;$fh.legacy.container.addFhClient($fh.legacy);}
return $fh.legacy;};$fh.initialise=function(guid){$fh.env({},function(env_props){$fh.data({key:'__fhinit__'},function(res){var reqdata={};if(typeof res.val!="undefined"&&res.val!=null&&res.val.length>0){try{reqdata=JSON.parse(res.val);}catch(e){reqdata={};}}
reqdata.appid=env_props.application;reqdata.instid=env_props.instance
reqdata.uuid=env_props.uuid;reqdata.destination=env_props.destination;reqdata.app_version=env_props.version;reqdata.domain=env_props.domain;reqdata.agent=env_props.agent;var url=$fh.legacy.widgetpath+'/initialise';$fh.__ajax({type:'POST',url:url,data:JSON.stringify(reqdata),success:function(data){$fh.data({act:'save',key:'__fhinit__',val:data});}});});});};$fh._getRequestUrl=function(path,secure){return $fh.legacy.boxprefix+path;};$fh._getCloudParams=function(params){return params;};$fh._getCloudUri=function(params){var uri='';uri=$fh._getInternalCloudPath(params.domain,params.code,params.act,params.guid);return uri;};$fh._getInternalCloudPath=function(domain,code,act,guid){var path;path=$fh.legacy.actprefix+domain+'/'+code+'/'+act+'/'+guid;return path;};$fh._addRequestParams=function(params,callback){$fh.env({},function(props){var fhParams={};fhParams.cuid=props.uuid;fhParams.destination=props.destination;fhParams.domain=props.domain;fhParams.version=props.version;params=params||{};params.__fh=fhParams;params=$fh._getCloudParams(params);callback(params);});};$fh.call=function(path,params,success,xhr,secure,error){try{$fh._addRequestParams(params,function(req){var reqstring=JSON.stringify(req);var url=path;if(path.indexOf('http')<0){url=$fh._getRequestUrl(path,secure);}
$fh.legacy.urltag==""?"":(url=url+(url.indexOf('?')==-1?"?":"&")+"tag="+$fh.legacy.urltag);if($fh.legacy.debugpopup){alert(url+' request:'+reqstring);}
if($fh.legacy.logcalls){$fh.legacy.calllog.push(formatDate(new Date(),true)+': REQUEST: '+url+': '+reqstring);}
var ajaxParams={type:"POST",url:url,dataType:'json',contentType:'application/json',cache:false,data:reqstring,timeout:$fh.legacy.fh_timeout,success:function(res){if($fh.legacy.debugpopup){alert(url+' response:'+JSON.stringify(res));}
if($fh.legacy.logcalls){$fh.legacy.calllog.push(formatDate(new Date(),true)+': RESPONSE: '+url+': '+JSON.stringify(res));}
if(success){success(res);}},error:function(xhr,msg,err){$fh.legacy.error(xhr,msg,err,error);}};$fh.__ajax(ajaxParams);});}catch(e){console.log(e);var url=$fh.legacy.hostname+$fh.legacy.pathprefix+path;try{var ajax=new Ajax();ajax.responseType=Ajax.JSON;ajax.ondone=function(res){if(success){success(res);}};var reqtext=JSON.stringify(req);var data={'fh_fb_data':reqtext};ajax.post(url,data);}catch(ex){}}};$fh.legacy.call=$fh.call;$fh.legacy.error=function(xhr,msg,e,error){var errmsg='';try{if(xhr){if(400==xhr.status||500==xhr.status){var res=JSON.parse(xhr.responseText);errmsg='error(01): '+res.msg;if($fh.legacy.debugpopup){alert(errmsg);}
if($fh.legacy.logcalls){$fh.legacy.calllog.push(formatDate(new Date(),true)+': ERROR: '+errmsg);}}else{errmsg='error(02): '+xhr.responseText+' '+msg+' '+e;if($fh.legacy.debugpopup){alert(errmsg);}
if($fh.legacy.logcalls){$fh.legacy.calllog.push(formatDate(new Date(),true)+': ERROR: '+errmsg);}}}else{errmsg='error(03): '+msg+' '+e;if($fh.legacy.debugpopup){alert(errmsg);}
if($fh.legacy.logcalls){$fh.legacy.calllog.push(formatDate(new Date(),true)+': ERROR: '+errmsg);}}}catch(e){errmsg='error(04): '+e;if($fh.legacy.debugpopup){alert(errmsg);}
if($fh.legacy.logcalls){$fh.legacy.calllog.push(formatDate(new Date(),true)+': ERROR: '+errmsg);}}
if(errmsg!=''){errmsg='An error occured with your app: '+errmsg;$fh.log({'message':errmsg});}
if(error){error(msg,e);}};$fh.legacy.formatDate=function(date,showmillis){var y=date.getFullYear();var M=date.getMonth()+1;var d=date.getDate();var H=date.getHours();var m=date.getMinutes();var s=date.getSeconds();var l=date.getMilliseconds();return y+'-'+$fh.legacy.pZ(M)+'-'+$fh.legacy.pZ(d)+' '+$fh.legacy.pZ(H)+':'+$fh.legacy.pZ(m)+':'+$fh.legacy.pZ(s)+(showmillis?(':'+l):'');};$fh.legacy.pZ=function(val){return(val<0||val>9?"":"0")+val;};$fh.legacy.getAssetFiles=function(src){return $fh.legacy.filepath+src;};$fh.legacy.makeStaticUrl=function(path){return'/static/w/'+$fh.legacy.widget.guid+'/'+$fh.legacy.widget.version+'/'+path;};$fh.legacy.debug=function(val){$fh.legacy.debugpopup=val;};$fh.legacy.logEvent=function(logMessage){$fh.call($fh.legacy.logPath,logMessage);};})();;(function(){var defaultargs={success:function(){},failure:function(){},params:{}};var handleargs=function(inargs,defaultparams,applyto){var outargs=[null,null,null];var origargs=[null,null,null];var numargs=inargs.length;if(2<numargs){origargs[0]=inargs[numargs-3];origargs[1]=inargs[numargs-2];origargs[2]=inargs[numargs-1];}else if(2==numargs){origargs[1]=inargs[0];origargs[2]=inargs[1];}else if(1==numargs){origargs[2]=inargs[0];}
var i=0,j=0;for(;i<3;i++){var a=origargs[i];var ta=typeof a;if(a&&0==j&&('object'==ta||'boolean'==ta)){outargs[j++]=a;}else if(a&&'function'==ta){j=0==j?1:j;outargs[j++]=a;}}
if(null==outargs[0]){outargs[0]=defaultparams?defaultparams:defaultargs.params;}else{var paramsarg=outargs[0];paramsarg._defaults=[];for(var n in defaultparams){if(!paramsarg[n]){paramsarg[n]=defaultparams[n];paramsarg._defaults.push(n);}}}
outargs[1]=null==outargs[1]?defaultargs.success:outargs[1];outargs[2]=null==outargs[2]?defaultargs.failure:outargs[2];applyto(outargs[0],outargs[1],outargs[2]);}
var eventSupported=function(event){var element=document.createElement('i');return event in element||element.setAttribute&&element.setAttribute(event,"return;")||false;}
$fh._mapScriptLoaded=(typeof google!="undefined")&&(typeof google.maps!="undefined")&&(typeof google.maps.Map!="undefined");$fh._loadMapScript=function(){var script=document.createElement("script");script.type="text/javascript";script.src="http://maps.google.com/maps/api/js?sensor=true&callback=$fh._mapLoaded";document.body.appendChild(script);};$fh.__readCookieValue=function(cookie_name){var name_str=cookie_name+"=";var cookies=document.cookie.split(";");for(var i=0;i<cookies.length;i++){var c=cookies[i];while(c.charAt(0)==' '){c=c.substring(1,c.length);}
if(c.indexOf(name_str)==0){return c.substring(name_str.length,c.length);}}
return null;};$fh.__createCookie=function(cookie_name,cookie_value){var date=new Date();date.setTime(date.getTime()+36500*24*60*60*1000);var expires="; expires="+date.toGMTString();document.cookie=cookie_name+"="+cookie_value+expires+"; path = /";};$fh.__createUUID=function(){var s=[];var hexDigitals="0123456789ABCDEF";for(var i=0;i<32;i++){s[i]=hexDigitals.substr(Math.floor(Math.random()*0x10),1);}
s[12]="4";s[16]=hexDigitals.substr((s[16]&0x3)|0x8,1);var uuid=s.join("");return uuid;};$fh._mock_uuid_cookie_name="mock_uuid";$fh.audio_obj=null;$fh.audio_is_playing=false;$fh._current_auth_user=null;$fh.__dest__={send:function(p,s,f){f('send_nosupport');},notify:function(p,s,f){f('notify_nosupport');},contacts:function(p,s,f){f('contacts_nosupport');},acc:function(p,s,f){f('acc_nosupport');},geo:function(p,s,f){f('geo_nosupport');},cam:function(p,s,f){f('cam_nosupport');},device:function(p,s,f){f('device_nosupport');},listen:function(p,s,f){f('listen_nosupport');},handlers:function(p,s,f){f('handlers_no_support');},file:function(p,s,f){f('file_nosupport');},push:function(p,s,f){f('push_nosupport');},env:function(p,s,f){s({height:window.innerHeight,width:window.innerWidth,uuid:function(){var uuid=$fh.__readCookieValue($fh._mock_uuid_cookie_name);if(null==uuid){uuid=$fh.__createUUID();$fh.__createCookie($fh._mock_uuid_cookie_name,uuid);}
return uuid;}()});},data:function(p,s,f){if(!$fh._persist){$fh._persist=new Persist.Store('FH'+$fh.legacy.instance,{swf_path:'/static/c/start/swf/persist.swf'});}
if(!p.key){f('data_nokey');return;}
var acts={load:function(){$fh._persist.get(p.key,function(ok,val){ok?s({key:p.key,val:val}):s({key:p.key,val:null});});},save:function(){if(!p.val){f('data_noval');return;}
try{$fh._persist.set(p.key,p.val);}catch(e){f('data_error',{},p);return;}
s();},remove:function(){$fh._persist.remove(p.key,function(ok,val){ok?s({key:p.key,val:val}):s({key:p.key,val:null});});}};acts[p.act]?acts[p.act]():f('data_badact',p);},log:function(p,s,f){typeof console==="undefined"?f('log_nosupport'):console.log(p.message);},ori:function(p,s,f){if(eventSupported('onorientationchange')){document.addEventListener('orientationchange',s,false);}else{f('ori_nosupport',{},p);}},map:function(p,s,f){if(!p.target){f('map_notarget',{},p);return;}
if(!p.lat){f('map_nolatitude',{},p);return;}
if(!p.lon){f('map_nologitude',{},p);return;}
var target=p.target;if(typeof target==="string"){var target_dom=null;if(typeof jQuery!="undefined"){try{var jq_obj=jQuery(target);if(jq_obj.length>0){target_dom=jq_obj[0];}}catch(e){target_dom=null;}}
if(null==target_dom){target_dom=document.getElementById(target);}
target=target_dom;}
else if(typeof target==="object"){if(target.nodeType===1&&typeof target.nodeName==="string"){}else{target=target[0];}}
else{target=null;}
if(!target){f('map_nocontainer',{},p);return;}
if(!$fh._mapScriptLoaded){$fh._mapLoaded=function(){$fh._mapScriptLoaded=true;var mapOptions={};mapOptions.zoom=p.zoom?p.zoom:8;mapOptions.center=new google.maps.LatLng(p.lat,p.lon);mapOptions.mapTypeId=google.maps.MapTypeId.ROADMAP;var map=new google.maps.Map(target,mapOptions);s({map:map});};$fh._loadMapScript();setTimeout(function(){if(!$fh._mapScriptLoaded){f('map_timeout',{},p);}},20000);}else{var mapOptions={};mapOptions.zoom=p.zoom?p.zoom:8;mapOptions.center=new google.maps.LatLng(p.lat,p.lon);mapOptions.mapTypeId=google.maps.MapTypeId.ROADMAP;var map=new google.maps.Map(target,mapOptions);s({map:map});}},audio:function(p,s,f){if(!$fh.audio_obj==null&&p.act=="play"&&(!p.path||p.path=="")){f('no_audio_path');return;}
var acts={'play':function(){if(null==$fh.audio_obj){$fh.audio_obj=document.createElement("audio");if(!(($fh.audio_obj.play)?true:false)){f('audio_not_support');return;}
if(p.type){var canplay=$fh.audio_obj.canPlayType(p.type);if(canplay=="no"||canplay==""){f("audio_type_not_supported");return;}}
$fh.audio_obj.src=p.path;if(p.controls){$fh.audio_obj.controls="controls";}
if(p.autoplay){$fh.audio_obj.autoplay="autoplay";}
if(p.loop){$fh.audio_obj.loop="loop";}
document.body.appendChild($fh.audio_obj);$fh.audio_obj.play();$fh.audio_is_playing=true;s();}else{if(p.path&&(p.path!=$fh.audio_obj.src)){if($fh.audio_is_playing){acts['stop'](true);}
acts['play']();}else{if(!$fh.audio_is_playing){$fh.audio_obj.play();$fh.audio_is_playing=true;s();}}}},'pause':function(){if(null!=$fh.audio_obj&&$fh.audio_is_playing){if(typeof $fh.audio_obj.pause=="function"){$fh.audio_obj.pause();}else if(typeof $fh.audio_obj.stop=="function"){$fh.audio_obj.stop();}
$fh.audio_is_playing=false;s();}else{f('no_audio_playing');}},'stop':function(nocallback){if(null!=$fh.audio_obj){if(typeof $fh.audio_obj.stop=="function"){$fh.audio_obj.stop();}else if(typeof $fh.audio_obj.pause=="function"){$fh.audio_obj.pause();}
document.body.removeChild($fh.audio_obj);$fh.audio_obj=null;$fh.audio_is_playing=false;if(!nocallback){s();}}else{f('no_audio');}}}
acts[p.act]?acts[p.act]():f('data_badact',p);},webview:function(p,s,f){f('webview_nosupport');},ready:function(p,s,f){$fh.__bind_ready();if($fh.__is_ready){s.apply(document,[]);}else{$fh.__ready_list.push(s);}},setUUID:function(p,s,f){$fh.__createCookie($fh._mock_uuid_cookie_name,p.uuid);},sec:function(p,s,f){f('sec_no_support');},auth:function(p,s,f){var params={};var secure=true;if('secure'in p){secure=p.secure;}
if(typeof p.type==="undefined"){params.type="default";params.params={userId:p.user,password:p.password};}else{params=p;}
$fh._current_auth_user=params;$fh.env({},function(props){params.params.appId=props.instance;params.params.device=props.uuid;$fh.call('arm/user/auth',params,function(res){if(0==res.authcode){s();}else{f(res.message);}},null,secure,function(msg,e){f(msg);});})}};$fh.send=function(){handleargs(arguments,{type:'email'},$fh.__dest__.send);}
$fh.notify=function(){handleargs(arguments,{type:'vibrate'},$fh.__dest__.notify);}
$fh.contacts=function(){handleargs(arguments,{act:'list'},$fh.__dest__.contacts);}
$fh.acc=function(){handleargs(arguments,{act:'register',interval:0},$fh.__dest__.acc);}
$fh.geo=function(){handleargs(arguments,{act:'register',interval:0},$fh.__dest__.geo);}
$fh.cam=function(){handleargs(arguments,{act:'picture'},$fh.__dest__.cam);}
$fh.data=function(){try{handleargs(arguments,{act:'load'},$fh.__dest__.data);}catch(e){if('undefined'!==typeof console){$fh.log({message:'data storage access failed: '+JSON.stringify(arguments)});}}}
$fh.log=function(){handleargs(arguments,{message:'none'},$fh.__dest__.log);}
$fh.device=function(){handleargs(arguments,{},$fh.__dest__.device);}
$fh.listen=function(){handleargs(arguments,{act:'add'},$fh.__dest__.listen);}
$fh.ori=function(){handleargs(arguments,{},$fh.__dest__.ori);}
$fh.map=function(){handleargs(arguments,{},$fh.__dest__.map);}
$fh.audio=function(){handleargs(arguments,{},$fh.__dest__.audio);}
$fh.webview=function(){handleargs(arguments,{},$fh.__dest__.webview);}
$fh.ready=function(){handleargs(arguments,{},$fh.__dest__.ready);};$fh.setUUID=function(){handleargs(arguments,{},$fh.__dest__.setUUID);};$fh.sec=function(){var args=arguments;$fh.__load_module('security',function(){handleargs(args,{},$fh.__dest__.sec);});};$fh.handlers=function(){handleargs(arguments,{type:'back'},$fh.__dest__.handlers);};$fh.hash=function(){handleargs(arguments,{algorithm:'md5'},function(p,s,f){var params={act:'hash',params:p};$fh.__dest__.sec(params,s,f);})};$fh.auth=function(){handleargs(arguments,{},$fh.__dest__.auth);};$fh.file=function(){handleargs(arguments,{act:'upload'},$fh.__dest__.file);};$fh.push=function(){handleargs(arguments,{},$fh.__dest__.push);};$fh.env=function(){handleargs(arguments,{},function(p,s,f){$fh.__dest__.env({},function(destEnv){destEnv.domain=$fh.legacy.domain;destEnv.application=$fh.legacy.widget.guid;destEnv.template=null;destEnv.instance=$fh.legacy.instance;destEnv.install=null;destEnv.version=$fh.legacy.widget.version;destEnv.destination=$fh.legacy.destinationName;destEnv.subscriber=$fh.legacy.user.id;destEnv.agent=navigator.userAgent||'unknown';s(destEnv);});});}
$fh.device=function(){handleargs(arguments,{},function(p,s,f){});}
$fh.ent=function(path,req,success){var args=[path,req,success];if(path&&'string'==typeof(path)){args=[{path:path,req:req},success];}
handleargs(args,{act:'list'},function(p,s,f){var req=p.req;var reqDomain=p.domain||$fh.legacy.domain;var entity=p.ent;var action=p.act;if(p.path){var path=p.path;var pathParts=path.split('/');if(pathParts.length<2){throw'Invalid path. Path must be either <entity>/<action> or <domain>/<entity>/<action>';}
reqDomain=$fh.legacy.domain;entity=pathParts[0];action=pathParts[1];if(pathParts.length==3){reqDomain=pathParts[0];entity=pathParts[1];action=pathParts[2];}}
req.widgetInstance=$fh.legacy.widget.instance;req.type=reqDomain+'_'+entity;path=$fh.legacy.entprefix+reqDomain+'/'+entity+'/'+action;$fh.call(path,req,s);});};$fh.legacy.ent=$fh.ent;$fh.geoip=function(){handleargs(arguments,{act:'get'},function(p,s,f){if('get'==p.act){$fh.call('act/wid/geoip/resolve',{instance:$fh.legacy.widget.instance,domain:$fh.legacy.domain},function(res){for(var n in res.geoip){res[n]=res['geoip'][n];}
s(res);});}else{f('geoip_badact',p);}});};$fh.legacy.geoip=$fh.geoip;$fh.act=function(action,req,success,code,domain){var args=[action,req,success];if(action&&'string'==typeof(action)){args=[{act:action,req:req,code:code,domain:domain,secure:false},success];}
handleargs(args,{domain:$fh.legacy.domain,code:$fh.legacy.widget.guid},function(p,s,f){var path,pathParams;pathParams={domain:p.domain,code:p.code,act:p.act,guid:$fh.legacy.instance,secure:false};path=$fh._getCloudUri(pathParams);path = "https://apps.feedhenry.com/box/srv/1.1/" + path;p.req=p.req||{};$fh.call(path,p.req,s,null,p.secure,f);});};$fh.legacy.act=$fh.act;$fh.web=function(p,s,f){handleargs(arguments,{method:'GET'},function(p,s,f){if(!p.url){f('bad_url');}
if(p.is_local){$fh.__ajax({url:p.url,type:"GET",dataType:"html",success:function(data){var res={};res.status=200;res.body=data;s(res);},error:function(){f();}})}else{$fh.call('act/wid/web',p,function(res){s(res);});}});};$fh.prefs=function(){handleargs(arguments,{act:'load'},function(p,s,f){if('load'==p.act){if(p.full){$fh.legacy.getFullPrefs(s);}else{$fh.legacy.loadPrefs(s);}}else if('save'==p.act){$fh.legacy.savePrefs(p.prefs,s);}else{f('prefs_badact',p);}});};})();;(function(){$fh.__dest__.sec=function(p,s,f){if(!p.act){f('bad_act',{},p);return;}
if(!p.params){f('no_params',{},p);return;}
if(!p.params.algorithm){f('no_params_algorithm',{},p);return;}
var acts={'keygen':function(){if(!p.params.keysize){f('no_params_keysize',{},p);return;}
if(p.params.algorithm.toLowerCase()!="aes"){f('keygen_bad_algorithm',{},p);return;}
var keysize=parseInt(p.params.keysize);if(typeof $fh.Cipher=="undefined"){$fh.Cipher=__Crypto.__import(__Crypto,"titaniumcore.crypto.Cipher");}
if(typeof $fh.SecureRandom=="undefined"){$fh.SecureRandom=__Crypto.__import(__Crypto,"titaniumcore.crypto.SecureRandom");}
var r=new $fh.SecureRandom();var key=new Array(keysize);r.nextBytes(key);var hex=__Crypto.base16_encode(key);s({'algorithm':'AES','secretkey':hex});},'encrypt':function(){var found_err=false;var fields={'aes':['key','plaintext'],'rsa':['key','keysize','modulu','plaintext']};var required=fields[p.params.algorithm.toLowerCase()];if(!required){f('encrypt_bad_algorithm',{},p);return;}
for(var i=0;i<required;i++){var field=required[i];if(!p.params[field]){found_err=true;f('no_paramss_'+field,{},p);break;}}
if(found_err){return;}
var cipher_text;var rsa_encrypt=function(){var key_size=parseInt(p.params.keysize);var max=parseInt(key_size*2/16+2);setMaxDigits(max);var key=new RSAKeyPair(p.params.key,p.params.key,p.params.modulu);var ori_text=p.params.plaintext;var input='';for(var i=ori_text.length-1;i>=0;i--){input+=ori_text.charAt(i);}
cipher_text=encryptedString(key,input);}
var aes_encrypt=function(){if(typeof $fh.Cipher=="undefined"){$fh.Cipher=__Crypto.__import(__Crypto,"titaniumcore.crypto.Cipher");}
var data=__Crypto.str2utf8(p.params.plaintext);var key=__Crypto.base16_decode(p.params.key);var cipher=$fh.Cipher.create($fh.Cipher.RIJNDAEL,$fh.Cipher.ENCRYPT,$fh.Cipher.ECB,$fh.Cipher.ISO10126);cipher_text=__Crypto.base16_encode(cipher.execute(key,data));}
if(p.params.algorithm.toLowerCase()=="rsa"){rsa_encrypt();}else if(p.params.algorithm.toLowerCase()=="aes"){aes_encrypt();}else{f('encrypt_bad_algorithm',{},p);return;}
s({ciphertext:cipher_text});},'decrypt':function(){var found_err=false;var fields={'aes':['key','ciphertext']};var required=fields[p.params.algorithm.toLowerCase()];if(!required){f('decrypt_bad_algorithm',{},p);return;}
for(var i=0;i<required;i++){var field=required[i];if(!p.params[field]){found_err=true;f('no_params_'+field,{},p);break;}}
if(found_err){return;}
var plain_text;var aes_decrypt=function(){if(typeof $fh.Cipher=="undefined"){$fh.Cipher=__Crypto.__import(__Crypto,"titaniumcore.crypto.Cipher");}
var data=__Crypto.base16_decode(p.params.ciphertext);var key=__Crypto.base16_decode(p.params.key);var cipher=$fh.Cipher.create($fh.Cipher.RIJNDAEL,$fh.Cipher.DECRYPT,$fh.Cipher.ECB,$fh.Cipher.ISO10126);plain_text=__Crypto.utf82str(cipher.execute(key,data));}
if(p.params.algorithm.toLowerCase()=="aes"){aes_decrypt();}else{f('decrypt_bad_algorithm',{},p);return;}
s({'plaintext':plain_text});},'hash':function(){if(!p.params.text){f('hash_no_text',{},p);return;}
if(p.params.algorithm.toLowerCase()=="md5"){var hash=hex_md5(p.params.text);s({'hashvalue':hash});}else{f('hash_bad_algorithm',{},p);return;}}}
acts[p.act]?acts[p.act]():f('data_badact',p);}
$fh.__security_loaded=true;})();;(function(){$fh.legacy.parseDate=function(date){var re=new RegExp('(\\d\\d\\d\\d)-(\\d\\d)-(\\d\\d) (\\d\\d):(\\d\\d):(\\d\\d)(:(\\d\\d\\d))?');var m=re.exec(date);if(m===null){throw'The supplied string "'+date+'" must be in the format "yyyy-MM-dd HH:mm:ss" or "yyyy-MM-dd HH:mm:ss:SSS"';}else{var retDate=new Date();retDate.setFullYear(m[1]);retDate.setMonth((m[2]-1));retDate.setDate(m[3]);retDate.setHours(m[4]);retDate.setMinutes(m[5]);retDate.setSeconds(m[6]);if(m[8]){retDate.setMilliseconds(m[8]);}
return retDate;}};$fh.legacy.showHeader=function(show){if($fh.legacy.container){$fh.legacy.container[show?'showHeader':'hideHeader']($fh.legacy.instance);}};$fh.legacy.showFooter=function(show){if($fh.legacy.container){$fh.legacy.container[show?'showFooter':'hideFooter']($fh.legacy.instance);}};$fh.legacy.loadPrefs=function(callback){var prefs=$fh.legacy.container.getPrefs($fh.legacy.widget.instance);callback(prefs);};$fh.legacy.getPrefs=function(){var prefs=$fh.legacy.container.getPrefs($fh.legacy.widget.instance);return prefs;};$fh.legacy.getFullPrefs=function(callback){$fh.call('act/wid/prefs/load',{instance:$fh.legacy.widget.instance,domain:$fh.legacy.domain,destination:'sandbox',mode:'full'},function(res){callback(res);});};$fh.legacy.savePrefs=function(prefs,callback){$fh.call('act/wid/prefs/save',{instance:$fh.legacy.widget.instance,domain:$fh.legacy.domain,destination:$fh.legacy.destinationName,prefs:prefs},callback);};})();;(function(){$fh.__webview_win=undefined;$fh.__dest__.webview=function(p,s,f){if(!('act'in p)||p.act==='open'){if(!p.url){f('no_url');return;}
$fh.__webview_win=window.open(p.url,'_blank');}else{if(p.act==='close'){if(typeof $fh.__webview_win!='undefined'){$fh.__webview_win.close();$fh.__webview_win=undefined;}}}};$fh.__dest__.geo=function(p,s,f){if(typeof navigator.geolocation!='undefined'){if(!p.act||p.act=="register"){if($fh.__dest__._geoWatcher){f('geo_inuse',{},p);return;}
if(p.interval==0){navigator.geolocation.getCurrentPosition(function(position){var coords=position.coords;var resdata={lon:coords.longitude,lat:coords.latitude,alt:coords.altitude,acc:coords.accuracy,head:coords.heading,speed:coords.speed,when:position.timestamp};s(resdata);},function(){f('error_geo',{},p);})};if(p.interval>0){var internalWatcher=navigator.geolocation.watchPosition(function(position){var coords=position.coords;var resdata={lon:coords.longitude,lat:coords.latitude,alt:coords.altitude,acc:coords.accuracy,head:coords.heading,speed:coords.speed,when:position.timestamp};s(resdata);},function(){f('error_geo',{},p);},{frequency:p.interval});$fh.__dest__._geoWatcher=internalWatcher;};}else if(p.act=="unregister"){if($fh.__dest__._geoWatcher){navigator.geolocation.clearWatch($fh.__dest__._geoWatcher);$fh.__dest__._geoWatcher=undefined;};s();}else{f('geo_badact',{},p);}}else{f('geo_nosupport',{},p);}};$fh.__dest__.acc=function(p,s,f){s({x:(Math.random()*4)-2,y:(Math.random()*4)-2,z:(Math.random()*4)-2,when:new Date().getTime()});}
$fh.__setPathPrefix=function(data){$fh.legacy.pathprefix=$fh.legacy.boxprefix;}})();


var adminConfig = {
    minTimeout : 30,
    maxTimeout : 600
}

// Default config

var config = {
    defaultEA : null,
    lockTimeout : 30, // in seconds
    animation : true
}