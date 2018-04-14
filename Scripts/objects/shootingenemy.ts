module objects {
    export class ShootingEnemy extends objects.GameObject {

public active: boolean = true;
public timer: number = 0;
public etype: number = 0;
public health: number = 7;
public invframes: boolean = false;
public invtimer: number = 0;
public firetimer: number = 0;
public fireRate: number = 60;

public myScene: objects.Scene;

public bullet: objects.eBullet;
    
        constructor(assetManager: createjs.LoadQueue) {
            super(assetManager, "shootingenemy");
            this.Start();
        }

        public Start(): void {
            let deltaMeasurer = new core.TimeDeltaMeasurer();
            deltaMeasurer.maxDelta = 40;
            deltaMeasurer.start();
            this.active == true;
            this.x = 530;
            this.y = 460 - this.halfHeight;
            console.log (this.active);
            this.health = 7;
        }

        public Update():void {
            if(this.active == true)
            {
                if (this.isCollidingBullet == true)
                {
                    if (this.invframes != true)
                    {
                        this.health --;
                        this.invframes = true;
                        this.invtimer = 0;
                    }
                }

                this.invtimer ++;
                this.firetimer ++;

                if (this.invtimer >= 10)
                {
                    this.invframes = false;

                }

                this.alpha = 1;
                //run any AI here
                this.AIRoutine();
            }
            if (this.health <= 0)
            {
                console.log ("enemy deactivated!");
               this.active = false;
               this.isColliding = false;
               this.alpha = 0;
            }
        }

public AIRoutine()
{
    switch(this.etype)
    {
        case 0:
        {
            //stand still and fire shots
            if (this.firetimer >= this.fireRate)
            {
                this.firetimer = 0;
                this.ShootBang();
                break;
            }
        }

        case 1:
        {
            //rush left firing shots
            break;
        }

        default:
        break;
    }
}

public ShootBang()
{
    console.log("shootbang");
    for (var b in this.myScene.enemybulletobjectpool)
    {
       // console.log ("checking bullet object pool ", + b);
        //console.log (this.myScene.bulletobjectpool[b].active);
        if (this.myScene.enemybulletobjectpool[b].active == false)
        {
           // console.log ("activating bullet!");
            this.myScene.enemybulletobjectpool[b].bullettype = 0;
            this.myScene.enemybulletobjectpool[b].x = this.x;
            this.myScene.enemybulletobjectpool[b].y = this.y;
            this.myScene.enemybulletobjectpool[b].active = true;
        //console.log (this.myScene.bulletobjectpool[b].active);
        break;
        }
}

        }
    }

}