hrBaseApp.factory('attendanceFctry', ['$http', '$resource', '$q', function ($http, $resource, $q) {
    var attendanceFctry = {};

    var resource = $resource(hrmsSettingsVal.jsonUrl + '/account/:action', {
        action: '@action',
    },
        {
            'upload': { method: 'POST', params: { action: 'upload' }, isArray: false }
        }
    );

    var _upload = function (parms) {
        var deferred = $q.defer();
        resource.upload(parms,
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response);
            });

        return deferred.promise;
    }
    attendanceFctry.upload = _upload;
    return attendanceFctry;
}]);