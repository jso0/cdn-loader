var loaderUtils = require("loader-utils");

var defaultOpt = {
	type: 'js',
	alias:'',
	ext: '.min',
	prefix: '',
	frm: 'cdn-loader',
	show:false
}

module.exports = function(source) {
	var query = loaderUtils.parseQuery(this.query);
	if (this.query && this.query.indexOf('@') > 0) {
		var css = !!query.css
		var regRule = /^\?\w+@[\w\.\,]+$/
		var tmp = this.query.split(/&|\,/)
		var lib = tmp[0].replace(/\!|\?/, '').split('@')

		if (regRule.test(tmp[0])) {
			var cdn = extend({}, defaultOpt, {
				"name": lib[0],
				"type": css ? 'css' : 'js',
				"version": lib[1]
			}, query)
			var link_args = JSON.stringify(cdn)
			var windows = "module.exports = window."+ cdn.name +";"
			if (cdn.type == "css") {
				windows = ''
			}
			if (cdn.show) {
				return "( " + link_args + ")//\n" + windows
			} else {
				return "/*" + link_args + "*/\n" + windows
			}
		}
		return '/* parameter invalid [name@version] */'
	}
	return '/* parameter invalid */'
}

function extend() {
    var args = Array.prototype.slice.call(arguments)
	var target = args.shift() || {}
	var source = args.shift()
	var deep = args.length
    for (var p in source) {
        if (source.hasOwnProperty(p)) {
            target[p] = source[p]
        }
    }
    args.unshift(target)

    if (deep > 0) {
        return extend.apply(null, args)
    } else {
    	return target
    }
}