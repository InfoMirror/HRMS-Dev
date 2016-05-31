hrBaseApp.factory('feedbackFctry', ['$http', '$resource', '$q', function ($http, $resource, $q) {
    var feedbackFctryData = {};
//var resource = $resource("http://mayank-pc:9095" + "/profile/:action", {
    var resource = $resource('http://localhost:9095' + '/feedback/:action', {
        action: '@action',
    }, {
        'sendEmail': {
            method: 'POST',
            params: {
                action: 'sendMail'
            }
        }
    });


    var _sendEmail = function (parms) {
        var deffered = $q.defer();
        resource.sendEmail(parms, function (response) {
            deffered.resolve(response)
        }, function (response) {
            deffered.reject(response);
        });
        return deffered.promise;
    };


    feedbackFctryData.sendEmail = _sendEmail;

    return feedbackFctryData;
}]);