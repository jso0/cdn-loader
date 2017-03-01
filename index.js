var loaderUtils = require("loader-utils");

var defaultOpt = {
	type: 'js',
	alias:'',
	ext: '.min',
	prefix: '',
	frm: 'cdn-loader',
	show:false
}

var libMap = {
	'jquery-cookie': {
		'pfx': 'jquery-cookie',
		'type': 'js',
		'file': 'jquery.cookie',
		'defaultVersion': '1.4.1',
		'exports': '',
		'show': false
	},
	'$': {
		'pfx': 'jquery',
		'type': 'js',
		'file': 'jquery',
		'defaultVersion': '3.1.1',
		'exports': 'jQuery',
		'show': true
	},
	'vue': {
		'pfx': 'vue',
		'type': 'js',
		'file': 'vue',
		'defaultVersion': '2.1.10',
		'exports': 'Vue',
		'show': true
	},
	'normalize': {
		'pfx': 'normalize',
		'type': 'css',
		'file': 'normalize',
		'defaultVersion': '5.0.0',
		'exports': '',
		'show': false
	},
	'animate.css': {
		'pfx': 'animate.css',
		'type': 'css',
		'file': 'animate',
		'defaultVersion': '3.5.2',
		'exports': '',
		'show': false
	},
	'loader_error': {
		'pfx': '',
		'type': 'js',
		'file': '',
		'defaultVersion': '',
		'exports': '',
		'show': false
	}
}


module.exports = function(source) {
	var query = loaderUtils.parseQuery(this.query);
	if (this.query) {
		var regRule = /^\?.*@?$/
		var tmp = this.query.split(/&|\,/)
		var lib = tmp[0].replace(/\!|\?/, '').split('@')
		var currentLib = libMap[lib[0]] || libMap['loader_error']
		var is_css =  currentLib.type ==  'css' || !!query.css

		if (regRule.test(tmp[0])) {
			var cdn = extend({}, defaultOpt, {
				"name": currentLib.pfx,
				"exports": currentLib.exports,
				"type": is_css ? 'css' : 'js',
				"version": lib[1] || currentLib.defaultVersion,
				"show": currentLib.show,
				"file": query.file || currentLib.file
			}, query)
			var link_args = JSON.stringify(cdn)
			var windows = "module.exports = window."+ cdn.exports +";"
			if (is_css) {
				windows = ''
			}
			if (cdn.show) {
				return "( " + link_args + ")//\n" + windows
			} else {
				return "/*" + link_args + "*/\n"
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