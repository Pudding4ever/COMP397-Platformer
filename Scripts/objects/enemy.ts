module objects {
    export class Enemy extends objects.GameObject {

public active: boolean = true;
public timer: number = 0;
    
        constructor(assetManager: createjs.LoadQueue) {
            super(assetManager, "badguy");
            this.Start();
        }

        public Start(): void {
            let deltaMeasurer = new core.TimeDeltaMeasurer();
            deltaMeasurer.maxDelta = 40;
            deltaMeasurer.start();
            this.active == true;
            this.x = 530;
            this.y = 460;
            console.log (this.active);
        }

        public Update():void {
            if(this.active == true)
            {
                this.alpha = 1;
                //run any AI here
            }
            if (this.isColliding == true)
            {
                console.log ("enemy deactivated!");
               this.active = false;
               this.isColliding = false;
               this.alpha = 0;
            }
            }
        }

    }