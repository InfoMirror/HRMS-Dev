
hrBaseApp.controller('hrmsEmpAppraisalCtrl', ['$scope', '$rootScope', '$modal', 'appraisalFctry', '$filter',
    function ($scope, $rootScope, $modal, appraisalFctry, $filter) {
        'use strict';

        $scope.init = function () {
            $scope.getLastAppraisalDate();
            $scope.reviewDate = '';
            $scope.showEmpReviewForm = false;
            //$scope.reviewReminder = "Your annual review is pending.Please fill and submit your review form till " + $scope.reviewDate;  
        }
        
        $scope.getMonthName = function (month) {
            $scope.monthList = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return $scope.monthList[month-1];
        }

        $scope.fillReviewForm = function () {
            $scope.opts = {
                backdrop: true,
                backdropClick: true,
                dialogFade: false,
                keyboard: true,
                templateUrl: '/app/appraisal/Modal.html',
                controller: 'ModalCtrl',
                size: 'lg',
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

        $scope.addAppraisalDate = function () {
            appraisalFctry.api.addAppraisalInfo({
                userId: $rootScope.userDetails.UserEmail.value,
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
        
        $scope.updateLastAppraisalDate = function () {
            appraisalFctry.api.updateAppraisalInfo({
                userId: $rootScope.userDetails.UserEmail.value,
                apprMonth: $filter('date')($scope.currentdateMonth+1, 'MMMM'),
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

        $scope.getLastAppraisalDate = function () {
            appraisalFctry.api.getAppraisal({
                userId: $rootScope.userDetails.UserEmail.value,
            },
                function (response) {
                    if (response.data.length > 0) {
                        $scope.lastAppraisalMonth = response.data[0].appraisal_month.value;
                        $scope.lastAppraisalYear = parseInt(response.data[0].appraisal_year.value);
                        $scope.nextAppraisalYear = $scope.lastAppraisalYear + 1;
                        var date = new Date();
                        $scope.currentDateMonth = date.getMonth() + 1;
                        $scope.currentDateYear = date.getFullYear();

                        //if ((currentdateYear-$scope.lastAppraisalYear == 1) && currentdateMonth+1 == $scope.lastAppraisalMonth ) {
                        $scope.reviewDate = $scope.getMonthName($scope.lastAppraisalMonth) + " " + $scope.nextAppraisalYear;
                        $scope.reviewReminder = "Your annual review time is " + $scope.reviewDate;  
                        if($scope.currentDateYear == $scope.nextAppraisalYear && ($scope.currentDateMonth+1 == $scope.lastAppraisalMonth))
                        {
                        $scope.showEmpReviewForm = true;                            
                        }
                        
                    }
                    else {
                        $scope.addAppraisalDate();
                    }

                });
        };

        $scope.init();
    }]);





