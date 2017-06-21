
'use strict';
hrBaseApp.controller('ModalCtrl', ['$scope', '$state', '$rootScope', '$modal', '$modalInstance', 'appraisalFctry',
    function ($scope, $state, $rootScope, $modal, $modalInstance, appraisalFctry) {
        // $scope.names = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
        var quesId, rating, comment, role, isTrainee;
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-full-width",
            "preventDuplicates": true,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "800",
            "timeOut": "3000",
            "extendedTimeOut": "800",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
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
            singleSelect: [],
            textAreaValue: []
        };

        $scope.init = function () {
            var currentstate = $state.current.name;
            if ($rootScope.Role == 'Employee') {
                appraisalFctry.api.getAllPendingAppraisals({
                    //$rootScope.userDetails.Id
                },
                    function (response) {
                        var teamMembers = new Array();
                        var i;
                        if (response.data.length > 0) {
                            if (currentstate == 'home.appraisals.teamMembersAppraisal') {
                                role = 'Reporting Manager';
                                $scope.getCommentsAndRating();
                            }
                            else {
                                role = 'Self';
                                $scope.getCommentsAndRating();
                            }
                        }
                        else {
                            role = 'Self';
                            $scope.getCommentsAndRating();
                        }

                    });
            }
            else {
                role = 'HR';
                $scope.getCommentsAndRating();
            }
            $scope.getEmpProfile();
        };

        $scope.getEmpProfile = function () {
            var currentUserEmail = $rootScope.userDetails.UserEmail.value;
            appraisalFctry.api.getEmpProfile({
                user_id: currentUserEmail
            },
                function (response) {
                    if (response.data.length > 0)  {
                        isTrainee = 'True';
                        $scope.getAllQuestion();
                        
                    }
                    else {
                        isTrainee = 'False';
                      //  $scope.showErrorMsg = true;
                        $scope.getAllQuestion();
                    }
                });
        };

        $scope.getAllQuestion = function () {
            appraisalFctry.api.getAppraisalQues({
                Trainee: isTrainee,
                IsActive:'True',
                Archieved:'False'
            },
                function (response) {

                    var quesIdList = '';
                    var quesArray = new Array();
                    if (response.data.length > 0) {
                        for (var i = 0; i < response.data.length; i++) {
                            quesArray.push(response.data[i].Q_Description.value);
                            quesIdList += response.data[i].Q_Id.value + ',';
                        }
                        quesId = quesIdList.substring(0, quesIdList.lastIndexOf(","));
                        $scope.questions = quesArray;
                        //alert(rating);
                    }
                    else {
                        $scope.showErrorMsg = true;
                    }
                });
        }

        $scope.submitAppraisalForm = function (status) {
            appraisalFctry.api.submitAppraisalForm({
                userId: $rootScope.userDetails.UserEmail.value,
                status: status,
                Role: role //TODO :Check role if HR/reporting manager login
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


        $scope.submitAppraisalRating = function () {
            var ratingList = '';
            var commentList = '';
            var i;
            var dict = [];
            for (i = 0; i < $scope.data.singleSelect.length; i++) {
                ratingList += $scope.data.singleSelect[i] + ',';
                // create an empty array
            }
            for (i = 0; i < $scope.data.singleSelect.length; i++) {
                commentList += $scope.data.textAreaValue[i] + ',';
                // create an empty array
            }

            rating = ratingList.substring(0, ratingList.lastIndexOf(","));
            comment = commentList.substring(0, commentList.lastIndexOf(","));


            appraisalFctry.api.submitAppraisalRating({
                userId: $rootScope.userDetails.UserEmail.value,
                Role: role,//TODO: Check role if HR/reporting manager login
                quesId: quesId,
                ratings: rating,
                comments: comment
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

        $scope.submitform = function () {
            if ($scope.myForm.$invalid) {
                toastr.warning("Please fill rating for all questions", "Warning");
                return;
            }
            else {
                toastr.success("Your appraisal form is submitted successfully", "Success");
                $rootScope.showEmpReviewForm = false;
            }
            $scope.submitAppraisalForm('Completed');
            $scope.submitAppraisalRating();
            $modalInstance.close();
        };

        $scope.saveForm = function () {
            if ($scope.myForm.$invalid) {
                toastr.warning("Warning", "Please fill rating for all questions");
                return;
            }
            else {
                toastr.success("Your appraisal form is saved successfully", "Success");
            }
            $scope.submitAppraisalForm('Pending');
            $scope.submitAppraisalRating();
            $modalInstance.close();
        };


        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');

        };

        $scope.getCommentsAndRating = function () {
            var ratings = new Array();
            var comments = new Array();
            appraisalFctry.api.getCommentAndRating({
                userId: $rootScope.userDetails.UserEmail.value,
                Role: role//TODO: Check role if HR/reporting manager login
            },
                function (response) {

                    if (response.data.length > 0) {
                        for (var i = 0; i < response.data.length; i++) {
                            ratings.push(response.data[i].Rating.value);
                            if (response.data[i].Comment.value != 'undefined') {
                                comments.push(response.data[i].Comment.value);
                            }
                            else {
                                comments.push();
                            }
                        }
                        $scope.data.singleSelect = ratings;
                        $scope.data.textAreaValue = comments;
                    }

                });
        };
        $scope.init();
    }]);

