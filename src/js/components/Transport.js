import {level, url} from "../constants/index.js"

/**
 * * Represents a transport.
 * @constructor
 * @param {Object} channel
 * @param {String} channel.name - The custom channel
 * @param {String} channel.level - One of the following levels: [error, warning, notice, info, debug]
 * @param {Array} channel.message - Custom messages
 * @param {String} transport.name - The name of the transport
 * @param {Array} transport.color - Colors of the message (optional)
 * @param {String} transport.level - The level for this transport (optional)
 *
 */
export class Transport {

    constructor(channel, transport) {
        this.channel = channel;        
        this.transport = transport;
        this.level = this.transport?.level ?? this.channel.level; 
        this.levelName = Object.entries(level).filter((item) => this.level === item[1])[0][0];    

        if(this.transport?.level && (this.transport.level < this.channel.level)) {            
            throw "Уровень транспорта не может быть выше уровня канала. Сообщение не логгируется.";
        }

        if(!this.channel.name || !this.channel.level || !this.channel.message) {
            throw "Не определено имя канала, уровень или сообщение.";            
        }         

        switch (this.transport.name) {

            case "client": {
                this.displayMessage();
                break;
            }

            case "server": {
                this.sendMessage();
                break;
            }

            default: {
                throw "Такого транспорта не существует.";
            }
        }
    }    

    getDate() {
        const date = new Date();
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false
        };
        const time = date.toLocaleTimeString("ru", options);
        let localDate = date.toLocaleDateString("ru").split(".");

        [localDate[0], localDate[2]] = [localDate[2], localDate[0]];

        localDate = localDate.join("-");

        return `[${localDate} ${time}]`;
    }

    generateMessage(message) {        
        
        if(!Array.isArray(message)) {
            return `${this.getDate()} ${this.channel.name}.${this.levelName} %c<${message}>`;
        }        
        
        const messages = message.map((item, index) => {

            let string = `<${item}>`;

            if(index <= (this.transport.color?.length - 1)) {
                string = `%c<${item}>`;
            }
            return string;
        }).join(". "); 
        
        if(!this.transport.color ||
            !this.transport.color.length) {
            
            return `${this.getDate()} ${this.channel.name}.${this.levelName} %c${messages}`;
        }

        return `${this.getDate()} ${this.channel.name}.${this.levelName} ${messages}`;          
    }

    displayMessage() { 
        
        const colors = this.calcColors();  
        const colorStringArray = colors.map((color) => `color: ${color}`);              
       
        let newLevel = this.levelName;         

        switch(this.level) {            

            case level.warning:
                newLevel = "warn";
                break

            case level.notice:
            case level.debug:    
                newLevel = "info";
                break            
        }
        
        if(this.level !== level.info) { //вывод в группу только для уровня info
            console[newLevel](this.generateMessage(this.channel.message), ...colorStringArray);
            return; 
        }
        
        if(this.channel.message.length === 1) {
            console.group();
            console[newLevel](this.generateMessage(this.channel.message), colorStringArray[0]);
            console.groupEnd();
            return;
        }
        
        this.channel.message.forEach((message, i) => {
            
            const colorString = colorStringArray[i] ?? colorStringArray[colorStringArray.length - 1];            
            
            if(i === 0) {                   
                console.group();
                console[newLevel](this.generateMessage(message), colorString);
                return;
            }

            if(i === (this.channel.message.length - 1)) {                    
                console[newLevel](this.generateMessage(message), colorString);
                console.groupEnd();
                return;
            }

            console[newLevel](this.generateMessage(message), colorString);
        });        
    }

    calcColors() {        

        if(this.transport.color?.length) {
            return this.transport.color;
        }

        let colors = [];

        switch(this.level) {
            case level.error:
                colors.push("red");
                break

            case level.warning:
                colors.push("brown");
                break

            case level.notice:
                colors.push("green");
                break

            case level.info:
                colors.push("black");
                break

            case level.debug:
                colors.push("black");
                break

            default:
                colors.push("black");
                break
        } 

        return colors;
    }

    sendMessage() {

        const params = {
            date: this.getDate(),
            channel: this.channel.name,
            level: this.level,
            message: Array.isArray(this.channel.message) ? this.channel.message.join(". ") : this.channel.message,
        };        

        const body = {
            jsonrpc: "2.0",
            method: "logger",
            params: [params],
        };         

        try {
            fetch(url.transportServer, {
                body: JSON.stringify(body),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                method: "POST",                
            });

        } catch(error) {

            throw (error);
        }
    }
}