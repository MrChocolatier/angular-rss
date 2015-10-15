(function() {
    'use strict';

    angular
    .module('RSS.Settings.directive', [])
    .directive('rssSettings', rssSettingsDirective);

    //@ngInject
    function rssSettingsDirective() {
        return {
            scope: {},
            templateUrl: 'components/directive/rssSettings/rssSettings.html',
            controller: function($scope, $rootScope, dataShare) {
                $scope.settings = angular.copy(dataShare.settings);

                $scope.applySettings = function() {
                    dataShare.settings = angular.copy($scope.settings);
                    $rootScope.$broadcast('settings:changed', dataShare.settings);
                };
            }
        }
    }
})();
