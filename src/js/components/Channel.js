import {Transport} from "./Transport.js"

/**
 * * Represents a channel.
 * @constructor
 * @param {Object} channel
 * @param {String} channel.name - The custom channel
 * @param {String} channel.level - One of the following channels: [error, warning, notice, info, debug]
 * @param {Array} channel.message - Custom messages
 * @param {Array} channel.transports - Array of transports. Default: [{name: client}]. Possible names: [client, server].
 *
 */

export class Channel {

    constructor(channel) {
        this.channel = channel;
        this.channel.transports = this.channel.transports ?? [{name: "client"}];

        this.initTransport();
    }    

    initTransport() {

        this.channel.transports.forEach((transport) => {
            new Transport(this.channel, transport);
        });
    }
}