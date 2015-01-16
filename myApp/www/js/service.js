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
		return $cacheFactory('nCache',{storageMode: 'localStorage'});
	})

.service('ajax', ['$log', '$http', 'nCache', '$rootScope',  function($log, $http, nCache, $rootScope) {
	var _string= 'service>ajax';
	var param={
         "mbanner": { "path": "/get/mbanner", "method": "post", "pasttime": 100000, "callback": {}}
	};
	var get= function(){
		var reqParam;
		if(arguments.length= 1 && typeof arguments[0] == 'string'){
		reqParam= param[arguments[0]] || null;
		reqParam.key= arguments[0];
		}
        if(!reqParam){
          $log.log(_string+ ' not found "'+ arguments[0]+ '" config！')
          return null;
        }
        console.log(reqParam);
		var data = nCache.get(reqParam.key);
		if (data && data._time_+ reqParam.pasttime > new Date().getTime()) {
			$rootScope.$broadcast(reqParam.key, data);
			return data;
		}
		else {
			$http({
				method: reqParam.method,
				url: reqParam.path
			})
			.success(function(data, status, header, config) {
				if(typeof reqParam.callback == 'function'){
				   reqParam.callback();
				}
				data._time_= new Date().getTime();
				nCache.put(reqParam.key, data);
				$rootScope.$broadcast(reqParam.key, data);
			})
			.error(function(data, status, headers, config){
                $log.erro(_string+ ' erro! --'+ status+ config);
            });
		}
		return null;
	}


	return {
		_string: _string,
		get: get
	};
	}])

.service('user', function(nCache) {
		var _string= 'service>user';
		var _pasttime= 22333321;
		var user={};
		var put= function(){
			user._data=arguments[0];
			user._time= new Date().getTime();
			nCache.put('_user_', user);
		};
		var status= function(){
			var data= nCache.get('_user_');
			if( typeof data == 'object' && data._time+ _pasttime< new Date().getTime() ){
			   return true
			}else{
				return false
			};
		};
		var get= function(){
			if(status()){
				return nCache.get('_user_')._data;
			}else{
				return false
			}
		};

		var cancel= function(){
			nCache.remove('_user_');
		};

		var refresh= function(s){
			
			console.log(s, items)
			//s._string= '555555555';
		}

		return {
			//get: get
			refresh: refresh
		}

	})
