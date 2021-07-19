import {level} from "../constants/index.js"

export const channels = [
    {
        name: "serverChannel",
        level: level.warning,
        message: "hello world!",
        transports: [
            {
                name: "server",
                color: ["green"],
                level: level.debug            
            },
        ]
    },{
        name: "Сервис отправки форм",
        level: level.info,
        message: "There are some information about this service.",
        transports: [
            {
                name: "client",
                color: ["green"],
                level: level.error,
            },
        ]
    },{
        name: "Some channel",
        level: level.error,
        message: ["505", "An error", "1.0"],
        transports: [
            {
                name: "client",
                color: ["green", "purple"],                        
                level: level.debug,
            },
        ]
    },{
        name: "Another server channel",
        level: level.notice,
        message: "The world is mine",
        transports: [
            {
                name: "server",
            },
        ]
    },{
        name: "Some channel with GROUP",
        level: level.info,
        message: ["Поехали", "Хьюстон, у нас проблемы", "Приехали"],
        transports: [
            {
                name: "client",
                color: ["green", "red", "orange"],
                level: level.info,
            },
        ]
    },{
        name: "Some channel with GROUP",
        level: level.info,
        message: ["Поехали", "Хьюстон, у нас проблемы", "Приехали"],
        transports: [
            {
                name: "server",
                color: ["orange"],
                level: level.info,
            },
        ]
    },{
        name: "Some channel with GROUP",
        level: level.info,
        message: ["Погнали"],
        transports: [
            {
                name: "client",
                color: ["violet"],
                level: level.info,
            },
        ]
    }
]