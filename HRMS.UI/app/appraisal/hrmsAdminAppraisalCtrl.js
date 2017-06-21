
hrBaseApp.controller('hrmsAdminAppraisalCtrl', ['$scope', '$state', '$rootScope', '$modal', '$modalInstance', 'appraisalFctry',
    function ($scope, $state, $rootScope, $modal, $modalInstance, appraisalFctry) {
        'use strict';
        var AllratingsAndcomments = new Array();



        $scope.init = function () {
            $scope.username = $rootScope.teamMember;
            $scope.userId =$rootScope.teamMemberId;

        };
        //Update the status of the applicant review after being submitted by Super Admin
        $scope.ok = function () {
            appraisalFctry.api.updateAppraisalStatus({
                userId: $scope.userId
            },
                function (response) {
                    if (response.data.length > 0) {
                       
                    }
                    else {
                        $scope.showErrorMsg = true;
                    }
                });
            $modalInstance.close();
        }
        //get isTrainee flag value by passing $rootScope.teamMember  Id 
        $scope.getAllQuestion = function () {
            appraisalFctry.api.getAppraisalQues({
                Trainee: 'False',
                IsActive:'True',
                Archieved:'True'
            },
                function (response) {

                    var quesArray = new Array();
                    if (response.data.length > 0) {
                        for (var i = 0; i < response.data.length; i++) {
                            var obj = {};
                            quesArray.push(response.data[i].Q_Description.value);
                            obj.question = response.data[i].Q_Description.value;
                            AllratingsAndcomments.push(obj);
                        }
                        $scope.questions = quesArray;
                    }
                    else {
                        $scope.showErrorMsg = true;
                    }
                });
        };
        $scope.getAllCommentsAndRatings = function () {
            appraisalFctry.api.getAllCommentsAndRatings({
                userId: $rootScope.teamMemberId,
                apprYear: $rootScope.appr_year
            },

                function (response) {
                    var employeeRating = new Array();
                    var tlRating = new Array();
                    var hrRating = new Array();
                    var hrComments = new Array();
                    var employeeComments = new Array();
                    var tlComments = new Array();
                    var comment;
                    if (response.data.length > 0) {
                        for (var i = 0; i < response.data.length; i++) {
                            var obj = {};
                            if (response.data[i].Comment.value == 'undefined') {
                                comment = 'NA';
                            }
                            else {
                                comment = response.data[i].Comment.value;
                            }
                            if (response.data[i].Role.value == 'Self') {

                                employeeRating.push(response.data[i].Rating.value);
                                employeeComments.push(comment);
                                AllratingsAndcomments[i].emp_rating = response.data[i].Rating.value;
                                AllratingsAndcomments[i].emp_comment = comment;
                            }
                            else if (response.data[i].Role.value == 'Reporting Manager') {
                                tlRating.push(response.data[i].Rating.value);
                                tlComments.push(comment);
                                if (i == AllratingsAndcomments.length) {
                                    var j = 0;
                                }
                                AllratingsAndcomments[j].tl_rating = response.data[i].Rating.value;
                                AllratingsAndcomments[j].tl_comment = comment;
                                j++;
                            }
                            else {
                                hrRating.push(response.data[i].Rating.value);
                                hrComments.push(comment);
                                if (i == AllratingsAndcomments.length) {
                                    var k = 0;
                                }
                                AllratingsAndcomments[k].hr_rating = response.data[i].Rating.value;
                                AllratingsAndcomments[k].hr_comment = comment;
                                k++;
                            }
                        }
                    }

                    else {
                        $scope.showErrorMsg = true;
                    }
                });
        };
        $scope.init();
        $scope.getAllQuestion();
        $scope.getAllCommentsAndRatings();
        $scope.gridOptions = {
            enableColumnMenus: false,
            columnDefs: [
                {
                    field: 'question',
                    displayName: 'Questions'
                },
                {
                    field: 'emp_rating',
                    displayName: 'Employee Rating',
                },
                {
                    field: 'emp_comment',
                    displayName: 'Employee Comments'
                },
                {
                    field: 'tl_rating',
                    displayName: 'Manager Rating',
                },
                {
                    field: 'tl_comment',
                    displayName: 'Manager Comments'
                },
                {
                    field: 'hr_rating',
                    displayName: 'HR Rating',
                },
                {
                    field: 'hr_comment',
                    displayName: 'HR Comments'
                }
            ],
            data: AllratingsAndcomments
        }
    }]);





