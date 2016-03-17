var attendanceCtrl=hrBaseApp.controller('attendanceMCtrl',['Upload','$window','attendanceFctry','$scope','$state','$rootScope',function(Upload,$window,attendanceFctry, $scope,$state,$rootScope){
        var vm = this;
        
        $scope.init = function(){
            $scope.file={};
        }
        
        $scope.submit = function(){ 
          /*  alert($scope.file.url);//function to call on form submit
        condole.log($('#myfile'));*/
            if ($scope.upload_form.file.$valid && $scope.file) { //check if from is valid
                $scope.file.fileName=$scope.SelMonth + $scope.SelYear +'.xlsx';
                $scope.upload($scope.file); //call upload function
            }
        }
        
        $scope.upload = function (file) {
            
          
          
            Upload.upload({
                url: 'http://localhost:9095/admin/uploadMonthly', //webAPI exposed to upload the file
                data:{file:file,month:$scope.SelMonth,year:$scope.SelYear} //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise
                if(resp.data.error_code === 0){ //validate success
                    $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                } else {
                    $window.alert('an error occured');
                }
            }, function (resp) { //catch error
                console.log('Error status: ' + resp.status);
                $window.alert('Error status: ' + resp.status);
            }, function (evt) { 
                console.log(evt);
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
            });
        };
    
        $scope.init();
    }]);