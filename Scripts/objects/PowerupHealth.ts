module objects {
 export class PowerupHealth extends objects.GameObject
 {
    constructor(assetManager: createjs.LoadQueue) {
            super(assetManager, "p_health");
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
            //console.log("powerup reset");
            this.alpha=0;
            this.x = -10000;
            this.y = -10000;
            this.isColliding = false;
        }
 }
}