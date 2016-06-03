hrBaseApp.factory('commonCtrl', ['$modal', function ($modal) {

    //#region === Initialize ===
    var factory = {};

    factory.confirm = function (title, message, callback, size, hideCancel, isWarning) {
        if (size == undefined || size == '') {
            size = 'md';
        }
        if (hideCancel == undefined || hideCancel == '') {
            hideCancel = true;
        }
        if (isWarning == undefined || isWarning == '') {
            isWarning = false;
        }
        var modalInstance = $modal.open({
            templateUrl: '/app/shared/confirmationMdl.html',
            controller: confirmationMdl,
            size: size,
            resolve: {
                title: function () { return title; },
                message: function () { return message; },
                hideCancel: function () { return hideCancel; },
                isWarning: function () { return isWarning; }
            }

        });

        modalInstance.result.then(function (response) {
            callback();
        }, function (response) {

        });
    }

    return factory;

    //#endregion
}]);