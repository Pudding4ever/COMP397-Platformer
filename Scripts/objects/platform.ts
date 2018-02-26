module objects {
    export class Platform extends objects.GameObject {
        constructor(assetManager: createjs.LoadQueue) {
            super(assetManager, "platform");
            this.x = 200;
            this.y = 200;
        }

    }
}