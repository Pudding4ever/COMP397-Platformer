module objects {
    export class JumpingEnemy extends objects.GameObject {

private _physics :core.GamePhysics;
public active: boolean = true;
public timer: number = 0;
public etype: number = 0;
public health: number = 7;
public invframes: boolean = false;
public invtimer: number = 0;
public firetimer: number = 0;
public fireRate: number = 50;

public myScene: objects.Scene;

public bullet: objects.eBullet;
    
        constructor(assetManager: createjs.LoadQueue) {
            super(assetManager, "jumpingenemy");
            this.Start();
        }

        public Start(): void {
            let deltaMeasurer = new core.TimeDeltaMeasurer();
            this._physics = new core.GamePhysics();
            this.Physics = this._physics;
            deltaMeasurer.maxDelta = 40;
            deltaMeasurer.start();
            this.active == true;
            this.x = 530;
            this.y = 460 - this.halfHeight;
            //console.log (this.active);
            this.health = 1;
        }

        public DirectionChecker()
        {
            //face and shoot in direction of the player
            if(this.myScene.player.x > this.x)
            {
               this.scaleX = -1; 
            }
            else
            {
                this.scaleX = 1;
            }
        }

        public DistanceChecker(): boolean
        {
            //only run AI routines when the player is close by
            if(this.myScene.player.x > this.x)
            {
                if(this.myScene.player.x - this.x <= 500)
                {
                    return true;
                }
                else return false;
            }
            else
            {
                if(this.x - this.myScene.player.x <= 500)
                {
                    return true;  
                }
                else return false;
            }
        }

        public Update():void {
            if(this.active == true)
            {
                if (this.isColliding == true)
                {
                    if (this.invframes != true)
                    {
                        this.health --;
                        this.invframes = true;
                        this.invtimer = 0;
                        this.isColliding = false;
                    }
                }

                this.invtimer ++;
                this.firetimer ++;

                if (this.invtimer >= 5)
                {
                    this.invframes = false;

                }

                this.alpha = 1;
                //run any AI here
                if (this.DistanceChecker())
                {
                    this.AIRoutine();
                }

            }
            if (this.health <= 0)
            {
                if (this.active == true)
                {
                  createjs.Sound.play("enemydead");
                }
               ////console.log ("enemy deactivated!");
               this.active = false;
               this.isColliding = false;
               this.alpha = 0;
               this.x = -100000;
               this.y = -100000;
            }
        }

public AIRoutine()
{
    this.DirectionChecker();
    switch(this.etype)
    {
        case 0:
        {
            //stand still and fire shots
            if (this.firetimer >= this.fireRate)
            {
                this.firetimer = 0;
                this.JumpAttack();
                break;
            }
        }

        case 1:
        {
            //rush toward player firing shots
            break;
        }

        default:
        break;
    }
}

public JumpAttack()
{
    if(this.scaleX < 0)
    {
    this._physics.enemyjump(this, 270 + 0.005);
    }
    else {this._physics.enemyjump(this, 270 - 0.005 - 90);}
}


}

}

/* public ShootBang()
{
    //console.log("shootbang");
    for (var b in this.myScene.enemybulletobjectpool)
    {
       // //console.log ("checking bullet object pool ", + b);
        ////console.log (this.myScene.bulletobjectpool[b].active);
        if (this.myScene.enemybulletobjectpool[b].active == false)
        {
           //console.log ("activating ebullet!");
            this.myScene.enemybulletobjectpool[b].bullettype = 0;
            this.myScene.enemybulletobjectpool[b].bulletDirection = this.scaleX;
            this.myScene.enemybulletobjectpool[b].x = this.x;
            this.myScene.enemybulletobjectpool[b].y = this.y;
            this.myScene.enemybulletobjectpool[b].active = true;
        ////console.log (this.myScene.bulletobjectpool[b].active);
        break;
        }
}

        } */
