import {Logger} from "./logger/logger.module.js";

const log = new Logger();

log.run()
    .then(response => {
        console.log(response);
    }).catch(console.log);
