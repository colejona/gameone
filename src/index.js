import 'phaser';

import { BattleScene } from './scenes/battle-scene';

const gameConfig = {
    width: 400,
    height: 680,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 300
            },
            debug: false
        }
    },
    scene: BattleScene
};

new Phaser.Game(gameConfig);