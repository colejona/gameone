export class BattleScene extends Phaser.Scene {
    preload() {
        this.load.image('cokecan', 'assets/cokecan.png');
        this.load.image('floor', 'assets/platform.png');
        this.load.spritesheet('dude', 'assets/dude.png', {frameWidth: 32, frameHeight: 48});
    }

    create() {
        this.distanceText = this.add.text(16, 16, '', {
            fontSize: '20px',
            fill: '#fff'
        });
        updateDistance(this, 0);

        this.floor = this.physics.add.staticGroup();
        this.floor.create(200, 200, 'floor');

        this.endLeft = this.physics.add.staticGroup();
        this.endLeft.create(-200, 176, 'floor');

        this.endRight = this.physics.add.staticGroup();
        this.endRight.create(600, 176, 'floor');

        setUpPlayer(this);

        this.physics.add.collider(this.player, this.floor);
        this.physics.add.collider(this.player, this.endLeft, goLeft(this));
        this.physics.add.collider(this.player, this.endRight, goRight(this));

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        let cursors = this.cursors;
        let player = this.player;
        if (cursors.left.isDown) {
            player.setVelocityX(-160);
            player.anims.play('left', true);
        }
        else if (cursors.right.isDown) {
            player.setVelocityX(160);
            player.anims.play('right', true);
        }
        else {
            player.setVelocityX(0);
            player.anims.play('turn');
        }
    }
}

function setUpPlayer(scene) {
    scene.player = scene.physics.add.sprite(50, 160, 'dude');
    scene.player.setBounce(0.2);

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

function goLeft(scene) {
    return function () {
        if (scene.currentDistance === 0) {
            // TODO: go to town
        }
        else {
            updateDistance(scene, scene.currentDistance - 1);
            populateSceneFromRight(scene);
        }
    }
}

function goRight(scene) {
    return function () {
        updateDistance(scene, scene.currentDistance + 1);
        populateSceneFromLeft(scene);
    }
}

function populateSceneFromLeft(scene) {
    scene.player.setX(16);
}

function populateSceneFromRight(scene) {
    scene.player.setX(384);
}

function updateDistance(scene, distance) {
    scene.currentDistance = distance;
    scene.distanceText.setText('' + (scene.currentDistance / 10) + ' km');
}