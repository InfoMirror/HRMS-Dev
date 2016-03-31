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
            
               $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };
        }

        $scope.submit = function () {
            $scope.ApplyLeave.Reason = $scope.LReason;
            //alert($scope.ApplyLeave.Reason);
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
            // alert(JSON.stringify(ApplyLeaveDate));
            leaveFctry.insertLeave(ApplyLeaveDate).then(function (response) {
                if (response.data == "Leave Applied") {
                    alert("Leave is Applied");
                   // $scope.getAppliedLeaves($rootScope.userDetails);
                } else {
                    alert("Applied Leave on same Date already exist");
                    $modalInstance.close();
                }
            });
        }
$scope.open1 = function ($event) {
   //   alert($scope.startDateDisplay);
$scope.ToMin = $scope.FromDate;

      }

        $scope.close = function () {
            $modalInstance.close();
        }

        $scope.init();
                }
                ]);