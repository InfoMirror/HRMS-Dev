hrBaseApp.factory('authFctry', ['$http', '$resource', '$q', function ($http, $resource, $q) {
    var authDataFctry = {};

    var resource = $resource(hrmsSettingsVal.jsonUrl + '/account/:action', {
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