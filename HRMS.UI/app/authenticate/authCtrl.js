var authCtrl = hrBaseApp.controller('authCtrl', ['authFctry', '$scope', '$state', '$rootScope', 'localStorageService', function (authFctry, $scope, $state, $rootScope, localStorageService) {

    // #region Initialize

    $scope.init = function () {
        $rootScope.userDetails = localStorageService.get('userDetails');
        if ($rootScope.userDetails != undefined) {
            localStorageService.set('userDetails', undefined);
            location.reload();
        }
    }

    $scope.signin = function () {

        var myParams = {
            'clientid': '142159620286-m8khm27vosmf3ovj9lbgrtj1vqd52jtj.apps.googleusercontent.com',
            'cookiepolicy': 'single_host_origin',
            'callback': $scope.loginCallback,
            'approvalprompt': 'force',
            'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
        };
        gapi.auth.signIn(myParams);
    };

    $scope.loginCallback = function (result) {
        // alert(0);
        if (result['status']['signed_in']) {
            var request = gapi.client.plus.people.get({
                'userId': 'me'
            });
            request.execute(function (resp) {
                var email = '';
                if (resp['emails']) {
                    for (var i = 0; i < resp['emails'].length; i++) {
                        if (resp['emails'][i]['type'] == 'account') {
                            email = resp['emails'][i]['value'];
                        }
                    }
                }

                var str = "Name:" + resp['displayName'] + "<br>";
                /* str += "Image:" + resp['image']['url'] + "<br>";
                 str += "<img src='" + resp['image']['url'] + "' /><br>";

                 str += "URL:" + resp['url'] + "<br>";*/
                str += "Email:" + email + "<br>";
                //alert(str);
                $scope.profile = str;
                if (resp["domain"] == 'infoobjects.com') {
                    var formdata = {
                        email: email,
                        image: resp.image.url,
                    }
                    authFctry.login(formdata).then(function (response) {

                            if (response.data.length > 0) {
                                $rootScope.userDetails = response.data[0];
                                $rootScope.Role = response.data[0].Role.value;
                                /* if ($rootScope.userDetails.Role == 'HR') {
                                     $rootScope.Role = $rootScope.userDetails.Role;
                                 } else {
                                     $rootScope.Role = $rootScope.userDetails.Role;
                                 }*/
                                $rootScope.isLoggedIn = true;
                                $rootScope.userDetails.isLoggedIn = $rootScope.isLoggedIn;
                                localStorageService.set('userDetails', $rootScope.userDetails);
                                localStorageService.set('role', $rootScope.Role);
                                /*if (response.data[0].Role.value == "Employee" && (response.data[0].ProfileStatus.value == 22 || response.data[0].ProfileStatus.value == 23)) {
                                    $rootScope.ShowAllStates = false;
                                    $state.go('home.editProfile');
                                } else if (response.data[0].Role.value == "HR") {
                                    $rootScope.ShowAllStates = true;
                                    $state.go('home.dashboard');
                                }*/
                                if (response.data[0].ProfileStatus.value == 22 || response.data[0].ProfileStatus.value == 23) {
                                    $rootScope.ShowAllStates = false;
                                    $state.go('home.editProfile');
                                } else {
                                    $rootScope.ShowAllStates = true;
                                    $state.go('home.dashboard');
                                }
                            }

                        },
                        function (error) {

                            console.log(error);
                        });
                } else {
                    alert('You are not authorized to login to this portal. Please try to login with your infoobjects.com account.');
                    $rootScope.isLoggedIn = false;
                    gapi.auth.signOut();
                    location.reload();
                }

            });

        }

    }



    $scope.logout = function () {
        gapi.auth.signOut();
        location.reload();
    }

    function onLoadCallback() {
        gapi.client.setApiKey('AIzaSyCNpwkECtLeyE5eRqNxoCmOjG9DQuL3Dp8');
        gapi.client.load('plus', 'v1', function () {});
    }

    $scope.init();
}]);