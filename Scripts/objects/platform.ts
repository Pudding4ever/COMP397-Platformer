module objects {
    export class Platform extends objects.GameObject {

        constructor(assetManager: createjs.LoadQueue) {
            super(assetManager, "platform");
            this.x = 230;
            this.y = 360;
        }

    }
}