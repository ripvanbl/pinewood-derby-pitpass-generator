/*@ngInject*/
module.exports = function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home', {
            url: '/',
            template: '<div data-pdpg-home-page></div>'
        })
        .state('img', {
            url: '/img',
            template: '<div data-pdpg-img-picker></div>'
        })
        .state('theme', {
            url: '/theme',
            template: '<div data-pdpg-theme-picker></div>'
        });
};