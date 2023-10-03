const colors = {
	fg: {
		rgb: (r = 255, g = 255, b = 255) => {
			return `\x1b[38;2;${r};${g};${b}m`;
		}
	},
	bg: {
		rgb: (r = 255, g = 255, b = 255) => {
			return `\x1b[48;2;${r};${g};${b}m`;
		}
	},
	rgb: (r = 255, g = 255, b = 255) => {
		return `\x1b[38;2;${r};${g};${b}m`;
	},

	clear: '\x1b[0m',
	italic: '\x1b[3m',
	underscore: '\x1b[4m',
	reverse: '\x1b[7m',
	strike: '\x1b[9m',
	noReverse: '\x1b[27m',

	fgBlack: '\x1b[30m',
	fgRed: '\x1b[31m',
	fgGreen: '\x1b[32m',
	fgYellow: '\x1b[33m',
	fgBlue: '\x1b[34m',
	fgMagenta: '\x1b[35m',
	fgCyan: '\x1b[36m',
	fgWhite: '\x1b[37m',
	fgGray: '\x1b[90m',

	bgBlack: '\x1b[40m',
	bgRed: '\x1b[41m',
	bgGreen: '\x1b[42m',
	bgYellow: '\x1b[43m',
	bgBlue: '\x1b[44m',
	bgMagenta: '\x1b[45m',
	bgCyan: '\x1b[46m',
	bgWhite: '\x1b[47m',
	bgGray: '\x1b[100m'
};

export default colors;