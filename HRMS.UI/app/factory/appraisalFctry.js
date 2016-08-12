hrBaseApp.factory('appraisalFctry', ['$http', '$resource', '$q', function ($http, $resource, $q) {
    var appraisalFctryData = {};
    var resource = $resource('http://localhost:9095' + '/appraisal/:action', {
        action: '@action',
    }, {
            'addAppraisalInfo':{method: 'POST', params: {action: 'addAppraisalInfo'}},
            'updateAppraisalInfo':{method: 'POST', params: {action: 'updateAppraisalInfo'}},
            'getAppraisal':{method: 'POST', params: {action: 'getAppraisal'}}
        });

    appraisalFctryData.api = resource;

    return appraisalFctryData;
}]);