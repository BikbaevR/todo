
class Logger {
    constructor(loggerEnable) {
        this._loggerEnable = loggerEnable;
    }

    writeLog = (message) => {
        if (this._loggerEnable){
            console.log(`${message}`)
        }
    }
}

export const logger = new Logger(true)