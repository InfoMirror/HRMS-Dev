hrBaseApp.factory('dashboardFctry', ['$http', '$resource', '$q', function ($http, $resource, $q) {

    var dashboardFctryData = {};

    var resource = $resource(hrmsSettingsVal.jsonUrl + "/dashboard/:action", {
        action: '@action',
    }, {
            'getBirthdays': {
                method: 'GET',
                params: {
                    action: 'getBirthdays'
                }
            },
            'getAnniversary': {
                method: 'GET',
                params: {
                    action: 'getAnniversary'
                }
            },
            'getHolidays': {
                method: 'GET',
                params: {
                    action: 'getHolidays'
                }
            },
            'getLeaveSummary': {
                method: 'POST',
                params: {
                    action: 'getLeaveSummary'
                },
                isArray: false
            },

            'getEmpProfileData': {
                method: 'POST',
                params: {
                    action: 'getEmpProfileData'
                }
            },

            'getHolidayCalendar': {
                method: 'GET',
                params: {
                    action: 'getHolidayCalendar'
                }
            }

        });

    var _getBirthdays = function () {
        var deffered = $q.defer();
        resource.getBirthdays(function (response) {
            deffered.resolve(response)
        }, function (response) {
            deffered.reject(response);
        });
        return deffered.promise;
    };

    var _getAnniversary = function () {
        var deferred = $q.defer();
        resource.getAnniversary(function (response) {
            console.log(response);
            deferred.resolve(response)
        }, function (response) {
            deferred.reject(response);

        });
        return deferred.promise;
    };


    var _getHolidays = function () {
        var deferred = $q.defer();
        resource.getHolidays(function (response) {
            deferred.resolve(response)
        }, function (response) {
            deferred.reject(response);

        });
        return deferred.promise;
    };

    var _getLeaveSummary = function (parms) {
        var deffered = $q.defer();
        resource.getLeaveSummary(parms, function (response) {
            deffered.resolve(response)
        }, function (response) {
            deffered.reject(response);
        });
        return deffered.promise;
    };
    var _getEmpProfileData = function (parms) {
        var deffered = $q.defer();
        resource.getEmpProfileData(parms, function (response) {
            deffered.resolve(response)
        }, function (response) {
            deffered.reject(response);
        });
        return deffered.promise;
    };

    var _getEmpProfileData = function (parms) {
        var deffered = $q.defer();
        resource.getEmpProfileData(parms, function (response) {
            deffered.resolve(response)
        }, function (response) {
            deffered.reject(response);
        });
        return deffered.promise;
    };

    var _getHolidayCalendar = function () {
        var deffered = $q.defer();
        resource.getHolidayCalendar(function (response) {
            deffered.resolve(response)
        }, function (response) {
            deffered.reject(response);
        });
        return deffered.promise;
    };


    dashboardFctryData.getBirthdays = _getBirthdays;

    dashboardFctryData.getAnniversary = _getAnniversary;

    dashboardFctryData.getHolidays = _getHolidays;

    dashboardFctryData.getLeaveSummary = _getLeaveSummary;

    dashboardFctryData.getHolidayCalendar = _getHolidayCalendar;

    dashboardFctryData.getEmpProfileData = _getEmpProfileData;

    return dashboardFctryData;

}]);