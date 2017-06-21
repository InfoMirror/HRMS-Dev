hrBaseApp.factory('appraisalFctry', ['$http', '$resource', '$q', function ($http, $resource, $q) {
    var appraisalFctryData = {};
    var resource = $resource('http://192.168.0.202:9095' + '/appraisal/:action', {
        action: '@action',
    }, {
             'addAppraisalInfo':{method: 'POST', params: {action: 'addAppraisalInfo'}},
             'updateAppraisalInfo':{method: 'POST', params: {action: 'updateAppraisalInfo'}},
             'submitAppraisalForm':{method: 'POST', params: {action: 'submitAppraisalForm'}},
             'submitAppraisalRating':{method: 'POST', params: {action: 'submitAppraisalRating'}},
             'getAppraisal':{method: 'POST', params: {action: 'getAppraisal'}},
             'getAppraisalQues':{method: 'POST', params: {action: 'getAppraisalQues'}},
             'getCommentAndRating':{method: 'POST', params: {action: 'getCommentAndRating'}},
             'getAllPendingAppraisals':{method: 'POST', params: {action: 'getAllPendingAppraisals'}},
             'getAllCommentsAndRatings':{method: 'POST', params: {action: 'getAllCommentsAndRatings'}},
             'getAppraisalStatus':{method: 'POST', params: {action: 'getAppraisalStatus'}},
             'getEmpProfile':{method: 'POST', params: {action: 'getEmpProfile'}},
             'getEmployeeAppraisalStatus':{method: 'POST', params: {action: 'getEmployeeAppraisalStatus'}},
             'updateAppraisalStatus':{method: 'POST', params: {action: 'updateAppraisalStatus'}},
             'getArchievedAppraisals':{method: 'POST', params: {action: 'getArchievedAppraisals'}},
             'addAppraisalQuestion':{method: 'POST', params: {action: 'addAppraisalQuestion'}},
             'updateQuesList':{method: 'POST', params: {action: 'updateQuesList'}}
             
        });

    appraisalFctryData.api = resource;

    return appraisalFctryData;
}]);