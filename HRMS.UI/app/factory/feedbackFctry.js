hrBaseApp.factory('feedbackFctry', ['$http', '$resource', '$q', function ($http, $resource, $q) {
    var feedbackFctryData = {};
    var resource = $resource('http://localhost:9095' + '/feedback/:action', {
        action: '@action',
    }, {
            'submitFeedback':{method: 'POST', params: {action: 'submitFeedback'}},
            'getFeedbacks':{method: 'POST', params: {action: 'getFeedbacks'}},
            'getConversationData':{method: 'POST', params: {action: 'getConversationData'}},
            'insertConversationData':{method: 'POST', params: {action: 'insertConversationData'}},
            'updateAnonymousFeedback':{method: 'POST', params: {action: 'updateAnonymousFeedback'}}
        });

    feedbackFctryData.api = resource;

    return feedbackFctryData;
}]);