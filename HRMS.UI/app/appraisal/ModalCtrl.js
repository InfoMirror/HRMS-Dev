
'use strict';
hrBaseApp.controller('ModalCtrl', ['$scope', '$modal','$modalInstance', function ($scope, $modal, $modalInstance) {
    $scope.names = ["1", "2", "3", "4", "5", "6", "7","8","9","10"];
    $scope.questions=["ffdgsdgsdg","fdvghfvghds","fsfsfsfsdfsdgf","fsfffvgdfvdf"];
    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);

