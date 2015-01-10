#yqh 测试

## ionic指令
### $ionicModal  全屏弹出层
	$ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });