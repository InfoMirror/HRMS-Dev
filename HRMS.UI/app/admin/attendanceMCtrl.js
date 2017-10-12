var attendanceCtrl = hrBaseApp.controller('attendanceMCtrl', ['Upload', '$window', 'attendanceFctry',
    '$scope', '$state', '$rootScope', 'toastr',
    function (Upload, $window, attendanceFctry, $scope, $state, $rootScope, toastr) {
        var vm = this;

        $scope.init = function () {
            $scope.file = {};
        }

        $scope.submit = function () {
            /*  alert($scope.file.url);//function to call on form submit
          condole.log($('#myfile'));*/
            if (angular.isDefined($scope.file.name)) {
                if ($scope.upload_form.file.$valid && $scope.file && /[A-Z][a-z]{2,2}[0-9]{4,4}(.xlsx)/g.test($scope.file.name)) { //check if from is valid
                    $scope.file.fileName = $scope.SelMonth + $scope.SelYear + '.xlsx';
                    $scope.upload($scope.file); //call upload function
                } else {
                    toastr.warning('File name is not correct it should be like:- Feb2016.xlsx');
                }
            }
            else {
                toastr.warning('Please Upload a file.');
            }
        }

        $scope.upload = function (file) {



            Upload.upload({
                url: 'http://localhost:9095/admin/uploadMonthly', //webAPI exposed to upload the file
                data: { file: file, month: $scope.SelMonth, year: $scope.SelYear } //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise
                if (resp.data.error_code === 0) { //validate success
                    toastr.success('Monthly attendance sheet uploaded successfully. ');
                    setTimeout(function () {
                        $window.location.reload();
                    }, 1000);
                } else {
                    toastr.error('Some error occured');
                     setTimeout(function () {
                        $window.location.reload();
                    }, 1000);
                }
            }, function (resp) { //catch error
                toastr.error('Monthly attendance sheet could not be uploaded');
                 setTimeout(function () {
                        $window.location.reload();
                    }, 1000);

            });
        };

        $scope.init();
    }]);