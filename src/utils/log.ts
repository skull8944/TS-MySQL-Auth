import logger from "pino";
import pretty from "pino-pretty";
import dayjs from "dayjs";

const stream = pretty({
	colorize: true,
	ignore: "pid, hostname",
	timestampKey: 'time',
	customPrettifiers: {
		"time": () => dayjs().format("YYYY/MM/DD HH:mm:ss")
	}
});

const log = logger(stream);

export default log;