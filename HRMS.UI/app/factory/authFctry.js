hrBaseApp.factory('authFctry', ['$http', '$resource', '$q', function ($http, $resource, $q) {
    var authDataFctry = {};
  //  var resource = $resource("http://mayank-pc:9095" + '/account/:action', {
    var resource = $resource("http://192.168.0.202:9095" + '/account/:action', {
        action: '@action',
    },
    {
        'login': { method: 'POST', params: { action: 'login' }, isArray: false }
    }
    );
    var _login = function (parms) {
        var deferred = $q.defer();
        resource.login(parms,
            function (response) {
                deferred.resolve(response);
            },
          function (response) {
              deferred.reject(response);
          });

        return deferred.promise;
    }

    authDataFctry.login = _login;
    return authDataFctry;
}]);