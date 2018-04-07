module objects {
    export class Platform extends objects.GameObject {

        constructor(assetManager: createjs.LoadQueue, x:number, y:number) {
            super(assetManager, "platform");
            this.x = x;
            this.y = y;
        }

    }
}