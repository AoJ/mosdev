var namespace = function(n) {
    var ns = n.split(".");

    var level = window;
    for (t=0;t<ns.length;t++) {
        var name = ns[t];
        level[name] = level[name] || {};
        level = level[name];
    };
};

namespace("mos");