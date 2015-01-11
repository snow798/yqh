angular.module('starter.service', [])
	.factory('cache', ['$log',function($log) {
	  var _string= 'cache';
	  var _cache=[];
	  var set= function(key, data, time){
	  	var nkey=key || null, ndata=data || null, ntime=time || new Date().getTime();
	  	console.log(nkey, ndata, ntime)
	  	  if(typeof(nkey) == 'string'){
	  	  		console.log('ok');
	  	  		_cache.push([nkey, ndata, ntime]);
	  	  }else{
	  	  		$log.error(_string+' error');
	  	  		
	  	  }
	  };
	  var get= function(key){
	  	  var nkey= key || null;
	  	  console.log(nkey);
	  	  if(nkey == null){
	  	  		$log.log(_string+' no key!');
	  	  }else{
	  	  	var value= null;
	  	  	angular.forEach(_cache, function(v, i, o){
	  	  		if(v[0]== nkey){
	  	  			value= v[1]
	  	  		}
	  	  	}) 
			return value;
	  	  };
	  };
	  var all= function(){
	  		$log.info(_cache);
	  		return _cache;
	  };

	  
	  return {
	    _string: _string,
	    set: set,
	    get: get,
	    all: all
	  };
	}])
	.factory('datas', ['$log','$cacheFactory', '$http',function($log, $cacheFactory, $http) {
	  var _string= 'datas';
	  var _cache = $cacheFactory('cache');
	      _cache.put('a','This is the content of the template');
	  var get= function(){
	  	console.log(_cache.get('a'));
	  }
	  
	  return {
	    _string: _string,
	    get: get
	  };
	}])
	