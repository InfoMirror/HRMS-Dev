
'use strict';
hrBaseApp.controller('ModalCtrl', ['$scope', '$modal', '$modalInstance', function ($scope, $modal, $modalInstance) {
    // $scope.names = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    $scope.questions = [
        { id: '0', name: 'Ques: ffdgsdgsdg' },
        { id: '1', name: 'Ques: hghgihggrtgr' },
        { id: '2', name: 'Ques: djfbfghfgdfbjhbdfbvjhdfbvhf' }
    ]
    $scope.ratings = [
        { id: '1', number: '1' },
        { id: '2', number: '2' },
        { id: '3', number: '3' },
        { id: '4', number: '4' },
        { id: '5', number: '5' },
        { id: '6', number: '6' },
        { id: '7', number: '7' },
        { id: '8', number: '8' },
        { id: '9', number: '9' },
        { id: '10', number: '10'}
    ]

    $scope.data = {
        singleSelect: []
    };
    $scope.ok = function () {

        var rating = new Array();
        var i;
        for (i = 0; i < $scope.data.singleSelect.length; i++) {
            rating.push($scope.data.singleSelect[i]);
            //alert($scope.data.singleSelect[i])
        }
          $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');

    };
}]);

