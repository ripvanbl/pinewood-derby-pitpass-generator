/*@ngInject*/
module.exports = function($rootScope, $window) {
    $rootScope.$on('$stateChangeStart', onStateChangeStart);

    /////////
    
    function onStateChangeStart() {
        $window.scrollTo(0, 0);
    }
};