/*TMODJS:{}*/
!function() {
    function template(filename, content) {
        return (/string|function/.test(typeof content) ? compile : renderFile)(filename, content);
    }
    function toString(value, type) {
        return "string" != typeof value && (type = typeof value, "number" === type ? value += "" : value = "function" === type ? toString(value.call(value)) : ""), 
        value;
    }
    function escapeFn(s) {
        return escapeMap[s];
    }
    function escapeHTML(content) {
        return toString(content).replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
    }
    function each(data, callback) {
        if (isArray(data)) for (var i = 0, len = data.length; len > i; i++) callback.call(data, data[i], i, data); else for (i in data) callback.call(data, data[i], i);
    }
    function resolve(from, to) {
        var DOUBLE_DOT_RE = /(\/)[^/]+\1\.\.\1/, dirname = ("./" + from).replace(/[^/]+$/, ""), filename = dirname + to;
        for (filename = filename.replace(/\/\.\//g, "/"); filename.match(DOUBLE_DOT_RE); ) filename = filename.replace(DOUBLE_DOT_RE, "/");
        return filename;
    }
    function renderFile(filename, data) {
        var fn = template.get(filename) || showDebugInfo({
            filename: filename,
            name: "Render Error",
            message: "Template not found"
        });
        return data ? fn(data) : fn;
    }
    function compile(filename, fn) {
        if ("string" == typeof fn) {
            var string = fn;
            fn = function() {
                return new String(string);
            };
        }
        var render = cache[filename] = function(data) {
            try {
                return new fn(data, filename) + "";
            } catch (e) {
                return showDebugInfo(e)();
            }
        };
        return render.prototype = fn.prototype = utils, render.toString = function() {
            return fn + "";
        }, render;
    }
    function showDebugInfo(e) {
        var type = "{Template Error}", message = e.stack || "";
        if (message) message = message.split("\n").slice(0, 2).join("\n"); else for (var name in e) message += "<" + name + ">\n" + e[name] + "\n\n";
        return function() {
            return "object" == typeof console && console.error(type + "\n\n" + message), type;
        };
    }
    var cache = template.cache = {}, String = this.String, escapeMap = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    }, isArray = Array.isArray || function(obj) {
        return "[object Array]" === {}.toString.call(obj);
    }, utils = template.utils = {
        $helpers: {},
        $include: function(filename, data, from) {
            return filename = resolve(from, filename), renderFile(filename, data);
        },
        $string: toString,
        $escape: escapeHTML,
        $each: each
    }, helpers = template.helpers = utils.$helpers;
    template.get = function(filename) {
        return cache[filename.replace(/^\.\//, "")];
    }, template.helper = function(name, helper) {
        helpers[name] = helper;
    }, define(function() {
        return template;
    }), template.helper("changeName", function(content) {
        var names = {
            sa: "杨瑞",
            yangzq: "杨钟淇",
            yanjuan: "严娟",
            xucheng: "徐成",
            liuliang: "刘亮",
            lipei: "李佩",
            fanwei: "范为",
            nijc: "倪建春",
            wangdx: "王东新",
            huangxx: "黄行星",
            zhanghx: "张红香",
            wangwc: "王维成",
            wangyy: "李国涛"
        };
        return names[content];
    }), template.helper("getUrl", function(content) {
        return __url__data[content];
    }), template.helper("imgPath", function(content) {
        return content ? R.uri.assets + content : R.uri.assets;
    }), template.helper("cut", function(content, num) {
        var len;
        return "string" != typeof content ? content : (len = content.length, num >= len ? content : content.substring(0, num) + "...");
    }), template.helper("rnd", function(content, m, n) {
        return parseInt(Math.random() * (m + 1 - n) + n);
    }), template.helper("changeIndex", function(content) {
        var data = {
            "0": "一",
            "1": "二",
            "2": "三",
            "3": "四",
            "4": "五",
            "5": "六"
        };
        return data[content];
    }), template.helper("cutDomain", function(content) {
        content.length;
        var re = /http\:\S+\d+\//gi, org = content.match(re)[0];
        return org;
    }), template.helper("cutDomainName", function(content) {
        content.length;
        var re = /http\:\S+\d+\//gi, org = content.match(re)[0], len = org.length, target = content.substring(len);
        return target = target.replace(/\.html/, "");
    }), template.helper("nowTime", function() {
        function toDouble(num) {
            return 10 > num ? "0" + num : num;
        }
        var oDate, y, m, d, h, m, s, time;
        return oDate = new Date(), y = oDate.getFullYear(), month = oDate.getMonth() + 1, 
        d = oDate.getDate(), h = oDate.getHours(), m = oDate.getMinutes(), s = oDate.getSeconds(), 
        time = y + "-" + toDouble(month) + "-" + toDouble(d);
    }), template.helper("toDouble", function(content) {
        return 10 > content ? "0" + content : content;
    });
}();