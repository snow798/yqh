angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $log, $rootScope, $ionicModal, $timeout, cache, ajax) {
    $scope._string= 'AppCtrl';
  //取消侦听
  $rootScope.$off = function (name, listener) {
            var namedListeners = this.$$listeners[name];
            if (namedListeners) {
                // Loop through the array of named listeners and remove them from the array.
                for (var i = 0; i < namedListeners.length; i++) {
                    if (namedListeners[i] === listener) {
                        return namedListeners.splice(i, 1);
                    }
                }
            }
  }
  // 数据同步
  $rootScope.ajax= function(){
    var _string= 'rootScope>ajax'
    var key= null,         //资源key       
        callback= null,    //索取变量字符
        isMonitor= false   //是否加入到侦听队列
    //console.log(arguments[1], arguments.callee, this);
    if(arguments.length>0 && typeof arguments[0] == 'string' && typeof arguments[1] == 'string'){
      key= arguments[0];
      callback= arguments[1];
      isMonitor= arguments[2] || false;
    }else if( typeof arguments[0] == 'object' && typeof arguments[0]['key'] == 'string'){
      key= arguments[0]['key'];
    }else{
       $log.log(this._string+'>'+_string+ ': this pramem no found!');
    }
    if(key){
      var self= this;
      self.$on(key,function(event, msg){
        self[callback]= msg;
        if(!isMonitor){
        self.$off(key, arguments.callee);
        }
        console.log('msg',msg,self.$$listeners[key]);
      });
      ajax.get(key);
    }
  };




  $scope.df= null;



  $scope.loginData = {};

  /*$scope.$watch('df', function(newValue, oldValue) {
    console.log('66666666-df: ',newValue, oldValue)
  },true);*/

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  
    $rootScope.tt= '554456464------------';

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
    //ajax.get('mbanner');
   $scope.ajax('mbanner', 'df');
   // console.log('453',$rootScope);
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
  { title: 'Reggae', id: 1 },
  { title: 'Chill', id: 2 },
  { title: 'Dubstep', id: 3 },
  { title: 'Indie', id: 4 },
  { title: 'Rap', id: 5 },
  { title: 'Cowbell', id: 6 }
  ];
  console.log('4455',$scope.tt);
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
    $scope._string= 'PlaylistCtrl';
    $scope.dd= '4434534543';
    $scope.ajax('mbanner',  'dd');

});
