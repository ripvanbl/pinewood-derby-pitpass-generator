(function(angular) {
    angular.module('app')
        .config(
            ['$stateProvider', '$urlRouterProvider',
                function($stateProvider, $urlRouterProvider) {
                    $urlRouterProvider.otherwise('/');
                    $stateProvider
                        .state('home', {
                            url: '/',
                            template: '<div data-pdpg-home-page=""></div>'
                    })
                }
            ]);
})(window.angular);