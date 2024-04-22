(function () {
    'use strict';

    var section = document.getElementsByTagName("section");
    var sections = {};
    var i = 0;

    Array.prototype.forEach.call(section, function (e) {
        sections[e.id] = e.offsetTop;
    });

    window.onscroll = function () {
        var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

        for (i in sections) {
            if (sections[i] <= scrollPosition) {
                document.querySelector('.selected_anchor').setAttribute('class', ' ');
                document.querySelector('a[href*=' + i + ']').setAttribute('class', 'selected_anchor');
            }
        }
    };
})();
