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
		const month = d.getMonth().toString().padStart(2, 				"0"),
			  day = d.getDay().toString().padStart(2, 					"0"),
			  hours = d.getHours().toString().padStart(2, 				"0"),
			  minutes = d.getMinutes().toString().padStart(2, 			"0"),
			  seconds = d.getSeconds().toString().padStart(2, 			"0"),
			  milliseconds = d.getMilliseconds().toString().padStart(3, "0");

        const timestamp = `[${d.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}]`;
        console.log(`${colors.fgGray + timestamp} ${colors.reverse + LevelsColors[level]}[ ${Levels[level]} ]${colors.noReverse} [${this.#title}] ${colors.clear + message}`);
    }
    Debug (message) { this.Log(0, message); }
    Info (message) { this.Log(1, message); }
    Warn (message) { this.Log(2, message); }
    Error (message) { this.Log(3, message); }
}