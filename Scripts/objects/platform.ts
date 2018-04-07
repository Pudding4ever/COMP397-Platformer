module objects {
    export class Platform extends objects.GameObject {

        constructor(assetManager: createjs.LoadQueue, x:number, y:number) {
            super(assetManager, "platform");
            this.x = x;
            this.y = y;
        }

        public Move():void {
            if(objects.Game.keyboardManager.moveLeft) {
                this.x += 5;
            }
            if(objects.Game.keyboardManager.moveRight) {
                this.x -= 5;
            }
        }

    }
}