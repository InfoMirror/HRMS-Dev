var attendanceCtrl = hrBaseApp.controller('attendanceCtrl', ['Upload', '$window', 'attendanceFctry', '$scope',
    '$state', '$rootScope', 'toastr',
    function (Upload, $window, attendanceFctry, $scope, $state, $rootScope, toastr) {
        var vm = this;

        $scope.init = function () {
            $scope.disableButton == false;
            $scope.file = {};
        }

        $scope.submit = function () {
            if (angular.isDefined($scope.file.name)) {

                if ($scope.uploadForm.file.$valid && $scope.file && /[0-9]{2,2}[A-Z][a-z]{2,2} [0-9]{4,4}(.xlsx)/g.test($scope.file.name)) { //check if from is valid
                    $scope.upload($scope.file); //call upload function
                } else {
                    toastr.warning('file name is not correct it should be like this :- 02Feb 2016.xlsx');
                }
            } else {
                toastr.warning('Please Upload a file.');
            }
        }


        $scope.upload = function (file) {

            Upload.upload({
                url: 'http://localhost:9095/admin/upload', //webAPI exposed to upload the file
                data: { file: file } //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise

                if (resp.data.error_code === 0) { //validate 
                    if (resp.data.error_weekend === 1) {
                        toastr.warning('Excel upload is not allowed for weekend');
                        setTimeout(function () {
                            $window.location.reload();
                        }, 1000);
                    } else {
                        toastr.success('Daily attendance sheet uploaded successfully.');
                        setTimeout(function () {
                            $window.location.reload();
                        }, 1000);
                    }
                }
                else if (resp.data.error_code === 11) {
                    toastr.warning('Attandace for this date is already uploaded');
                    setTimeout(function () {
                        $window.location.reload();
                    }, 1000);
                } else {
                    toastr.error('Some error occured. File could not be uploaded');
                    setTimeout(function () {
                        $window.location.reload();
                    }, 1000);
                }
            }, function (resp) { //catch error
                toastr.error('Daily attendance sheet could not be uploaded');
                setTimeout(function () {
                    $window.location.reload();
                }, 1000);
            });
        };

        $scope.init();

    }]);