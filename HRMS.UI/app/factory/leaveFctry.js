hrBaseApp.factory('leaveFctry', ['$http', '$resource', '$q', function ($http, $resource, $q) {
    var leaveFctryData = {};
    var resource = $resource(hrmsSettingsVal.jsonUrl + "/leave/:action", {

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
                method: 'POST',
                params: {
                    action: 'getCompOffs'
                },
                isArray: false
            },

            'insertCompOff': {
                method: 'POST',
                params: {
                    action: 'insertCompOff'
                },
                isArray: false
            },
            'markCompOff': {
                method: 'POST',
                params: {
                    action: 'markCompOff'
                }
            },
            'getAppliedLeaves': {
                method: 'POST',
                params: {
                    action: 'getAppliedLeaves'
                }
            },
            'insertLeave': {
                method: 'POST',
                params: {
                    action: 'insertLeave'
                }
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

    var _insertCompOff = function (parms) {
        var deferred = $q.defer();
        resource.insertCompOff(parms, function (response) {
            console.log(response);
            deferred.resolve(response);
        },
            function (response) {
                deferred.reject(response);

            });
        return deferred.promise;
    }


    var _markCompOff = function (parms) {
        var deferred = $q.defer();
        resource.markCompOff(parms, function (response) {
            console.log(response);
            deferred.resolve(response);
        },
            function (response) {
                deferred.reject(response);

            });
        return deferred.promise;
    }

    var _getAppliedLeaves = function (parms) {
        var deferred = $q.defer();
        resource.getAppliedLeaves(parms, function (response) {
            deferred.resolve(response);
        },
            function (response) {
                deferred.reject(response);

            });
        return deferred.promise;
    }

    var _insertLeave = function (parms) {
        var deferred = $q.defer();
        resource.insertLeave(parms, function (response) {
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
    leaveFctryData.insertCompOff = _insertCompOff;
    leaveFctryData.markCompOff = _markCompOff;
    leaveFctryData.getAppliedLeaves = _getAppliedLeaves;
    leaveFctryData.insertLeave = _insertLeave;

    return leaveFctryData;
}]);