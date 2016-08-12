hrBaseApp.controller('hrmsAppraisalCtrl', ['$scope', '$rootScope', '$modal', 'appraisalFctry', '$filter',
    function ($scope, $rootScope, $modal, appraisalFctry, $filter) {
        'use strict';
        $scope.init = function () {
           
        }            
        
    }]);
        var reviewDate = $rootScope.userDetails.DOB.value;
        getAppraisal();
        document.getElementById("reviewReminder").innerHTML = "Your annual review is pending.Please fill and submit your review form till " + reviewDate;

        $scope.click = function () {
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

            // $scope.opts.resolve.item = function () {
            //     return angular.copy({ name: "Damini" }); // pass name to Dialog
            // }

            var modalInstance = $modal.open($scope.opts);

            modalInstance.result.then(function () {
                //on ok button press 
            }, function () {
                //on cancel button press
                console.log("Modal Closed");
            });
        };

     


        function getAppraisal() {
            appraisalFctry.api.getAppraisal({
                userId: $rootScope.userDetails.UserEmail.value,
            },

                function (response) {
                    var rating = new Array();
                    if (response.data.length > 0) {
                        var i;
                        for (i = 0; i < response.data.length; i++) {
                            rating.push(response.data[i].appraisal_month.value + response.data[i].appraisal_year.value);

                        }
                        //alert(rating);
                    }
                    else {
                        $scope.showErrorMsg = true;
                    }

                });
        };
