import * as Phaser from 'phaser';

import { debugDraw } from '../utils/debug'
import { createLizardAnims } from '../anims/EnemyAnims';
import { createCharacterAnims } from '../anims/CharacterAnims';

import LizardM from '../enemies/LizardM';

import '../Characters/Fauna'
import Fauna from '../Characters/Fauna';

export default class Game extends Phaser.Scene {
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private fauna!: Fauna

    constructor() {
        super('game');
    }

    preload() {
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    create() {
        createCharacterAnims(this.anims)
        createLizardAnims(this.anims)

        const map = this.make.tilemap({ key: 'dungeon_tiles' })

        const tileset = map.addTilesetImage('dungeon_tiles', 'tiles', 16, 16, 1, 2)

        map.createLayer('Ground', tileset, 0, 0);
        const wallsLayer = map.createLayer('Walls', tileset, 0, 0);
        const objectLayer = map.createLayer('Objects', tileset, 0, 0);
        wallsLayer.setCollisionByProperty({ collides: true })
        objectLayer.setCollisionByProperty({ collides: true })

        debugDraw(wallsLayer, this)
        debugDraw(objectLayer, this)

        this.fauna = this.add.fauna(128, 128, 'fauna')


        this.cameras.main.startFollow(this.fauna, true)

        const lizardsM = this.physics.add.group({
            classType: LizardM,
            createCallback: (go) => {
                const lizGo = go as LizardM
                lizGo.body.onCollide = true
            }
        })

        lizardsM.get(256, 128, 'lizard_m')

        // Character collider
        this.physics.add.collider(this.fauna, wallsLayer)
        this.physics.add.collider(this.fauna, objectLayer)

        // Enemies Collider
        this.physics.add.collider(lizardsM, wallsLayer)
        this.physics.add.collider(lizardsM, objectLayer)

        // PvE Collider
        this.physics.add.collider(lizardsM, this.fauna, this.handlePlayerLizardCollision, undefined, this)
    }

    private handlePlayerLizardCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) {
        const lizard = obj2 as LizardM

        const dx = this.fauna.x - lizard.x
        const dy = this.fauna.y - lizard.y

        const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200)

        this.fauna.setVelocity(dir.x, dir.y)

        this.fauna.handleDamage(dir)
    }

    update(t: number, dt: number) {

        if (this.fauna) {
            this.fauna.update(this.cursors)
        }
    }
}
