import {Logger} from "./components/Logger.js";
import {channels} from "./data/index.js";

channels.forEach((channel) => {
    try {
        new Logger(channel);
    }
    catch(error) {
        console.error(error);
    }
    
});

