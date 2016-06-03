hrBaseApp.factory('feedbackFctry', ['$http', '$resource', '$q', function ($http, $resource, $q) {
    var feedbackFctryData = {};
    var resource = $resource('http://localhost:9095' + '/feedback/:action', {
        action: '@action',
    }, {
            'submitFeedback':{method: 'POST', params: {action: 'submitFeedback'}}
        });

    feedbackFctryData.api = resource;

    return feedbackFctryData;
}]);