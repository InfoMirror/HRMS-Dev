hrBaseApp.controller('hrmsApproveCompOffCtrl', ['$scope', '$rootScope', 'approvalFctry', '$modal', 'toastr',
    function ($scope, $rootScope, approvalFctry, $modal, toastr) {

        $scope.init = function () {
            $scope.getFiledCompOff($rootScope.userDetails);
        }

        $scope.approveCompOffGridOptions = {
            enableSorting: true,
            enableFiltering: true,
            filter: true,
            columnDefs: [
                {
                    field: 'Name.value',
                    displayName: 'Name',
                },
                {
                    field: 'CompOffDate.value',
                    displayName: 'Date',
                    cellFilter: 'date:\'dd-MMM-yyyy\''
                },
                {
                    field: 'CompOffReason.value',
                    displayName: 'Comp off reason'
                },
                {
                    field: 'Action',
                    displayName: 'Action',
                    enableColumnMenu: false,
                    enableFiltering: false,
                    cellTemplate: '<div style="margin-top: 2%;margin-left: 30%;" ng-show="row.entity.CompOffStatus.value==\'Filed\'"><button class="btn btn-xs btn-green"  ng-click="grid.appScope.openModal\(\'approve\',row.entity.Id)"">Approve</button><button class="btn btn-xs btn-red" ng-click="grid.appScope.openModal\(\'reject\',row.entity.Id)" style="margin-left:5%;">Reject</button></div>'

                }

            ]
        };

        $scope.getFiledCompOff = function (rowId) {

            approvalFctry.getFiledCompOff(rowId).then(function (response) {
                $scope.approveCompOffGridOptions.data = response.data;
            });
        }
        $scope.openModal = function (status, rowId) {
            {

                var modalInstance = $modal.open({
                    templateUrl: '/app/shared/confirmationBoxMdlCtrl.html',
                    controller: 'confirmationBoxMdlCtrl',
                    size: 'md',
                    resolve: {
                        aValue: function () {
                            return status
                        }
                    }
                });
                modalInstance.result.then(function (paramFromDialog) {
                    if (paramFromDialog) {
                        $scope.updateStatus(status, rowId);
                    }
                });
            }
        }
        $scope.updateStatus = function (status, rowId) {
            var compOffStatus;
            if (status == "approve") {
                compOffStatus = 18;
            } else if (status == "reject") {
                compOffStatus = 19;
            }
            approvalFctry.approveCompOff({
                Id: rowId,
                compOffStatus: compOffStatus
            }).then(function (response) {
                toastr.success("CompOff " + status);
                $scope.getFiledCompOff({
                    Id: $rootScope.userDetails.Id
                });

            });
        }

        $scope.init();
    }])