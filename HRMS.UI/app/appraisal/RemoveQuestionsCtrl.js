'use strict';
hrBaseApp.controller('RemoveQuestionsCtrl', ['$scope', '$state', '$rootScope', '$modal', '$modalInstance', 'appraisalFctry', '$filter',
    function ($scope, $state, $rootScope, $modal, $modalInstance, appraisalFctry, $filter) {
        $scope.data = {
            singleSelect: [],
        };
        var removeQuesList = new Array();
        var quesArray = []
        var quesIdList = new Array();
        var checkedQuestion = '';
        var checkedIds = '';


        appraisalFctry.api.getAppraisalQues({
            Trainee: 'false',
            IsActive:'True',
            Archieved:'False'
        },
            function (response) {


                angular.forEach(response.data, function (f, i) {
                    var removeQuestionObj = {};
                    removeQuestionObj.Q_Description = response.data[i].Q_Description.value;
                    removeQuestionObj.Q_Id = response.data[i].Q_Id.value;
                    removeQuestionObj.ISQuestionChecked = false;
                    quesArray.push(removeQuestionObj);
                }
                );

                $scope.questions = quesArray;




                // if (response.data.length > 0) {
                //     for (var i = 0; i < response.data.length; i++) {
                //         quesArray.push(response.data[i].Q_Description.value);
                //         quesIdList += response.data[i].Q_Id.value + ',';
                //     }
                //     // quesId = quesIdList.substring(0, quesIdList.lastIndexOf(","));
                //     $scope.questions = quesArray;
                //     //alert(rating);
                // }
                // else {
                //     $scope.showErrorMsg = true;
                // }
            });
        $scope.remove = function () {

            var checkedQuestion = $filter('filter')($scope.questions, { ISQuestionChecked: true });
            angular.forEach(checkedQuestion, function (f, i) {
                if (checkedQuestion[i].Q_Id != undefined) {
                    checkedIds += checkedQuestion[i].Q_Id + ',';
                }

            });
            checkedIds = checkedIds.substring(0, checkedIds.lastIndexOf(","));

            appraisalFctry.api.updateQuesList({
                quesList: checkedIds
            },
                function (response) {

                    if (response.data.length > 0) {

                    }
                    else {
                        $scope.showErrorMsg = true;
                    }
                     $modalInstance.close();
                });
        };


    }]);