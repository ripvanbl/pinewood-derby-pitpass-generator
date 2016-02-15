var angular = require("angular");

/*@ngInject*/
module.exports = function($q) {
    'use strict';

    var _img;
    var svc = {
        get image() {
            return _img;
        },
        setImage: setImage
    };

    return svc;

    //////////

    function setImage(file) {
        var imageType = /^image\//,
            reader,
            defer = $q.defer();

        if (!file || !file.type) return $q.reject('No file');
        if (!imageType.test(file.type)) return $q.reject('Not an image');

        if (!_img) {
            _img = document.createElement("img");
        }

        _img.file = file;

        reader = new FileReader();
        reader.onload = (function(img) {
            return function(e) {
                img.src = e.target.result;
                defer.resolve();
            };
        })(_img);

        reader.readAsDataURL(file);
        
        return defer.promise;
    }
};