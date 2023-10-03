import colors from './colors.js';

const Levels = [
	"Debug",
	"Info ",
	"Warn ",
	"Error"
];
const LevelsColors = [
	colors.fgBlue,
	colors.fgCyan,
	colors.fgYellow,
	colors.fgRed
]
export class Logger {
	#title = "";

	constructor (title) {
		this.#title = title;
	}

    Log (level, message) {
        const d = new Date();
        const timestamp = `[${d.getFullYear()}-${d.getMonth()}-${d.getDay()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}]`;
        console.log(`${colors.fgGray + timestamp} ${colors.reverse + LevelsColors[level]}[ ${Levels[level]} ]${colors.noReverse} [${this.#title}] ${colors.clear + message}`);
    }
    Debug (message) { this.Log(0, message); }
    Info (message) { this.Log(1, message); }
    Warn (message) { this.Log(2, message); }
    Error (message) { this.Log(3, message); }
};