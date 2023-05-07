import * as Phaser from 'phaser'

import Game from './scenes/Game'
import Preloader from './scenes/Preloader'

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
