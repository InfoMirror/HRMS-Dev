hrBaseApp.factory('dashboardFctry', ['$http', '$resource', '$q', function ($http, $resource, $q) {

    var dashboardFctryData = {};
    //alert('In Dashboard Factory');
    /*var resource = $resource("http://localhost:9095" + "/dashboard/:action", {
        action: '@action'
    }, {
        'getBirthdays': {
            method: 'GET',
            params: 'getBirthdays',
            isArray: true
        }
    });
    */
    var resource = $resource("http://localhost:9095" + "/dashboard/:action", {
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
    }


    dashboardFctryData.getBirthdays = _getBirthdays;


    dashboardFctryData.getAnniversary = _getAnniversary;


    dashboardFctryData.getHolidays = _getHolidays;
    return dashboardFctryData;


            }]);