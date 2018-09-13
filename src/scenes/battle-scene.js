import {GAME_WIDTH, FLOOR_HEIGHT, FLOOR_Y, FLOOR_WIDTH, ENEMIES_PER_SCREEN} from '../constants';
import {Player} from "../life-forms/player";

export class BattleScene extends Phaser.Scene {
    preload() {
        this.load.image('cokecan', 'assets/cokecan.png');
        this.load.image('floor', 'assets/platform.png');
        this.load.spritesheet('dude', 'assets/dude.png', {frameWidth: 32, frameHeight: 48});
        this.load.spritesheet('slime', 'assets/green-slime-blink-spritesheet.png', {frameWidth: 12, frameHeight: 10});
    }

    create() {
        this.distanceText = this.add.text(16, 16, '', {
            fontSize: '20px',
            fill: '#fff'
        });
        updateDistance(this, 0);

        this.floor = this.physics.add.staticGroup();
        this.floor.create(0.5 * FLOOR_WIDTH, FLOOR_Y + 0.5 * FLOOR_HEIGHT, 'floor');

        this.endLeft = this.physics.add.staticGroup();
        this.endLeft.create(-1 * 0.5 * FLOOR_WIDTH, FLOOR_Y - 0.5 * FLOOR_HEIGHT, 'floor');

        this.endRight = this.physics.add.staticGroup();
        this.endRight.create(GAME_WIDTH + 0.5 * FLOOR_WIDTH, FLOOR_Y - 0.5 * FLOOR_HEIGHT, 'floor');

        this.player = new Player(this);

        // TODO: clean up
        this.anims.create({
            key: 'slime-idle',
            frames: this.anims.generateFrameNumbers('slime', {
                start: 0,
                end: 9
            }),
            frameRate: 10,
            repeat: -1
        });

        this.enemies = this.physics.add.group();

        this.physics.add.collider(this.player.sprite, this.floor);
        this.physics.add.collider(this.enemies, this.floor);
        this.physics.add.collider(this.player.sprite, this.endLeft, goLeftAScreen(this));
        this.physics.add.collider(this.player.sprite, this.endRight, goRightAScreen(this));

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.player.sprite.body.touching.down && this.cursors.left.isDown || (this.input.activePointer.isDown && this.input.activePointer.downX < GAME_WIDTH / 2)) {
            this.player.moveLeft();
        } else if (this.player.sprite.body.touching.down && this.cursors.right.isDown || (this.input.activePointer.isDown && this.input.activePointer.downX >= GAME_WIDTH / 2)) {
            this.player.moveRight();
        } else {
            this.player.stop();
        }
    }
}

function goLeftAScreen(scene) {
    return function () {
        if (scene.currentDistance === 0) {
            // TODO: go to town
        }
        else {
            updateDistance(scene, scene.currentDistance - 1);
            clearEnemies(scene);
            scene.player.sprite.setX(384); // TODO: magic number 16
            if (scene.currentDistance > 0) {
                populateSceneFromRight(scene);
            }
        }
    }
}

function goRightAScreen(scene) {
    return function () {
        updateDistance(scene, scene.currentDistance + 1);
        clearEnemies(scene);
        scene.player.sprite.setX(16); // TODO: magic number 16
        populateSceneFromLeft(scene);
    }
}

function populateSceneFromLeft(scene) {
    for (let i = 0; i < ENEMIES_PER_SCREEN; i++) {
        setUpEnemy(scene, GAME_WIDTH * (i + 2) / (ENEMIES_PER_SCREEN + 2), false);
    }
}

function populateSceneFromRight(scene) {
    for (let i = 0; i < ENEMIES_PER_SCREEN; i++) {
        setUpEnemy(scene, GAME_WIDTH - GAME_WIDTH * (i + 2) / (ENEMIES_PER_SCREEN + 2), true);
    }
}

function clearEnemies(scene) {
    scene.enemies.clear(true, true);
}

function setUpEnemy(scene, x, flipX) {
    let enemy = scene.enemies.create(x, FLOOR_Y - 10, 'slime'); // TODO: fix magic number 10
    enemy.setScale(2); // TODO: fix magic scaling -- this is only needed for the slime
    if (flipX) {
        enemy.flipX = true;
    }
    enemy.anims.play('slime-idle', true, Math.floor(Math.random() * 10));
}

function updateDistance(scene, distance) {
    scene.currentDistance = distance;
    scene.distanceText.setText('' + (scene.currentDistance / 10) + ' km');
}