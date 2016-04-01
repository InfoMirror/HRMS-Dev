hrBaseApp.factory('attendanceFctry', ['$http', '$resource', '$q', function ($http, $resource, $q) {
    //$httpProvider.defaults.headers.post['Content-Type'] = undefined;
    var attendanceFctry = {};
    var resource = $resource("http://mayank-pc:9095" + '/admin/:action', {
 //   var resource = $resource("http://localhost:9095" + '/account/:action', {
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