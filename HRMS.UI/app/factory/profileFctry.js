hrBaseApp.factory('profileFctry', ['$http', '$resource', '$q', function ($http, $resource, $q) {
    var profileFctryData = {};

    var resource = $resource('http://localhost:9095' + '/profile/:action', {
        action: '@action',
    }, {
        'getAllRelations': {
            method: 'GET',
            params: {
                action: 'getAllRelations'
            }
        }
    });

    var _getAllRelations = function () {
        var deffered = $q.defer();
        resource.getAllRelations(function (response) {
            deffered.resolve(response)
        }, function (response) {
            deffered.reject(response);
        });
        return deffered.promise;
    };

    profileFctryData.getAllRelations = _getAllRelations;

    return profileFctryData;
}]);