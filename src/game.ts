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

// scale: {
//     mode: Phaser.Scale.FIT,
//     parent: 'gameoflife',
//     autoCenter: Phaser.Scale.CENTER_BOTH,
//     width: 800,
//     height: 800
// },