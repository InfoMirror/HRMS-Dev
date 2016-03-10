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
        },
        'getAllEmployees': {
            method: 'GET',
            params: {
                action: 'getAllEmployees'
            }
        },
        'getMasterValues': {
            method: 'POST',
            params: {
                action: 'getMasterValues'
            }
        },
        'updateEmployeeDetails': {
            method: 'POST',
            params: {
                action: 'updateEmployeeDetails'
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

    var _getAllEmployees = function () {
        var deffered = $q.defer();
        resource.getAllEmployees(function (response) {
            deffered.resolve(response)
        }, function (response) {
            deffered.reject(response);
        });
        return deffered.promise;
    };

    var _getMasterValues = function (parms) {
        var deffered = $q.defer();
        resource.getMasterValues(parms, function (response) {
            deffered.resolve(response)
        }, function (response) {
            deffered.reject(response);
        });
        return deffered.promise;
    };

    var _updateEmpDetails = function (parms) {
        var deffered = $q.defer();
        resource.updateEmployeeDetails(parms, function (response) {
            deffered.resolve(response)
        }, function (response) {
            deffered.reject(response);
        });
        return deffered.promise;
    };

    profileFctryData.getAllRelations = _getAllRelations;

    profileFctryData.getAllEmployees = _getAllEmployees;

    profileFctryData.getMasterValue = _getMasterValues;

    profileFctryData.updateEmpDetails = _updateEmpDetails;

    return profileFctryData;
}]);