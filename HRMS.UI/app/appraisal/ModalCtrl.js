
'use strict';
hrBaseApp.controller('ModalCtrl', ['$scope', '$rootScope', '$modal', '$modalInstance', 'appraisalFctry', function ($scope, $rootScope, $modal, $modalInstance, appraisalFctry) {
    // $scope.names = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

    appraisalFctry.api.getAppraisalQues({
        isTrainee: 'False'
    },
        function (response) {
            var rating = new Array();
            if (response.data.length > 0) {
                for (var i = 0; i < response.data.length; i++) {
                    rating.push(response.data[i].Q_Description.value);

                }
                $scope.questions = rating;
                //alert(rating);
            }
            else {
                $scope.showErrorMsg = true;
            }
        });
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
        { id: '10', number: '10' }
    ]

    $scope.data = {
        singleSelect: []
    };




    function submitAppraisal() {
        appraisalFctry.api.submitAppraisal({
            userId: $rootScope.userDetails.UserEmail.value,
            apprMonth: "March",
            apprYear: "2016",
            isAppraisal: 0,
            status: "Pending"
        },
            function (response) {
                if (response.data.length > 0) {
                    alert(response.data);
                }
                else {
                    $scope.showErrorMsg = true;
                }

            });
    };

    $scope.ok = function () {

        var rating = new Array();
        var i;
        for (i = 0; i < $scope.data.singleSelect.length; i++) {
            rating.push($scope.data.singleSelect[i]);

        }
        submitAppraisal();
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');

    };

}]);

