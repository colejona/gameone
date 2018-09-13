import 'phaser';
import {GAME_WIDTH, GAME_HEIGHT} from './constants';

import {BattleScene} from './scenes/battle-scene';

const gameConfig = {
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
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