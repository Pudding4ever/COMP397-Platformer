module objects {
    export class ShootingEnemy extends objects.GameObject {

private _physics :core.GamePhysics;
public active: boolean = true;
public timer: number = 0;
public etype: number = 0;
public health: number = 7;
public invframes: boolean = false;
public invtimer: number = 0;
public firetimer: number = 0;
public fireRate: number = 120;

public myScene: objects.Scene;

public bullet: objects.eBullet;
    
        constructor(assetManager: createjs.LoadQueue) {
            super(assetManager, "shootingenemy");
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
            this.health = 3;
            //this.Physics.blankjump(this, 270 + 0.005);
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
                this.ShootBang();
                break;
            }
            else
            {
                if (this.firetimer >= 25) //stand still for a second after firing
                {
                this.MoveEnemy();
                }
            }
            break;
        }

        default:
        break;
    }
}

public MoveEnemy()
{
//this.Physics.stopJumping();
////console.log (this.currentplatform);
////console.log (this.currentplatform.blockAbove);
////console.log (this.currentplatform.blockLeft);
////console.log (this.currentplatform.blockRight);
if(this.scaleX < 0 && this.currentplatform.blockRight == true)
{
    ////console.log("move right");
    this.x = this.x + 1
}
else if (this.scaleX > 0 && this.currentplatform.blockLeft == true)
{
    ////console.log("move left");
    this.x = this.x - 1
}
}

public ShootBang()
{
    createjs.Sound.play("enemyshot");
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

        }
    }

}