hrBaseApp.factory('appraisalFctry', ['$http', '$resource', '$q', function ($http, $resource, $q) {
    var appraisalFctryData = {};
    var resource = $resource('http://localhost:9095' + '/appraisal/:action', {
        action: '@action',
    }, {
            'addAppraisalInfo':{method: 'POST', params: {action: 'addAppraisalInfo'}},
            'updateAppraisalInfo':{method: 'POST', params: {action: 'updateAppraisalInfo'}},
            'submitAppraisal':{method: 'POST', params: {action: 'submitAppraisal'}},
            'getAppraisal':{method: 'POST', params: {action: 'getAppraisal'}},
            'getAppraisalQues':{method: 'POST', params: {action: 'getAppraisalQues'}},
        });

    appraisalFctryData.api = resource;

    return appraisalFctryData;
}]);