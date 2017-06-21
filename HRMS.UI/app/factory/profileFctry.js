hrBaseApp.factory('profileFctry', ['$http', '$resource', '$q', function ($http, $resource, $q) {
    var profileFctryData = {};
//var resource = $resource("http://mayank-pc:9095" + "/profile/:action", {
    var resource = $resource('http://192.168.0.202:9095' + '/profile/:action', {
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
        },
        'getEmpDetails': {
            method: 'POST',
            params: {
                action: 'getEmpDetails'
            }
        },
        'getApprovalReqEmp': {
            method: 'POST',
            params: {
                action: 'getApprovalReqEmp'
            }
        },
        'IsEmpIdExist': {
            method: 'POST',
            params: {
                action: 'IsEmpIdExist'
            }
        },
        'updateEmpId': {
            method: 'POST',
            params: {
                action: 'updateEmpId'
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

    var _getEmpDetails = function (parms) {
        var deffered = $q.defer();
        resource.getEmpDetails(parms, function (response) {
            deffered.resolve(response)
        }, function (response) {
            deffered.reject(response);
        });
        return deffered.promise;
    };

    var _getApprovalReqEmp = function (parms) {
        var deffered = $q.defer();
        resource.getApprovalReqEmp(parms, function (response) {
            deffered.resolve(response)
        }, function (response) {
            deffered.reject(response);
        });
        return deffered.promise;
    };
    
    var _isEmpIdExist = function (parms) {
        var deffered = $q.defer();
        resource.IsEmpIdExist(parms, function (response) {
            deffered.resolve(response)
        }, function (response) {
            deffered.reject(response);
        });
        return deffered.promise;
    };
    
    var _updateEmpId = function (parms) {
        var deffered = $q.defer();
        resource.updateEmpId(parms, function (response) {
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

    profileFctryData.getEmpDetails = _getEmpDetails;

    profileFctryData.getApprovalReqEmp = _getApprovalReqEmp;
    
    profileFctryData.isEmpIdExist = _isEmpIdExist;
    
    profileFctryData.updateEmpId = _updateEmpId;

    return profileFctryData;
}]);