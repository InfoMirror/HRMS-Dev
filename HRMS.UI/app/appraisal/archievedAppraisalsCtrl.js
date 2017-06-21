'use strict';
hrBaseApp.controller('archievedAppraisalsCtrl', ['$scope', '$state', '$modal', '$rootScope', 'appraisalFctry',
    function ($scope, $state, $modal, $rootScope, appraisalFctry) {
        var AppraisalYearList = new Array();
        var arrObjReviews = new Array();
        
        var ArchievedAppraisals = new Array();
        var isPresent='false';

        $scope.init = function () {
            appraisalFctry.api.getArchievedAppraisals({
            },
                function (response) {
                    if (response.data.length > 0) {
                        var objReviews, objDetails;
                        for (var i = 0; i < response.data.length; i++) {
                            objDetails = {
                                name: response.data[i].FirstName.value + ' ' + response.data[i].LastName.value,
                                id: response.data[i].user_id.value
                            }
                            var result = arrObjReviews.filter(function (obj) {
                                if (obj.year == response.data[i].appraisal_year.value) {
                                    obj.reviews.push(objDetails);
                                    isPresent='true';
                                }
                            });
                            if (isPresent=='false') {
                                var arrObjDetails = new Array();
                                arrObjDetails.push(objDetails);
                                objReviews = {
                                    year: response.data[i].appraisal_year.value,
                                    reviews: arrObjDetails
                                }

                                arrObjReviews.push(objReviews);
                            }

                        };
                                $scope.archievedAppraisals=arrObjReviews;
                    }
                });
        }


        $scope.getAppraisalYear = function (year) {
            // for (var i = 0; i < arrObjReviews.length; i++) {
            //     if (arrObjReviews[i].year == year) {
            //         if (arrObjReviews.indexOf(arrObjReviews[i].reviews.name) < 0) {
            //             arrObjReviews.push(arrObjReviews[i].name);
            //         }
            //     }
            // }
        };


        $scope.getEmpAppraisalRating = function (empName,appryear) {
            for (var i = 0; i < arrObjReviews.length; i++) {
                for(var j=0;j<arrObjReviews[i].reviews.length;j++)
                {
                if (arrObjReviews[i].reviews[j].name == empName) {
                    var emailId = arrObjReviews[i].reviews[j].id;
                    $rootScope.teamMemberId = emailId;
                    $rootScope.appr_year = appryear;
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
                    var modalInstance = $modal.open($scope.opts);
                    $scope.opts.resolve.item = function () {

                    }
                }
                }
            }
        };



        $scope.init();
    }]);




