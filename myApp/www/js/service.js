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

.factory('nCache', function($cacheFactory) {
	return $cacheFactory('nCache');
})

.service('datas', ['$log', '$http', 'nCache', '$rootScope',  function($log, $http, nCache, $rootScope) {
	var _string= 'datas';
	  /*var _cache = $cacheFactory('cache');
	      _cache.put('a','This is the content of the template');
	  var get= function(){nCache
	  	console.log(_cache.get('a'));
	  }*/
	  var dd= undefined;
	  var get= function(){
	  	var cache = nCache.get('myData');
	  	if (cache) {
	  		dd= cache;
	  	}
	  	else {
	  		$http({
	  			method: 'post',
	  			url: '/get/mbanner',
	  			cache: true
	  		})
	  		.success(function(data) {
	  			nCache.put('myData', data);
	  			dd= data;
	  		}
	  		);
	  	}
	  	console.log($rootScope)
	  }
	  
	  /*var getDatas= function(){

	  	var p = $http({
	  		method: 'post',
	  		url: '/get/mbanner',
	  		cache: _cache
	  	});
	  	p.success(function(data, status, headers, config){
	  		console.log(data);
	  	});
		      //console.log('ssd',_cache.get('/get/mbanner'));

		  }
		  var data={
		  	get: function ($scope, $http, myCache) {
		  		var cache = myCache.get('myData');
		  		if (cache) {
		  			$scope.variable = cache;
		  		}
		  		      else {
		  			$http.get('http://www.example.com/path/to/api/endpoint')
		  			.success(function(data) {
		  				$scope.variable = data;

		  				myCache.put('myData', data);
		  			}
		  			);
		  		}
		  	}
		  }*/

		  return {
		  	_string: _string,
		  	get: get,
		  	dd: dd
		  };
		}])
