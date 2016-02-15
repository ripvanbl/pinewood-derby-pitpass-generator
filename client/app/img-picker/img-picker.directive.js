/*@ngInject*/
module.exports = function($log, pdpgService) {
    'use strict';

    return {
        templateUrl: './app/img-picker/img-picker.html',
        link: postLink
    };

    function postLink(scope, element) {
        scope.hasImg = hasImage();

        $('input:first', element).on('change', handleFile);

        /////

        function handleFile() {
            var files = this.files;

            if (!files || !files.length) return;

            pdpgService.setImage(files[0])
                .catch(function(err) {
                    $log.warn(err);
                })
                .finally(function(){
                    scope.hasImg = hasImage();
                });
        }
        
        function hasImage() {
            return pdpgService.image && pdpgService.image.src ? true : false;
        }
    }


};