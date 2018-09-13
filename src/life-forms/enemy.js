import {LifeForm} from "./life-form";
import {FLOOR_Y} from "../constants";

export class Enemy extends LifeForm {
    constructor(group, x, flipX) {
        super();

        // TODO: The below is all unique to the slime.


        let scene = group.scene;

        if (!scene.anims.anims.entries['slime-idle']) {
            scene.anims.create({
                key: 'slime-idle',
                frames: scene.anims.generateFrameNumbers('slime', {
                    start: 0,
                    end: 9
                }),
                frameRate: 10,
                repeat: -1
            });
        }

        let enemy = group.create(x, FLOOR_Y - 10, 'slime'); // TODO: fix magic number 10
        enemy.setScale(2); // TODO: fix magic scaling -- this is only needed for the slime
        if (flipX) {
            enemy.flipX = true;
        }
        enemy.anims.play('slime-idle', true, Math.floor(Math.random() * 10));
    }
}