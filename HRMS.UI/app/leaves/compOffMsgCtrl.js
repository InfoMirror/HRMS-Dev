hrBaseApp.controller('compOffMsgCtrl', ['$scope', '$modalInstance',
    function ($scope, $modalInstance) {
        'use strict';   
        $scope.close = function () {
            $modalInstance.close();
        }   
    }
]);