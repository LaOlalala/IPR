import {Channel} from "./Channel.js"

/**
 * * Represents a logger.
 * @constructor
 * @param {Object} channel
 * @param {String} channel.name - The custom channel.
 * @param {String} channel.level - One of the following channels: [error, warning, notice, info, debug].
 * @param {String} channel.message - The custom message.
 * @param {Array} channel.transports - Array of transports. Default: [{name: client}]. Possible names: [client, server].
 *
 */
export class Logger {

    constructor(channel) {
        this.channel = channel;
        this.initChannel();
    }    

    initChannel() {
        new Channel(this.channel);
    }

}