
hrBaseApp.controller('hrmsEmpAppraisalCtrl', ['$scope', '$state', '$rootScope', 'hrmsConstant', '$modal', 'appraisalFctry', '$filter',
    function ($scope, $state, $rootScope, hrmsConstant, $modal, appraisalFctry, $filter) {
        'use strict';
        $rootScope.teamMember;
        $rootScope.teamMemberId;

        var role;
        var teamMembers = new Array();
        var currentstate = $state.current.name;
        var currentUserEmail = $rootScope.userDetails.UserEmail.value;

        $scope.init = function () {

            $scope.pendingAppraisal = "Pending Appraisals";
            $scope.reviewDate = 'No self Appraisal';
            $scope.showEmpReviewForm = false;
            $scope.getLastAppraisalDate();
            $scope.getPendingAppraisals();
            $scope.getAppraisalStatus();
        }

        $scope.getAppraisalStatus = function () {
            var currentstate = $state.current.name;

            if ($rootScope.Role == 'Employee') {
                appraisalFctry.api.getAllPendingAppraisals({
                },
                    function (response) {
                        var teamMembers = new Array();
                        var i;
                        if (response.data.length > 0) {
                            if (currentstate == 'home.appraisals.teamMembersAppraisal') {
                                role = 'Reporting Manager';
                                $scope.getStatus();
                            }
                            else {
                                role = 'Self';
                                $scope.getStatus();
                            }
                        }
                        else {
                            role = 'Self';
                            $scope.getStatus();
                        }
                    });
            }
            else {
                role = 'HR';
                $scope.getStatus();
            }
        };

        $scope.getStatus = function () {
            appraisalFctry.api.getAppraisalStatus({
                userId: currentUserEmail,
                Role: role
            },
                function (response) {
                    if (response.data.length > 0) {
                        for (var i = 0; i < response.data.length; i++) {
                            var status = response.data[i].status.value;
                            if (status == 'Completed') {
                                $scope.showEmpReviewForm = false;
                            }
                            else {
                                $scope.showErrorMsg = true;
                            }
                        }
                    }
                    else {
                        $scope.showErrorMsg = true;
                    }

                });
        };

        $scope.fillReviewForm = function (teamMember) {
            var result = teamMembers.filter(function (obj) {
                if (obj.name == teamMember) {
                    $rootScope.teamMember = teamMember;
                    $rootScope.teamMemberId = obj.id;

                }
            });
            if (currentstate == 'home.appraisals.teamMembersAppraisal') {
                    var modalInstance;
                    var apprFormStatus = new Array();

                    appraisalFctry.api.getEmployeeAppraisalStatus({
                        user_id: $rootScope.teamMemberId
                    },
                        function (response) {
                            if (response.data.length > 0) {
                                for (var i = 0; i < response.data.length; i++) {
                                    apprFormStatus.push(response.data[i].status.value);
                                }
                                var index = apprFormStatus.indexOf('Pending');

                                if (index < 0) {
                                    if (currentUserEmail == hrmsConstant.superAdminEmail) {
                                        $scope.opts = {
                                            backdrop: true,
                                            backdropClick: true,
                                            dialogFade: false,
                                            keyboard: true,
                                            templateUrl: '/app/appraisal/hrmsAdminAppraisalCtrl.html',
                                            controller: 'hrmsAdminAppraisalCtrl',
                                            size: 'lg',
                                            resolve: {}
                                        };
                                        modalInstance = $modal.open($scope.opts);
                                    }
                                    else {
                                        window.alert("You have successfully submitted the appraisal form");
                                    }
                                }

                                else {
                                    if (currentUserEmail == hrmsConstant.superAdminEmail) {
                                        window.alert("Appraisal form is incomplete from HR/Manager side.Please review after some time");
                                    }
                                    else {
                                        $scope.opts = {
                                            backdrop: true,
                                            backdropClick: true,
                                            dialogFade: false,
                                            keyboard: true,
                                            templateUrl: '/app/appraisal/Modal.html',
                                            controller: 'ModalCtrl',
                                            size: 'lg',
                                            resolve: {}
                                        };
                                        modalInstance = $modal.open($scope.opts);
                                    }
                                }
                            }
                        });
            }
            else {
                //Already if Superadmin is logged in, the review button will be hidden
                $scope.opts = {
                    backdrop: true,
                    backdropClick: true,
                    dialogFade: false,
                    keyboard: true,
                    templateUrl: '/app/appraisal/Modal.html',
                    controller: 'ModalCtrl',
                    size: 'lg',
                    resolve: {}
                };
                modalInstance = $modal.open($scope.opts);
            }

            if ($scope.opts != null) {
                $scope.opts.resolve.item = function () {

                }
            }
        };

        $scope.addAppraisalDate = function () {
            appraisalFctry.api.addAppraisalInfo({
                userId: currentUserEmail,
                apprMonth: $filter('date')($rootScope.userDetails.DOJ.value, 'M'),
                apprYear: $filter('date')($rootScope.userDetails.DOJ.value, 'yyyy'),
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

        $scope.getPendingAppraisals = function () {
            appraisalFctry.api.getAllPendingAppraisals({

            },
                function (response) {
                    var teamMembersName = new Array();
                    var i, obj;
                    if (response.data.length > 0) {
                        if ($rootScope.Role == 'Employee') {
                            for (i = 0; i < response.data.length; i++) {
                                // TODO:check this condition for reporting head
                                if (response.data[i].ReportingHead.value == $rootScope.userDetails.Id.value ||
                                    $rootScope.userDetails.UserEmail.value == hrmsConstant.superAdminEmail) {
                                    obj = {
                                        name: response.data[i].FirstName.value + ' ' + response.data[i].LastName.value,
                                        id: response.data[i].UserEmail.value
                                    };
                                    teamMembers.push(obj);
                                    teamMembersName.push(teamMembers[i].name);
                                }
                            }
                            $scope.teamMembers = teamMembersName;
                        }
                        else {
                            // condition for HR
                            for (i = 0; i < response.data.length; i++) {
                                $scope.teamMembers.push(response.data[i].FirstName.value + ' ' + response.data[i].LastName.value);
                            }
                        }
                    }
                    else {
                        $scope.pendingAppraisal = "No Pending Appraisals";
                        $scope.showErrorMsg = true;
                    }

                });
        };

        $scope.updateLastAppraisalDate = function () {
            appraisalFctry.api.updateAppraisalInfo({
                userId: currentUserEmail,
                apprMonth: $filter('date')($scope.currentdateMonth + 1, 'MMMM'),
                apprYear: $filter('date')($scope.currentdateYear, 'yyyy'),
                isAppraisal: 0,
                status: "Pending"
            },
                function (response) {
                    if (response.data.length > 0) {
                        $scope.reviewDate = $scope.getMonthName($scope.lastAppraisalMonth) + " " + $scope.lastAppraisalYear;
                        $scope.reviewReminder = "Your annual review is pending.Please fill and submit your review form till " + $scope.reviewDate;
                    }
                    else {
                        $scope.showErrorMsg = true;
                    }

                });
        };

        $scope.getMonthName = function (month) {
            $scope.monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            return $scope.monthList[month - 1];
        };

        $scope.getLastAppraisalDate = function () {
            var date = new Date();
            var isTrainee = $rootScope.userDetails.IsTrainee.value;
            appraisalFctry.api.getAppraisal({
                userId: currentUserEmail,
            },
                function (response) {
                    if (response.data.length > 0) {
                        $scope.lastAppraisalMonth = response.data[0].appraisal_month.value;
                        $scope.lastAppraisalYear = parseInt(response.data[0].appraisal_year.value);
                        $scope.nextAppraisalYear = $scope.lastAppraisalYear + 1;
                        $scope.currentDateMonth = $scope.getMonthName(date.getMonth() + 1);
                        $scope.currentDateYear = date.getFullYear();

                        //if ((currentdateYear-$scope.lastAppraisalYear == 1) && currentdateMonth+1 == $scope.lastAppraisalMonth ) {
                        $scope.reviewDate = $scope.lastAppraisalMonth + " " + $scope.nextAppraisalYear;
                        $scope.reviewReminder = "Your annual review time is " + $scope.reviewDate;
                        if (isTrainee) {
                            var traineeAppraisalMonth = date.getMonth() + 7;
                            if (traineeAppraisalMonth > 12) {
                                traineeAppraisalMonth = traineeAppraisalMonth - 12;
                                $scope.currentDateYear = $scope.currentDateYear + 1;
                            }
                            $scope.reviewReminder = "Your annual review time is " + $scope.getMonthName(traineeAppraisalMonth) + " " + $scope.currentDateYear;
                            $scope.showEmpReviewForm = true;
                        }
                        else if ($scope.currentDateYear == $scope.nextAppraisalYear && ($scope.currentDateMonth == $scope.lastAppraisalMonth)) {
                            // TODO: Show employee review button before 1 month of last review month
                            $scope.showEmpReviewForm = true;
                        }

                    }
                    else {
                        $scope.addAppraisalDate();
                        //TODO:Check appr_month value
                        var appr_month = $filter('date')($rootScope.userDetails.DOJ.value, 'M');
                        var appr_year = $filter('date')($rootScope.userDetails.DOJ.value, 'yyyy');
                        if (isTrainee) {
                            var traineeAppraisalMonth = $scope.getMonthName(date.getMonth() + 7);
                            $scope.reviewReminder = "Your review time is " + traineeAppraisalMonth + appr_year;
                        }
                        else {
                            $scope.reviewReminder = "Your review time is " + appr_month + appr_year + 1;

                        }
                        //TODO:Remove the below line for not showing review button if review not pending
                        $scope.showEmpReviewForm = true;
                    }

                });
        };

        $scope.init();
    }]);
