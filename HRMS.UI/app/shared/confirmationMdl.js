var confirmationMdl = [
  '$scope', '$modalInstance', 'message', 'title', '$sce', 'hideCancel', 'isWarning',
  function ($scope, $modalInstance, message, title, $sce, hideCancel, isWarning) {

    //#region === Initialize ===

    'use strict';
    $scope.message = message;
    $scope.title = title;
    $scope.hideCancel = hideCancel;
    $scope.isWarning = isWarning;
      //#endregion

    $scope.messageHtml = function () {
        return $sce.trustAsHtml($scope.message);
    };

    //#region === Public Methods ===

    $scope.close = function (reason) {
      $modalInstance.dismiss(reason);
    };

    $scope.ok = function () {
     
          $modalInstance.close(true);
       
    };

    //#endregion

  }];