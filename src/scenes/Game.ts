import * as Phaser from 'phaser';
import { debugDraw } from '../utils/debug'

export default class Game extends Phaser.Scene {
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private faune!: Phaser.Physics.Arcade.Sprite

    constructor() {
        super('game');
    }

    preload() {
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    create() {
        const map = this.make.tilemap({ key: 'dungeon_tiles' })

        const tileset = map.addTilesetImage('dungeon_tiles', 'tiles', 16, 16, 1, 2)

        map.createLayer('Ground', tileset, 0, 0);
        const wallsLayer = map.createLayer('Walls', tileset, 0, 0);
        const objectLayer = map.createLayer('Objects', tileset, 0, 0);
        wallsLayer.setCollisionByProperty({ collides: true })
        objectLayer.setCollisionByProperty({ collides: true })

        // debugDraw(wallsLayer, this)
        // debugDraw(objectLayer, this)

        this.faune = this.physics.add.sprite(128, 128, 'fauna')
        this.faune.body.setSize(this.faune.width * 0.5, this.faune.height * 0.8)

        this.anims.create({
            key: 'fauna-idle-down',
            frames: [
                { key: 'fauna', frame: 'walk-down-3.png' },
            ]
        })

        this.anims.create({
            key: 'fauna-idle-up',
            frames: [
                { key: 'fauna', frame: 'walk-up-3.png' },
            ]
        })

        this.anims.create({
            key: 'fauna-idle-side',
            frames: [
                { key: 'fauna', frame: 'walk-side-3.png' },
            ]
        })

        this.anims.create({
            key: 'fauna-run-down',
            frames: this.anims.generateFrameNames('fauna', { start: 1, end: 8, prefix: 'run-down-', suffix: '.png' }),
            repeat: -1,
            frameRate: 15
        })

        this.anims.create({
            key: 'fauna-run-up',
            frames: this.anims.generateFrameNames('fauna', { start: 1, end: 8, prefix: 'run-up-', suffix: '.png' }),
            repeat: -1,
            frameRate: 15
        })

        this.anims.create({
            key: 'fauna-run-side',
            frames: this.anims.generateFrameNames('fauna', { start: 1, end: 8, prefix: 'run-side-', suffix: '.png' }),
            repeat: -1,
            frameRate: 15
        })

        this.faune.anims.play('fauna-idle-down')

        this.physics.add.collider(this.faune, wallsLayer)
        this.physics.add.collider(this.faune, objectLayer)
        
        this.cameras.main.startFollow(this.faune, true)
    }

    update(t: number, dt: number) {
        if (!this.cursors || !this.faune) {
            return
        }

        const speed = 100;

        if (this.cursors.left?.isDown) {
            this.faune.anims.play('fauna-run-side', true)
            this.faune.setVelocity(-speed, 0)
            this.faune.scaleX = -1
            this.faune.body.offset.x = 24
        }
        else if (this.cursors.right?.isDown) {
            this.faune.anims.play('fauna-run-side', true)
            this.faune.setVelocity(speed, 0)
            this.faune.scaleX = 1
            this.faune.body.offset.x = 8
        }
        else if (this.cursors.up?.isDown) {
            this.faune.anims.play('fauna-run-up', true)
            this.faune.setVelocity(0, -speed)
        }
        else if (this.cursors.down?.isDown) {
            this.faune.anims.play('fauna-run-down', true)
            this.faune.setVelocity(0, speed)
        }
        else {
            const parts = this.faune.anims.currentAnim.key.split('-')
            parts[1] = 'idle'
            this.faune.play(parts.join('-'))
            this.faune.setVelocity(0, 0)
        }
    }
}
