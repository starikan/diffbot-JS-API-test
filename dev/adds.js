String.prototype.format = String.prototype.f = function(options) {

    options = options ? options : [];
    if (typeof options != "object") options = [options];

    var s = this,
        i = options.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), options[i]);
    }        

    return s;
 };