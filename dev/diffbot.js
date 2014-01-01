var DiffBot = function() {

    var _this = this;

    this.token = undefined;
    this.url = undefined;
    this.nameAPI = "analyze";
    this.versionAPI = 2;

    this.responce = undefined;

    this.opt = {
        "*": true,
        "url": true,
        "resolved_url": true,
        "icon": true,
        "meta": true,
        "querystring": true,
        "links": true,
        "type": true,
        "title": true,
        "text": true,
        "html": true,
        "numPages": true,
        "date": true,
        "author": true,
        "tags": true,
        "humanLanguage": true
        // and others
    };

    (function() {
        // Todo exeption with asking token
        if (!arguments[0].length) return;

        try { _this.token = arguments[0][0] }
        catch (e) {}

        try { _this.url = arguments[0][1] }
        catch (e) {}        

        console.log(_this);
     })(arguments);

    this.setOptions = function() {
        // Todo exeption with asking option object of single option
        if (!arguments.length || arguments.length > 2) return;

        if (typeof arguments[0] === "object" && !$.isEmptyObject(arguments[0]) && arguments.length === 1){
            $.extend(_this.opt, arguments[0]);
        }

        if (arguments.length === 2){
            var extObj = {}
            extObj[arguments[0]] = arguments[1]
            $.extend(_this.opt, extObj);
        }

        console.log(arguments);
        console.log(_this);
     };

    this.setAPI = function(name) {
        this.nameAPI = name;
     };

    this.setVersion = function(version) {
        this.versionAPI = version;
     };     

    this.setURL = function(url) {
        this.url = url;
     };          

    this._constructQuery = function() {
        // TODO: Might be more flexible. Here will must use options from this.opt
        // This is just for test
        var query = "http://api.diffbot.com/v{0}/{1}?token={2}&format=json&url={3}&callback=?"
        query = query.format([this.versionAPI, this.nameAPI, this.token, escape(this.url)]);

        console.log(query)
        return query;
     };

    this.getData = function(callback) {
        var query = this._constructQuery();

        $.getJSON(query, function(data){
            console.log(data, callback)
            _this.responce = data;
            callback && typeof callback === "function" ? callback() : undefined;
            return data;
        })
     };
 };
