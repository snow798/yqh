angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $rootScope, $ionicModal, $timeout, cache, ajax) {
  // Form data for the login modal
  $rootScope.ajax= function(){
    var key= null;
    if(arguments.length>0 && typeof arguments[0] == 'string'){
      key= arguments[0];
    }else if( typeof arguments[0] == 'object' && typeof arguments[0]['key'] == 'string'){
      key= arguments[0]['key'];
    }
    
  };


  $scope.df= null;
  $scope.$on("mbanner",
             function (event, msg) {
                    // $scope.$broadcast("loanLtemid_down", msg);
                    $scope.df= msg;
                    console.log('5544',event, msg)
        });


  $scope.loginData = {};
  $scope.$watch('df', function(newValue, oldValue) {
    console.log('66666666',newValue, oldValue)
  },true);

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
    ajax.get('mbanner');
    console.log('453',$rootScope);
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
});
