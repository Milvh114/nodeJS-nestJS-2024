import { Injectable, OnModuleInit } from "@nestjs/common";
import { io, Socket } from "socket.io-client";

@Injectable()
export class SocketClient implements OnModuleInit{
    public socketClient: Socket

    constructor(){
        this.socketClient = io('http://localhost:3000'); // connect to socket server
    }

    onModuleInit() {//this will run when SocketClient class init
        this.registerClientEvents()
    }

    private registerClientEvents(){
        this.socketClient.emit('newMessage',{msg: 'new mess'})

        this.socketClient.on('connect', () => {
            console.log('Connected to Gateway')
        })

        this.socketClient.on('onMessage', (payload: any) => {
            console.log(payload)
        })
    }
}