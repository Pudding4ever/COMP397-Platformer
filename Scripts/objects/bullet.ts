module objects {
    export class Bullet extends objects.GameObject {

public active: boolean = false;
public timer: number = 0;
    
        constructor(assetManager: createjs.LoadQueue) {
            super(assetManager, "bullet");
            this.Start();
        }

        public Start(): void {
            let deltaMeasurer = new core.TimeDeltaMeasurer();
            deltaMeasurer.maxDelta = 40;
            deltaMeasurer.start();
            this.active == false;
            console.log (this.active);
        }

        public Update():void {
            if(this.active == true)
            {
                console.log ("bullet active and travelling");
            this.alpha = 1;
            this.x = this.x + 3;
            this.timer++;
            if (this.timer > 240)
            {
                console.log ("bullet deactivated!");
               this.active = false;
               this.timer = 0;
               this.alpha = 0;
            }
            }
        }

    }




    
}