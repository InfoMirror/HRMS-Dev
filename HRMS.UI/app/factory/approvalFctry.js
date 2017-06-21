hrBaseApp.factory('approvalFctry', ['$http', '$resource', '$q', function ($http, $resource, $q) {
    var approvalFctryData = {};
//var resource = $resource('http://mayank-pc:9095' + '/approval/:action', {
  var resource = $resource('http://192.168.0.202:9095' + '/approval/:action', {
        action: '@action',
    }, {
        'getFiledCompOff': {
            method: 'POST',
            params: {
                action: 'getFiledCompOff'
            }
        },
        'getFiledOD': {
            method: 'POST',
            params: {
                action: 'getFiledOD'
            }
        },
        'getAppliedLeaves': {
            method: 'POST',
            params: {
                action: 'getAppliedLeaves'
            }
        },
        'approveCompOff': {
            method: 'POST',
            params: {
                action: 'approveCompOff'
            }
        },
        'approveOD': {
            method: 'POST',
            params: {
                action: 'approveOD'
            }
        },
        'approveLeave': {
            method: 'POST',
            params: {
                action: 'approveLeave'
            }
        }

    });

    var _getFiledCompOff = function (parms) {
        var deffered = $q.defer();
        resource.getFiledCompOff(parms, function (response) {
            deffered.resolve(response)
        }, function (response) {
            deffered.reject(response);
        });
        return deffered.promise;
    };

    var _getFiledOD = function (parms) {
        var deffered = $q.defer();
        resource.getFiledOD(parms, function (response) {
            deffered.resolve(response)
        }, function (response) {
            deffered.reject(response);
        });
        return deffered.promise;
    };

    var _getAppliedLeaves = function (parms) {
        var deffered = $q.defer();
        resource.getAppliedLeaves(parms, function (response) {
            deffered.resolve(response)
        }, function (response) {
            deffered.reject(response);
        });
        return deffered.promise;
    };

    var _approveCompOff = function (parms) {
        var deffered = $q.defer();
        resource.approveCompOff(parms, function (response) {
            deffered.resolve(response)
        }, function (response) {
            deffered.reject(response);
        });
        return deffered.promise;
    };

    var _approveOD = function (parms) {
        var deffered = $q.defer();
        resource.approveOD(parms, function (response) {
            deffered.resolve(response)
        }, function (response) {
            deffered.reject(response);
        });
        return deffered.promise;
    };

    var _approveLeave = function (parms) {
        var deffered = $q.defer();
        resource.approveLeave(parms, function (response) {
            deffered.resolve(response)
        }, function (response) {
            deffered.reject(response);
        });
        return deffered.promise;
    };


    approvalFctryData.getFiledCompOff = _getFiledCompOff;
    approvalFctryData.getFiledOD = _getFiledOD;
    approvalFctryData.getAppliedLeaves = _getAppliedLeaves;
    approvalFctryData.approveCompOff = _approveCompOff;
    approvalFctryData.approveOD = _approveOD;
    approvalFctryData.approveLeave = _approveLeave;

    return approvalFctryData;
}]);