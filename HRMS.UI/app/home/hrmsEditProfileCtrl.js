hrBaseApp.controller('hrmsEditProfileCtrl', ['$scope', '$rootScope', 'profileFctry', function ($scope, $rootScope, profileFctry) {
    'use strict';

    $scope.init = function () {
        $scope.formData = {};
        // $scope.formData.userEmail = $rootScope.userDetails.UserEmail;
        $scope.getRelations();
    }

    $scope.submit = function () {
        alert(JSON.stringify($scope.formData));
    }

    $scope.getRelations = function () {
        profileFctry.getAllRelations().then(function (response) {
            $scope.relations = response.data;
            alert(JSON.stringify($scope.relations));

        });
        //  $scope.relations = profileFctry.getAllRelations();
    }

    $scope.init();

}]);