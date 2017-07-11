hrBaseApp.factory('profileFctry', ['$http', '$resource', '$q', function ($http, $resource, $q) {
    var profileFctryData = {};

    var resource = $resource(hrmsSettingsVal.jsonUrl + '/profile/:action', {
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
            'getDeactivatedEmployees': {
                method: 'GET',
                params: {
                    action: 'getDeactivatedEmployees'
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
            'getReportingHeadByEmpId': {        
                method: 'POST',
                params: {
                    action: 'getReportingHeadByEmpId'
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
            },
            'updateEmployeeIsActive': {
                method: 'POST',
                params: {
                    action: 'updateEmployeeIsActive'
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

    var _getDeactivatedEmployees = function () {
        var deffered = $q.defer();
        resource.getDeactivatedEmployees(function (response) {
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
    var _getReportingHeadByEmpId = function (parms) {
        var deffered = $q.defer();
        resource.getReportingHeadByEmpId(parms, function (response) {
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

    var _updateEmployeeIsActive = function (parms) {
        var deffered = $q.defer();
        resource.updateEmployeeIsActive(parms, function (response) {
            deffered.resolve(response)
        }, function (response) {
            deffered.reject(response);
        });
        return deffered.promise;
    };


    profileFctryData.getAllRelations = _getAllRelations;

    profileFctryData.getAllEmployees = _getAllEmployees;

    profileFctryData.getDeactivatedEmployees = _getDeactivatedEmployees;

    profileFctryData.getMasterValue = _getMasterValues;

    profileFctryData.updateEmpDetails = _updateEmpDetails;

    profileFctryData.getEmpDetails = _getEmpDetails;
    
    profileFctryData.getReportingHeadByEmpId = _getReportingHeadByEmpId;

    profileFctryData.getApprovalReqEmp = _getApprovalReqEmp;

    profileFctryData.isEmpIdExist = _isEmpIdExist;

    profileFctryData.updateEmpId = _updateEmpId;

    profileFctryData.updateEmployeeIsActive = _updateEmployeeIsActive;

    return profileFctryData;
}]);