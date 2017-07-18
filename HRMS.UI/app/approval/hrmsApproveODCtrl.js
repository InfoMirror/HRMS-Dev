hrBaseApp.controller('hrmsApproveODCtrl', ['$scope', '$rootScope', 'approvalFctry', '$modal', 'toastr',
    function ($scope, $rootScope, approvalFctry, $modal, toastr) {

        $scope.init = function () {
            $scope.getFiledOD($rootScope.userDetails);
        }

        $scope.approveODGridOptions = {
            enableSorting: true,
            enableFiltering: true,
            filter: true,
            columnDefs: [
                {
                    field: 'Name.value',
                    displayName: 'Name'
                },
                {
                    field: 'AbsentDate.value',
                    displayName: 'Date',
                    cellFilter: 'date:\'dd-MMM-yyyy\''
                },
                {
                    field: 'ODReason.value',
                    displayName: 'Reason'
                },
                // {
                //     field: 'ODStatus.value',
                //     displayName: 'Approval Status',
                //     cellTemplate: '<div style="margin-left: 30%;" ng-class="{\'fa fa-check clr-green\':row.entity.ODStatus.value == \'Approved\',\'fa fa-close clr-red\':row.entity.ODStatus.value == \'Rejected\'}">{{row.entity.ODStatus.value}}</div>'
                // },
                {
                    field: 'Action',
                    displayName: 'Action',
                    enableColumnMenu: false,
                    enableFiltering: false,
                    cellTemplate: '<div style="margin-left: 30%; margin-top:2%;" ng-show="row.entity.ODStatus.value==\'Filed\'"><button class="btn btn-xs btn-green" ng-click="grid.appScope.openModal(\'approve\',row.entity.Id)" >Approve</button><button class="btn btn-xs btn-red" ng-click="grid.appScope.openModal(\'reject\',row.entity.Id)" style="margin-left: 5%;">Reject</button></div>'
                }
            ]
        };

        $scope.getFiledOD = function (rowId) {
            approvalFctry.getFiledOD(rowId).then(function (response) {
                $scope.approveODGridOptions.data = response.data;
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
            var ODStatus;
            if (status == "approve") {
                ODStatus = 18;
            } else if (status == "reject") {
                ODStatus = 19;
            }
            approvalFctry.approveOD({
                Id: rowId,
                ODStatus: ODStatus
            }).then(function (response) {
                toastr.success("OD is " + status);
                $scope.getFiledOD({
                    Id: $rootScope.userDetails.Id
                });
            });
        }

        $scope.init();
    }])