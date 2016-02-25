hrBaseApp.controller('hrmsCompOffsCtrl', ['$scope', 'leaveFctry', '$rootScope','$modal', function ($scope, leaveFctry, $rootScope, $modal) {
    'use strict';
    /* Initialize */
    $scope.init = function () {
        $scope.message = 'Hello, Welcome to CompOff Page';
        $scope.getCompOffsData($rootScope.userDetails);
    }

    $scope.CompOffsGridOptions = {
        enableSorting: true,
        data: null,
        columnDefs: [
            {
                field: 'CompOffDate',
                displayName: 'CompOff Date',
                enableColumnMenu: false,
                cellFilter: 'date:\'dd-MMM-yyyy\''
            },
            {
                field: 'EmployeeName',
                displayName: 'Name',
                enableColumnMenu: false
            },

            {
                field: 'IsManual',
                displayName: 'Is Manual',
                enableColumnMenu: false,
                cellTemplate: '<input type="checkbox" disabled ng-model="row.entity.IsManual">'
            },
            {
                field: 'CompOffStatus',
                displayName: 'CompOff Status',
                enableColumnMenu: false

            }

        ]
    };
    $scope.insertCompOff = function () {

    }
    $scope.getCompOffsData = function (empData) {
        leaveFctry.getCompOffs(empData).then(function (response) {
            console.log(response.data);
            $scope.CompOffsGridOptions.data = response.data;
        });
    }


    $scope.insertCompOff = function (CompOffData) {
        leaveFctry.insertCompOff(CompOffData).then(function (response) {
            if (response.data == "CompOff Applied") {
              //  console.log(response.data);
                $scope.getCompOffsData($rootScope.userDetails);
            }
        });
    }


    $scope.openModal = function () {
        var modalInstance = $modal.open({
            templateUrl: '/app/leaves/applyCompOffMdlCtrl.html',
            controller: 'applyCompOffMdlCtrl',
            size: 'md',
            resolve: {
                aValue: function () {
                }
            }
        });
        modalInstance.result.then(function (paramFromDialog) {
            debugger;
            $scope.paramFromDialog = paramFromDialog;
            $scope.getCompOffsData($rootScope.userDetails);
        });
    }

    $scope.IsManualTrue = function (IsManual) {
        if (IsManual == 1)
            return true
        else
            IsManual = 1
    }

    $scope.init();
}]);