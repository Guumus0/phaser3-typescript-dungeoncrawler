import * as Phaser from 'phaser'

import Game from './scenes/Game'
import Preloader from './scenes/Preloader'

import { io, Socket } from 'socket.io-client'

const socket: Socket = io("ws://localhost:7500", {
    withCredentials: true,
    extraHeaders: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, Content-Length, X-Requested-With",
    },
    path: '/node/',
    transports: ['websocket']
})

socket.emit('prueba_phaser', { message: 'Hola desde phaser' });

const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 500,
    height: 250,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: [Preloader, Game],
    scale: {
        zoom: 2
    }
});
