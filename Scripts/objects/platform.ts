module objects {
    export class Platform extends objects.GameObject {

        constructor(assetManager: createjs.LoadQueue) {
            super(assetManager, "platform");
            this.x = 230;
            this.y = 360;
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