import * as Phaser from 'phaser';
import 'assets/tiles/dungeon_oc.json'

export default class Preloader extends Phaser.Scene {
    constructor() {
        super('preloader');
    }

    preload() {
        this.load.image('tiles', 'assets/tiles/dungeon_tiles_extruded.png')
        this.load.tilemapTiledJSON('dungeon_tiles', 'assets/tiles/dungeon-01.json')

        this.load.atlas('fauna', 'assets/characters/fauna.png', 'assets/characters/fauna.json')
    }

    create() {
        this.scene.start('game')
    }
}