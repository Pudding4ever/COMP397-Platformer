module objects {
    export class BossEnemy extends objects.GameObject {

private _physics :core.GamePhysics;
public active: boolean = true;
public timer: number = 0;
public etype: number = 0;
public health: number = 50;
public invframes: boolean = false;
public invtimer: number = 0;
public firetimer: number = 0;
public fireRate: number = 50;

public myScene: objects.Scene;

public regpoint: objects.Platform;

public bullet: objects.eBullet;
    
        constructor(assetManager: createjs.LoadQueue) {
            super(assetManager, "boss");
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
            this.health = 5;
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

        public DistanceChecker(distance:number): boolean
        {
            //only run AI routines when the player is close by
            if(this.myScene.player.x > this.x)
            {
                if(this.myScene.player.x - this.x <= distance)
                {
                    return true;
                }
                else return false;
            }
            else
            {
                if(this.x - this.myScene.player.x <= distance)
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
                if (this.DistanceChecker(800))
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
               this.myScene.BOSSDEAD == true;
            }
        }

        public AIRoutine()
        {
            this.DirectionChecker();
            switch(this.etype)
            {
                case 0:
                {
                    //hover over player and spawn jumpers
                    if (this.firetimer >= this.fireRate && this.DistanceChecker(20))
                    {
                        this.firetimer = 0;
                        this.JumpyBois();
                        this.etype = 1;
                        break;
                    }
                    else
                    { 
                        this.MoveEnemy();
                    }
                    break;
                }
                case 1:
                //shoot spread shot and move left/right
                {
                    if (this.firetimer >= this.fireRate)
                    {
                        this.firetimer = 0;
                        this.ShootBang();
                        break;
                    }
                    else
                    {
                        this.MoveEnemy();
                    }
                    break;
                }
                case 2:
                //shoot spread shot and move right->left
                {
                    if (this.firetimer >= this.fireRate)
                    {
                        this.firetimer = 0;
                        this.ShootBang();
                        break;
                    }
                    else
                    {
                        this.MoveEnemy();
                    }
                    break;
                }
        
                default:
                break;
            }
        }
        
        public MoveEnemy()
        {
            switch(this.etype)
            {
                case 0:
                {
                //hover over player
                if (this.y > this.myScene.player.y - 120)
                {
                 this.y = this.y - 1;
                }
        
                if (this.y < this.myScene.player.y - 120)
                {
                this.y = this.y + 1;
                }

                if(this.scaleX < 0 && this.myScene.player.x != this.x)
                {
                    ////console.log("move right");
                    this.x = this.x + 1.5;
                }
                else if (this.scaleX > 0 &&  this.myScene.player.x != this.x)
                {
                    ////console.log("move left");
                    this.x = this.x - 1.5;
                }
                break;
                }
                case 1:
                {
                    //move left to right
                    if(this.x > this.myScene.regpoints[0].x)
                    {
                        this.x = this.x + 2;
                    }
                    if(this.y != this.myScene.regpoints[0].y)
                    {
                        this.y = this.y + 1;
                    }
                    if(this.x <= this.myScene.regpoints[0].x)
                    {
                        this.etype = 2;
                    }
                    break;
                }
                case 2:
                {
                    //move right to left
                    if(this.x < this.myScene.regpoints[1].x)
                    {
                        this.x = this.x + 2;
                    }
                    if(this.y != this.myScene.regpoints[1].y)
                    {
                        this.y = this.y + 1;
                    }
                    if(this.x >= this.myScene.regpoints[1].x)
                    {
                        this.etype = 0;
                    }
                    break;
                }
                default:
                {
                  break;
                }
            }
        }


    public JumpyBois() 
    {
        for (var i = 0; i <= 3; i++)
        {
            //spawn a jumper
            let newenemy = new objects.JumpingEnemy(this.myScene.assetManager);
            newenemy.x = this.x + 1;
                newenemy.y = this.y + 10;
                newenemy.myScene = this.myScene;
                this.myScene.addChild(newenemy);
                this.myScene.stageActors.push(newenemy);
        }
    }
 public ShootBang()
{
    //console.log("shootbang");
    createjs.Sound.play("flyingenemyshot");
    for (let i: number = 0; i < 3; i++)
    {
        var b: any;
    for (b in this.myScene.enemybulletobjectpool)
    {
       // //console.log ("checking bullet object pool ", + b);
        ////console.log (this.myScene.bulletobjectpool[b].active);
        if (this.myScene.enemybulletobjectpool[b].active == false)
        {
           // //console.log ("activating bullet!");
           this.myScene.enemybulletobjectpool[b].bullettype = i;
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
}
