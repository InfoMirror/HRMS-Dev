hrBaseApp.controller('applyleaveMdlCtrl', [
    '$scope', '$modalInstance', 'aValue', 'leaveFctry', '$rootScope','toastr',
    function ($scope, $modalInstance, aValue, leaveFctry, $rootScope, toastr) {
        'use strict';

        $scope.init = function () {
             $scope.disableSubmit = false;
            $scope.ApplyLeave = {
                EmpId: aValue,
                FromDate: new Date(),
                ToDate: new Date(),
                Status: 26,
                Reason: ''
            }

            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };
        }
        $scope.startMin = moment().subtract(0, 'days').format('MM/DD/YYYY');
        $scope.startMax = moment().add(90, 'days').format('MM/DD/YYYY');

        $scope.submit = function () {
             $scope.disableSubmit = true;
            $scope.ApplyLeave.Reason = $scope.LReason;
            //alert($scope.ApplyLeave.Reason);
            // $scope.Reason.Reason = $scope.Reason;
            if ($scope.ApplyLeave.Reason != '' && $scope.ApplyLeave.Reason != undefined) {
                $scope.ApplyLeave.FromDate = $scope.FromDate;
                $scope.ApplyLeave.ToDate = $scope.ToDate;
                $scope.ApplyLeave.Reason = $scope.LReason;
                $scope.insertLeave($scope.ApplyLeave);
            }
        }

        $scope.insertLeave = function (ApplyLeaveDate) {
            // alert(JSON.stringify(ApplyLeaveDate));
            leaveFctry.insertLeave(ApplyLeaveDate).then(function (response) {
                if (response.data == "Leave Applied") {
                     toastr.success("Leave is Applied");
                    $modalInstance.close();
                    // $scope.getAppliedLeaves($rootScope.userDetails);
                } else {
                     toastr.warning("Applied Leave on same Date already exist");
                    $modalInstance.close();
                }
            });
        }

        $scope.endDateCalOpen = function ($event) {
            $scope.ToMin = $scope.FromDate;
        }

        $scope.startDateCalOpen = function ($event) {
            if ($scope.FromDate > $scope.ToDate) {
                 toastr.warning("From Date can not be greater than To Date");
                $scope.ToDate = $scope.FromDate;
            }
        }
        $scope.close = function () {
            $modalInstance.close();
        }

        $scope.init();
                }
                ]);