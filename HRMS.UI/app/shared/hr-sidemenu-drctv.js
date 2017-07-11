hrBaseApp.directive('hrSidemenuDrctv', [
    function () {
        'use strict';

        var p = {};

        p.transclude = true;
        p.replace = true;
        p.restrict = 'E';
        p.templateUrl = '/app/shared/hr-sidemenu-drctv.html';

        p.link = function ($scope, $state, element, attributes, controller) {
            (function () {
                try {
                    ace.settings.check('sidebar', 'fixed');
                } catch (e) {

                }

                try {
                    ace.settings.check('sidebar', 'collapsed');
                } catch (e) { }

                //App.baseUi.enableSidebar();
                //App.baseUi.sidebarTooltips();

            })();

            //$scope.setMenuVisibility = function (pageLocation) {
            //    // return seAuthFactory.authorize($state.get(pageLocation).access);
            //}

            //$scope.setMenuActive = function (pageLocation) {
            //    var page = $state.is(pageLocation);
            //    if (page) {
            //        return 'active';
            //    } else {
            //        return '';
            //    }
            //}

            //$scope.setMenuHeaderActive = function (sectionLocation) {

            //    var page = $state.includes(sectionLocation);
            //    if (page) {
            //        return 'active open';
            //    } else {
            //        return '';
            //    }
            //}

            //$scope.setMenuHeaderInactive = function (sectionLocation) {

            //    var page = $state.includes(sectionLocation);
            //    if (page) {
            //        return 'nav-hide';
            //    } else {
            //        return '';
            //    }
            //}

            //$scope.setMenuHeaderInactiveStyle = function (sectionLocation) {

            //    var page = $state.includes(sectionLocation);
            //    if (page) {
            //        return '';
            //    } else {
            //        return { 'display': 'none' };
            //    }
            //}

            $("#sidebar").click(function () {
                var btn = $("#menu-toggler");
                var sidebar = $(btn.attr('data-target'));
                if (sidebar.length == 0) return;

                if (btn.hasClass('display')) {
                    sidebar.toggleClass('display');
                    btn.toggleClass('display');
                }
            });
        }




        return p;
    }
])