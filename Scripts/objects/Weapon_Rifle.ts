module objects {
 export class WeaponRifle extends objects.GameObject
 {
    constructor(assetManager: createjs.LoadQueue) {
            super(assetManager, "w_rifle");
            this.Start();
        }

        public Start():void
        {
            this.alpha = 1;
        }

        public Update():void {
            if(this.isColliding)
            {
                this.Reset();
            }
        }

        public Reset()
        {
            this.alpha=0;
            this.x = -10000;
            this.y = -10000;
            this.isColliding = false;
        }
 }
}