import Level from "./levels/level";

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#ffffff',
    parent: 'gameoflife',
    width: 800,
    height: 800,
    scene: [Level]
};

export default new Phaser.Game(config);