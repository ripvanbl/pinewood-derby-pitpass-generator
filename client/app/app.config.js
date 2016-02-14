/*@ngInject*/
module.exports = function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home', {
            url: '/',
            template: '<div data-pdpg-home-page></div>'
        });
};