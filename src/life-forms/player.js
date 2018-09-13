import {LifeForm} from "./life-form";

export class Player extends LifeForm {
    constructor(scene) {
        super(scene);
        this.sprite = scene.physics.add.sprite(50, 160, 'dude');
        this.sprite.setBounce(0.2);

        scene.anims.create({
            key: 'left',
            frames: scene.anims.generateFrameNumbers('dude', {
                start: 0,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'turn',
            frames: [
                {
                    key: 'dude',
                    frame: 4
                }
            ],
            frameRate: 20
        });

        scene.anims.create({
            key: 'right',
            frames: scene.anims.generateFrameNumbers('dude', {
                start: 5,
                end: 8
            }),
            frameRate: 10,
            repeat: -1
        });
    }

    moveLeft() {
        this.sprite.setVelocityX(-160);
        this.sprite.anims.play('left', true);
    }

    moveRight() {
        this.sprite.setVelocityX(160);
        this.sprite.anims.play('right', true);
    }

    stop() {
        this.sprite.setVelocityX(0);
        this.sprite.anims.play('turn');
    }
}