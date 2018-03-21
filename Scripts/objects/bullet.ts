module objects {
    export class Bullet extends objects.GameObject {

        constructor(assetManager: createjs.LoadQueue) {
            super(assetManager, "sonicHero");
            this.Start();
        }

        public Start(): void {
            let deltaMeasurer = new core.TimeDeltaMeasurer();
            deltaMeasurer.maxDelta = 40;
            deltaMeasurer.start();
        }

        public Update():void {
            this.x = this.x + 1;
        }

    }




    
}