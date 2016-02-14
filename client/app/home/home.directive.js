module.exports = function() {
    'use strict';
    
    var el;

    return {
        templateUrl: './app/home/home.html',
        link: postLink
    };

    function postLink(scope, element) {
        el = element;

        $('input:first', el).on('change', handleFiles);
    }

    function handleFiles() {
        var files = this.files;
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var imageType = /^image\//;

            if (!imageType.test(file.type)) {
                continue;
            }

            var img = document.createElement("img");
            img.classList.add("obj");
            img.file = file;
            $('.thumbnail', el)
                .empty()
                .append(img);

            var reader = new FileReader();
            reader.onload = (function(aImg) {
                return function(e) {
                    aImg.src = e.target.result;
                };
            })(img);
            reader.readAsDataURL(file);
        }
    }
};