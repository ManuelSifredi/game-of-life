import 'phaser';

export default class Cell extends Phaser.GameObjects.Sprite {

    private cellState: Boolean = false;

    constructor(scene: Phaser.Scene, x: number, y: number){
        super(scene, x, y, 'black');

        this.setInteractive().on('pointerup', () => this.ChangeStateOfCell() )
    }
    
    ChangeStateOfCell() {
        this.cellState = !this.cellState;
        this.cellState ? this.setTexture('white') : this.setTexture('black');
    }

    SetStateOfCell(state: Boolean){
        if(this.cellState != state)
            this.ChangeStateOfCell();
    }

    GetState(){
        return this.cellState;
    }

    Preload(scene: Phaser.Scene){
        scene.load.image('white', 'assets/white.png');
        scene.load.image('black', 'assets/black.png');
    }

}