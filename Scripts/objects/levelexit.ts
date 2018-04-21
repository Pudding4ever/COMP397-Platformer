module objects {
 export class LevelExit extends objects.GameObject
 {
    constructor(assetManager: createjs.LoadQueue) {
            super(assetManager, "levelexit");
            this.Start();
        }

        public Start():void
        {
            this.alpha = 1;
        }

        public Update():void {
            if(this.isColliding == true)
            {
                this.Reset();
            }
        }

        public Reset()
        {

        }
 }
}