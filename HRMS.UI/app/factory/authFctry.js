hrBaseApp.factory('authFctry', ['$http', '$resource', '$q', function ($http, $resource, $q) {
    var authDataFctry = {};
    //  var resource = $resource("http://mayank-pc:9095" + '/account/:action', {
    var resource = $resource("http://localhost:9095" + '/account/:action', {
        action: '@action',
    }, {
        'login': {
            method: 'POST',
            params: {
                action: 'login'
            },
            isArray: false
        },
        'insertLoginData': {
            method: 'POST',
            params: {
                action: 'insertLoginData'
            },
            isArray: false
        },
        'insertEmpDetails': {
            method: 'POST',
            params: {
                action: 'insertEmpDetails'
            },
            isArray: false
        }
    });
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
    var _insertLoginData = function (parms) {
        var deferred = $q.defer();
        resource.insertLoginData(parms,
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response);
            });

        return deferred.promise;
    }
    var _insertEmpDetails = function (parms) {
        var deferred = $q.defer();
        resource.insertEmpDetails(parms,
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response);
            });

        return deferred.promise;
    }
    authDataFctry.insertLoginData = _insertLoginData;
    authDataFctry.insertEmpDetails = _insertEmpDetails;
    authDataFctry.login = _login;
    return authDataFctry;
}]);