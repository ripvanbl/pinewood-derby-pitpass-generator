/*@ngInject*/
module.exports = function(pdpgService) {
    'use strict';

    return {
        replace: true,
        templateUrl: './app/img/img.html',
        link: postLink
    };

    //////////

    function postLink(scope, element) {
        scope.svc = pdpgService;

        // /////
        
        // function setImage() {
        //     $('.thumbnail', element)
        //         .empty()
        //         .append(pdpgService.image);
        // }
        
        // function watchImage() {
        //     return pdpgService.image;
        // }
    }

};