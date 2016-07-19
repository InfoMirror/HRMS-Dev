
'use strict';
hrBaseApp.controller('hrmsAppraisalCtrl', ['$scope', '$modal', function ($scope, $modal) {
    $scope.Submit = function (size) {
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
