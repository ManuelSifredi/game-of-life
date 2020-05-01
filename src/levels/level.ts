import 'phaser';
import Cell from '../entities/cell';

export default class Level extends Phaser.Scene {
    constructor() {
        super('level');
    }

    preload() {
        Cell.prototype.Preload(this);
    }

    gridSize = 200;
    gameArray: Cell[][] = [];
    timerGame: any;
    cursors: any

    buttonPause = (<HTMLElement>document.querySelector(".gameLabel"));
    labelPause = this.buttonPause.children[0];
    create() {

        this.setupCells();
        this.setupTimer();

        this.cursors = this.input.keyboard.addKeys({
            action: Phaser.Input.Keyboard.KeyCodes.ENTER
        });
        
        this.buttonPause.addEventListener('click', () => {
            this.changeGameState();
        });

    }

    setupCells(){
        const offset = 2;
        const containeroffset: number[] = [2, 2];
        const spriteSizeCenter: number = 2;
        for (var i: number = 0; i < this.gridSize; i++) {
            this.gameArray[i] = [];
            for (var j: number = 0; j < this.gridSize; j++) {
                this.gameArray[i][j] = new Cell(this, containeroffset[0] + (i * spriteSizeCenter) + (i * offset), containeroffset[1] + (j * spriteSizeCenter) + (j * offset));
                this.add.existing(this.gameArray[i][j]);
            }
        }
    }

    setupTimer(){
        this.timerGame = this.time.addEvent({
            delay: 10,
            callback: this.updateCells,
            callbackScope: this,
            loop: true
        });
        this.timerGame.paused = true;
    }


    canPress = true;
    update() {
        if (this.cursors.action.isDown && this.canPress == true) {
            this.changeGameState();
            this.canPress = false;
        }
        if (this.cursors.action.isUp && this.canPress == false) {
            this.canPress = true;
        }
    }

    changeGameState(){
        this.timerGame.paused = !this.timerGame.paused;
        this.changeHtml(this.timerGame.paused);
    }

    changeHtml(isPaused: boolean){
        if(isPaused){
            this.labelPause.innerHTML = "Play!";
            this.labelPause.classList.add("is-success");
            this.labelPause.classList.remove("is-error");
        }
        else{
            this.labelPause.innerHTML = "Pause";
            this.labelPause.classList.add("is-error");
            this.labelPause.classList.remove("is-success");
        }
    }

    updateCells(){
        let stateArray: boolean[][] = [];

        for (let i = 0; i < this.gridSize; i++) {
            stateArray[i] = [];
            for (let j = 0; j < this.gridSize; j++) {
                stateArray[i][j] = false;
                stateArray[i][j] = this.calculateCellLife(this.gameArray[i][j], i, j);
            }
        }

        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                this.gameArray[i][j].SetStateOfCell(stateArray[i][j]);
            }
        }
    }

    calculateCellLife(cell: Cell, x: number, y: number){
        const amountLifeNeighbors = this.calculateNeighbors(x, y);        
        if((cell.GetState() && (amountLifeNeighbors == 2 || amountLifeNeighbors == 3)) || (!cell.GetState() && amountLifeNeighbors == 3))
            return true;
        return false;
    }

    calculateNeighbors(x: number, y: number){
        let amountLife = 0;

        let xboundaryleft = x - 1;
        if(x == 0){
            xboundaryleft = this.gridSize - 1;
        }

        let xboundaryright = x + 1;
        if(x == this.gridSize - 1){
            xboundaryright = 0;
        }

        let yboundaryup = y - 1;
        if(y == 0){
            yboundaryup = this.gridSize - 1;
        }

        let yboundarydown = y + 1;
        if(y == this.gridSize - 1){
            yboundarydown = 0;
        }

        if(this.gameArray[xboundaryleft][yboundaryup].GetState())
            amountLife++;
        if(this.gameArray[x][yboundaryup].GetState())
            amountLife++;
        if(this.gameArray[xboundaryright][yboundaryup].GetState())
            amountLife++;
        if(this.gameArray[xboundaryleft][y].GetState())
            amountLife++;
        if(this.gameArray[xboundaryright][y].GetState())
            amountLife++;
        if(this.gameArray[xboundaryleft][yboundarydown].GetState())
            amountLife++;
        if(this.gameArray[x][yboundarydown].GetState())
            amountLife++;
        if(this.gameArray[xboundaryright][yboundarydown].GetState())
            amountLife++;
        
        return amountLife;
    }
}
