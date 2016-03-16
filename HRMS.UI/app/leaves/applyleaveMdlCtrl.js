hrBaseApp.controller('applyleaveMdlCtrl', [
    '$scope', '$modalInstance', 'aValue', 'leaveFctry', '$rootScope',
    function ($scope, $modalInstance, aValue, leaveFctry, $rootScope) {
        'use strict';

        $scope.init = function () {

            $scope.ApplyLeave = {
                EmpId: aValue,
                FromDate: new Date(),
                ToDate: new Date(),
                Status: 26,
                Reason: ''
            }
        }

        $scope.submit = function () {
            $scope.ApplyLeave.Reason = $scope.LReason;
            alert($scope.ApplyLeave.Reason);
            debugger;
            // $scope.Reason.Reason = $scope.Reason;
            if ($scope.ApplyLeave.Reason != '' && $scope.ApplyLeave.Reason != undefined) {
                $scope.ApplyLeave.FromDate = $scope.FromDate;
                $scope.ApplyLeave.ToDate = $scope.ToDate;
                $scope.ApplyLeave.Reason = $scope.LReason;
                console.log($scope.ApplyLeave);
                $scope.insertLeave($scope.ApplyLeave);
            }
        }

        $scope.insertLeave = function (ApplyLeaveDate) {
            alert(JSON.stringify(ApplyLeaveDate));
            leaveFctry.insertLeave(ApplyLeaveDate).then(function (response) {
                if (response.data == "Leave Applied") {
                    $scope.close();
                }
            });
        }

        $scope.close = function () {
            $modalInstance.close();
        }

        $scope.init();
                }
                ]);