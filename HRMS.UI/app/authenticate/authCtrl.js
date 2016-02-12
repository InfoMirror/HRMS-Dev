var authCtrl = hrBaseApp.controller('authCtrl', ['authFctry', '$scope', function (authFctry, $scope) {

    // #region Initialize
    alert('Hello, I am in authCtrl');
    $scope.init = function () {
        $scope.userDetails = { "email": "surbhi@infoobjects.com", "userName": "SurbhiHarsh" };
        $scope.setUserDetails();
        //$scope.login($scope.userDetails);
      //  alert(JSON.stringify($scope.userDetails));
       // alert($scope.userDetails.email);
    }

    //$scope.login = function (userDetails) {
    //    authFctry.login(userDetails);
    //}

    $scope.setUserDetails = function () {
        var params = {
            email: $scope.userDetails.email,
            userName: $scope.userDetails.userName
        };
        console.log(params);
        authFctry.login(params).then(function (response) {
            console.log(response);
            $scope.userDetails = {
                email: response.data[0].UserEmail,
                team: response.data[0].Team,
                skypeId: response.data[0].SkypeID,
                name: response.data[0].FirstName + response.data[0].LastName
            }
        },
        function (error) {
            console.log(error);
        });
    };

    $scope.init();
}]);