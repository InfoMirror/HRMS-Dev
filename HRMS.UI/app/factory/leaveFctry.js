hrBaseApp.factory('leaveFctry', ['$http', '$resource', '$q', function ($http, $resource, $q) {
    var leaveFctryData = {};
    var resource = $resource("http://localhost:9095" + "/leave/:action", {
        action: '@action',
    }, {
        'getAbsents': {
            method: 'POST',
            params: {
                action: 'getAbsents'
            },
            isArray: false
        },
        'fileOD': {
            method: 'POST',
            params: {
                action: 'fileOD'
            },
            isArray: false
        },
        'getCompOffs': {
            method: 'GET',
            params: {
                action: 'getCompOffs'
            },
            isArray: false
        }

    });

    var _getAbsents = function (parms) {
        var deferred = $q.defer();
        resource.getAbsents(parms, function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response);

            });
        return deferred.promise;
    }

    var _fileOD = function (parms) {
        var deferred = $q.defer();
        resource.fileOD(parms, function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response);

            });
        return deferred.promise;
    }

    var _getCompOffs = function (parms) {
        var deferred = $q.defer();
        resource.getCompOffs(parms, function (response) {
                console.log(response);
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response);

            });
        return deferred.promise;
    }
    
    leaveFctryData.getAbsents = _getAbsents;
    leaveFctryData.fileOD = _fileOD;
    leaveFctryData.getCompOffs = _getCompOffs;

    return leaveFctryData;
}]);