hrBaseApp.controller('hrmsApproveLeaveCtrl', ['$scope', '$rootScope', 'approvalFctry', '$state', '$modal', 'toastr',
    function ($scope, $rootScope, approvalFctry, $state, $modal, toastr) {

        $scope.init = function () {
            $scope.getAppliedLeaves({
                Id: $rootScope.userDetails.Id
            })
        }

        $scope.approveLeaveGridOptions = {
            enableSorting: true,
            enableFiltering: true,
            filter: true,
            columnDefs: [
                {
                    field: 'Name.value',
                    displayName: 'Name'
                },
                {
                    field: 'FromDate.value',
                    displayName: 'From',
                    cellFilter: 'date:\'dd-MMM-yyyy\'',

                },
                {
                    field: 'ToDate.value',
                    displayName: 'To',
                    cellFilter: 'date:\'dd-MMM-yyyy\'',

                },
                {
                    field: 'Reason.value',
                    displayName: 'Reason'
                },
                // {
                //     field: 'Status.value',
                //     displayName: 'Approval Status',
                //     cellTemplate: '<div style="margin-left: 30%;" ng-class="{\'fa fa-check clr-green\':row.entity.Status.value == \'Approved\',\'fa fa-close clr-red\':row.entity.Status.value == \'Rejected\'}">{{row.entity.Status.value}}</div>'
                // },
                {
                    field: 'Action',
                    displayName: 'Action',
                    cellTemplate: '<div style="margin-top: 2%;margin-left: 20%;"  ng-show="row.entity.Status.value==\'Pending\'"><button class="btn btn-xs btn-green" ng-click="grid.appScope.openModal(\'Approved\',row.entity.Id)">Approve</button></hr><button class="btn btn-xs btn-red"  style="margin-left:5%"; ng-click="grid.appScope.openModal(\'Rejected\',row.entity.Id)">Reject</button></div>'

                }
            ]
        }

        $scope.getAppliedLeaves = function (userId) {
            approvalFctry.getAppliedLeaves(userId).then(function (response) {
                $scope.approveLeaveGridOptions.data = response.data;
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
            var _status;
            if (status == 'Approved')
                _status = 18;
            else if (status == 'Rejected')
                _status = 19;

            approvalFctry.approveLeave({
                Id: rowId,
                Status: _status
            }).then(function (response) {
                toastr.success("Leave " + status);
                $scope.getAppliedLeaves({
                    Id: $rootScope.userDetails.Id
                });
            });
        }

        $scope.init();
    }])