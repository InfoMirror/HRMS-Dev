//This date directive is to combine two directives (datepicker from ui-bootstrap and custom dateonly directive into a single one)
hrBaseApp.directive('olcaDate', [function () {
    'use strict';
    var p = {};

    p.replace = true;
    p.restrict = 'E';
    p.templateUrl = '/app/shared/drctDate.html';

    p.scope = {
        inputValue: '=',
        dateOptions: '=',
        //min is used for the calendar date-disabled functionality
        min: '=minDate',
        //minAttr is bound as @ as we want to get the name of the property min date is bound to. We will implement a watch on this in in date-only directive in case the min date changes
        minAttr: '@minDate',
        max: '=maxDate',
        maxAttr: '@maxDate',
        inputName: '@',
        dateChanged: '&',
        dateClick: "&",
        dateRequired: '=',
        dateDisabled: '&',showCal:"&"
    };

    p.link = function ($scope, element, attr) {
        $scope.opened = false;

        $scope.open = function ($event) {
            $scope.dateClick();
            //we have called the javascript setTimeOut as it does not call the $apply() automatically
            //thus we do not have to worry about stopPropagation which is needed to avoid calendar from hiding automatically.
            //i. e. first the click event propagates to make sure all the open calendars hide automatically, and only after that 
            //our changes to show the calendar are applied
            setTimeout(function () {
                $scope.opened = true;
                $scope.$apply();
            }, 2);

        }
    }

    return p;


}]);

// This is the date-only directive. (These things could not be done through a watch as watch only works on model changes and not view changes.) It takes care of following things:-
//1. It allows only intergers and forward slashes(/) to be entered in a texbox
//2. It does not allow user to enter less than 01 or more than 12 for month, less than 01 or more than 31 for day and less than 1901 or more than 9999 for year value
//3. It validates the date in mm/dd/yyyy format using moment.js and returns undefined in case of invalid date. This automatically sets the ng-valid-date property of control
//4. It validates for min/max date. (though the datepicker directive checks for the validation but it does not set the error against the field but sets it against the form.
//   That created problems in displaying the right error message in case there were multiple date fields
//5. It fixes the date format to add zeros to day and month if necessary on blur
//Note:- We can not use isolated scope for this directive as the date-picker directive is already using one. Angularjs does not allow multiple directives with isolated scopes 
//on a single control. For min/max validations, we needed scope to get the current min/max values as they can change. Since that could not be done, we used minAttr/maxAttr and
//we put a watch over that to check for value changes
hrBaseApp.directive('dateOnly', ['$window', function ($window) {

    return {
        require: 'ngModel',
        restrict: 'A',

        link: function ($scope, element, attrs, modelCtrl) {

            element.on('click', function () {

                if (modelCtrl.$viewValue == undefined)
                    return;

                if (!$window.getSelection().toString()) {
                    // Required for mobile Safari
                    var caret = this.selectionStart;

                    var startSlash = modelCtrl.$viewValue.substring(0, caret).lastIndexOf('/');
                    if (startSlash >= caret || startSlash == -1)
                        startSlash = 0;
                    else
                        startSlash++;

                    var endSlash = modelCtrl.$viewValue.indexOf('/', caret);

                    if (endSlash == -1) {
                        endSlash = this.value.length;
                    }

                    this.setSelectionRange(startSlash, endSlash);
                }
            });

            element.on('blur', function () {
                if (modelCtrl.$viewValue == undefined || modelCtrl.$viewValue == '') return;
                var transformedInput = "";
                var dateParts = modelCtrl.$viewValue.split("/");
                var month = "";
                var day = "";
                var year = "";
                if (dateParts.length > 0) {
                    month = dateParts[0];

                    if (month.length == 1) {
                        month = "0" + month;
                    }

                    transformedInput += month;
                }

                if (dateParts.length > 1) {

                    day = dateParts[1];

                    if (day.length == 1) {
                        day = "0" + day;
                    }

                    transformedInput += "/" + day;


                }

                if (dateParts.length > 2) {
                    year = dateParts[2];
                    transformedInput += "/" + year;
                }

                if (transformedInput != modelCtrl.$viewValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }

            });

            var self = this;
            modelCtrl.minDate = $scope.min;
            modelCtrl.maxDate = $scope.max;

            if (!angular.isUndefined($scope.minAttr) && $scope.minAttr != '') {

                $scope.$parent.$watch($scope.minAttr, function (value) {
                    modelCtrl.minDate = value ? new Date(value) : undefined;
                    modelCtrl.$validate();
                });

                modelCtrl.$validators.min =
                    function (modelValue, viewValue) {


                        if (angular.isUndefined(modelCtrl.minDate) || viewValue == '' || viewValue == undefined)
                            return true;

                        var minDate = angular.isDate(modelCtrl.minDate) ? modelCtrl.minDate : new Date(modelCtrl.minDate);
                        return new Date(modelValue) >= minDate;
                    }

            }



            if (!angular.isUndefined($scope.maxAttr) && $scope.maxAttr != '') {
                $scope.$parent.$watch($scope.maxAttr, function (value) {
                    modelCtrl.maxDate = value ? new Date(value) : undefined;
                    modelCtrl.$validate();
                });

                modelCtrl.$validators.max =
                    function (modelValue, viewValue) {

                        if (angular.isUndefined(modelCtrl.maxDate) || viewValue == '' || viewValue == undefined)
                            return true;

                        var maxDate = angular.isDate(modelCtrl.maxDate) ? modelCtrl.maxDate : new Date(modelCtrl.maxDate);
                        return new Date(modelValue) <= maxDate;
                    }
            }

            //remove the parser added by the bootstrap-ui date directive
            modelCtrl.$parsers.pop();
            modelCtrl.$parsers.push(function (viewValue) {

                modelCtrl.$setValidity('min', true);
                modelCtrl.$setValidity('date', true);

                if (viewValue == undefined || viewValue == '') return '';
                var transformedInput = '';
                var dateParts = viewValue.split("/");
                var month = "";
                var day = "";
                var year = "";
                if (dateParts.length > 0) {
                    month = dateParts[0].replace(/[^0-9]/g, '');
                    if (month.length > 2) {
                        month = month.substring(0, 2);
                    }
                    if (month.length == 2 && parseInt(month) > 12) {
                        month = "12";
                    }
                    if (month == "00") {
                        month = "01";
                    }

                    transformedInput += month;
                }

                if (dateParts.length > 1) {

                    day = dateParts[1].replace(/[^0-9]/g, '');
                    if (day.length > 2) {
                        day = day.substring(0, 2);
                    }
                    if (day.length == 2 && parseInt(day) > 31) {
                        day = "31";
                    }
                    if (day == "00") {
                        day = "01";
                    }

                    transformedInput += "/" + day;
                }


                if (dateParts.length > 2) {
                    year = dateParts[2].replace(/[^0-9]/g, '');
                    if (year.length > 4) {
                        year = year.substring(0, 4);
                    }
                    if (year.length == 4 && parseInt(year) < 1901) {
                        year = "1901";
                    }
                    transformedInput += "/" + year;
                }

                if (transformedInput != viewValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }
                if (moment(transformedInput, 'MM/DD/YYYY').isValid() && year.length == 4 && month.length > 0 && day.length > 0) {
                    modelCtrl.$modelValue = new Date(Date.UTC(year, parseInt(month) - 1, day));
                    return new Date(Date.UTC(year, parseInt(month) - 1, day));
                } else {
                    return undefined;
                }
            });

        }
    };
}]);