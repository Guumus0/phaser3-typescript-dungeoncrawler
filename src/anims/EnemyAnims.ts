import * as Phaser from 'phaser'
const createLizardAnims = (anims: Phaser.Animations.AnimationManager) => {
    anims.create({
        key: 'lizard-idle',
        frames: anims.generateFrameNames('lizard_m', { start: 0, end: 3, prefix: 'lizard_m_idle_anim_f', suffix: '' }),
        repeat: -1,
        frameRate: 10
    })

    anims.create({
        key: 'lizard-run',
        frames: anims.generateFrameNames('lizard_m', { start: 0, end: 3, prefix: 'lizard_m_run_anim_f', suffix: '' }),
        repeat: -1,
        frameRate: 10
    })
}

export {
    createLizardAnims
}