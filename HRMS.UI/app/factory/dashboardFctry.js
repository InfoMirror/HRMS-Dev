hrBaseApp.factory('dashboardFctry', ['$http', '$resource', '$q', function ($http, $resource, $q) {

    var dashboardFctryData = {};
    alert('In Dashboard Factory');
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
    }

    dashboardFctryData.getBirthdays = _getBirthdays;
    return dashboardFctryData;
}]);