
'use strict';
hrBaseApp.controller('hrmsAppraisalCtrl', ['$scope', '$modal', function ($scope, $modal) {
    $scope.click = function (size) {
        console.log("Review Pending");
          
        $scope.opts = {
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            templateUrl: '/app/appraisal/Modal.html',
            controller: ModalInstanceCtrl,
            size:size,
            resolve: {} // empty storage
        };

        $scope.opts.resolve.item = function () {
            return angular.copy({ name: "Damini" }); // pass name to Dialog
        }

        var modalInstance = $modal.open($scope.opts);

        modalInstance.result.then(function () {
            //on ok button press 
        }, function () {
            //on cancel button press
            console.log("Modal Closed");
        });
    };
}]);
var ModalInstanceCtrl = function ($scope, $modalInstance, $modal, item) {

    $scope.item = item;
    $scope.names = ["1", "2", "3", "4", "5", "6", "7","8","9","10"];
    $scope.questions=["ffdgsdgsdg","fdvghfvghds","fsfsfsfsdfsdgf","fsfffvgdfvdf"];
    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}
