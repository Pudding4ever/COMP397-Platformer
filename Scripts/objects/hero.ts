module objects {
    export class Hero extends objects.GameObject {

//BUG: Player teleports to top of platform if player moves under platform before touching the ground.

        private _movingDirection :core.MovingDirections;
        private _physics :core.GamePhysics;
        private _forceN: number = 1;
        private _weightN: number;
        private _previousX: number;
        private _previousY: number;

        public myScene: objects.Scene;
        public ROF: number;
        public baseROF = 30;
        public timer: number = 0;
        public weapontype: number = 0;
        public switchdelay: number = 15;
        public switchtimer: number = 0;
        public lives: number = 5;

        public ammo1: number = 10;
        public ammo2: number = 50;
        public ammo3: number = 0;
        public grenades: number = 3;

        public invframes: boolean = false;
        public invtimer: number = 0;

        public shield: boolean = false;
        public rapidfire: boolean = false;

        constructor(assetManager: createjs.LoadQueue, weightN: number) {
            super(assetManager, "player");
            this._physics = new core.GamePhysics();
            this._weightN = weightN;
            this._previousX = this.x;
            this._previousY = this.y;
            this.baseROF = 30;
            this.ROF = 30;
            this.Start();
        }

        public Start(): void {
            //this.y = 480 - this.halfHeight;
            let deltaMeasurer = new core.TimeDeltaMeasurer();
            deltaMeasurer.maxDelta = 40;
            deltaMeasurer.start();
        }

        public Update():void {
            if (this.lives <= 0)
            {
                //eventually play some kind of death animation here
                objects.Game.currentScene = config.Scene.OVER;
            }

            this.setWeaponROF();
            this.Move();
            this._dx = this.x - this._previousX;
            this._dy = this.y - this._previousY;
            this._previousX = this.x;
            this._previousY = this.y;
            this.timer ++;
            this.switchtimer ++;
            //console.log (this.x, this.y);
            this.invtimer ++;
            if (this.isColliding == true)
            {
                if (this.invtimer <= 20)
                {
                    //don't get hit, you're still in invincible frames
                    this.isColliding = false;
                }
               else
               {
                   //do get hit, lose life, flash the player (TODO add flash effect);
                   this.lives --;
                   this.isColliding = false;
                   this.invtimer = 0;
               } 
            }

        }

        public Move():void {
            if(objects.Game.keyboardManager.moveLeft) {
                this.x -= 5;
                if(this.scaleX > 0)
                {
                    this.scaleX = -1;
                }
            }

            if(objects.Game.keyboardManager.moveRight) {
                //if (!this.isOnMiddle()) {
                    this.x += 5;
                    if(this.scaleX < 0)
                    {
                        this.scaleX = 1;
                    }
               // }
            }

            if(objects.Game.keyboardManager.moveForward)
            {
               // this.y += 5;
            }

            if(objects.Game.keyboardManager.moveBackward)
            {
                //this.y -= 5;
            }

            if (objects.Game.keyboardManager.jumpForward) {
                this._physics.jump(this, 270 + 0.005);
            }

            if (objects.Game.keyboardManager.Fire) {
                this.fireBullet();
            }

            if (objects.Game.keyboardManager.SwitchWeapon)
            {
                if(this.switchtimer > this.switchdelay)
                {
                this.switchtimer = 0;
                if(this.weapontype < 2)
                {
                    this.weapontype = this.weapontype + 1;
                }
                else if(this.weapontype >= 2)
                {
                    this.weapontype = 0;
                }
            }
        }
        }

        public setWeaponROF()
        {

            if (this.rapidfire == true)
            {
                this.baseROF = 15;
            }
            else
            {
                this.baseROF = 30;
            }

            switch(this.weapontype)
            {
                case this.weapontype = 0: //pistol
                {
                    this.ROF = this.baseROF;
                    break;
                }
                case this.weapontype = 1: //shotgun
                {
                    this.ROF = this.baseROF * 2;
                    break;
                }
                case this.weapontype = 2:
                {
                    this.ROF = this.baseROF / 3; 
                    break;
                }
            }
        }

        public fireBullet(): void {
           // console.log ("fire key pressed!");
           // console.log (this.myScene.bulletobjectpool);
            var b: any;
            if (this.timer >= this.ROF)
            {
            this.timer = 0;



                switch(this.weapontype)
                {
                    case this.weapontype = 0: //pistol
                    {
                        for (b in this.myScene.bulletobjectpool)
                        {
                           // console.log ("checking bullet object pool ", + b);
                            //console.log (this.myScene.bulletobjectpool[b].active);
                            if (this.myScene.bulletobjectpool[b].active == false)
                            {
                               // console.log ("activating bullet!");
                                this.myScene.bulletobjectpool[b].bullettype = 0;
                                this.myScene.bulletobjectpool[b].bulletDirection = this.scaleX;
                                this.myScene.bulletobjectpool[b].x = this.x;
                                this.myScene.bulletobjectpool[b].y = this.y;
                                this.myScene.bulletobjectpool[b].active = true;
                            //console.log (this.myScene.bulletobjectpool[b].active);
                            break;
                            }
                         }
                         break;
                    }

                    case this.weapontype = 2: //machine gun
                    {
                        if (this.ammo2 > 0)
                        {
                        for (b in this.myScene.bulletobjectpool)
                        {
                           // console.log ("checking bullet object pool ", + b);
                            //console.log (this.myScene.bulletobjectpool[b].active);
                            if (this.myScene.bulletobjectpool[b].active == false)
                            {
                               // console.log ("activating bullet!");
                                this.myScene.bulletobjectpool[b].bullettype = 0;
                                this.myScene.bulletobjectpool[b].bulletDirection = this.scaleX;
                                this.myScene.bulletobjectpool[b].x = this.x;
                                this.myScene.bulletobjectpool[b].y = this.y;
                                this.myScene.bulletobjectpool[b].active = true;
                            //console.log (this.myScene.bulletobjectpool[b].active);
                            break;
                            }
                         }
                         this.ammo2--;
                        break;
                        }
                        else{this.weapontype = 0;}
                        break;
                    }

                    case this.weapontype = 1: //shotgun
                    {
                        if (this.ammo1 > 0)
                        {
                        for (let i: number = 0; i < 5; i++)
                        {
                        for (b in this.myScene.bulletobjectpool)
                        {
                           // console.log ("checking bullet object pool ", + b);
                            //console.log (this.myScene.bulletobjectpool[b].active);
                            if (this.myScene.bulletobjectpool[b].active == false)
                            {
                               // console.log ("activating bullet!");
                               this.myScene.bulletobjectpool[b].bullettype = i;
                               this.myScene.bulletobjectpool[b].bulletDirection = this.scaleX;
                                this.myScene.bulletobjectpool[b].x = this.x;
                                this.myScene.bulletobjectpool[b].y = this.y;
                                this.myScene.bulletobjectpool[b].active = true;
                            //console.log (this.myScene.bulletobjectpool[b].active);
                            break;
                            }
                         }
                        }
                        this.ammo1--;
                        break;
                    }
                    else(this.weapontype = 2);
                    break;
                    }
        }
        }
    }

        public jumpDown():void {
            if(this._dx > 0) {
                this._physics.jump(this, 270 - 19, 5);
            } else {
                this._physics.jump(this, 270 + 30, 5);
            }
        }

        public isOnGround():boolean {
            return !(this._physics.checkX(this) && this._physics.checkY(this));
        }

        public stopHero():void {
            this._physics.stopJumping();
        }

        public isFalling():boolean {
            return this._dy > 0;
        }

        public isMovingForward(): boolean {
            return this._dx > 0;
    }

       /* public CheckBounds():void {
            // right boundary
            if(this.x >= 640 - this.halfWidth) {
                this.x = 640 - this.halfWidth;
            }

            // left boundary
            if(this.x <= this.halfWidth) {
                this.x = this.halfWidth;
            }
        }
*/
        public get movingDirection(): core.MovingDirections {
            return this._movingDirection;
        }

        public set movingDirection(value: core.MovingDirections) {
            this._movingDirection = value;
        }

        public get forceN(): number {
            return this._forceN;
        }

        public set forceN(value: number) {
            this._forceN = value;
        }

        public get dx(): number {
            return this._dx;
        }

        public isOnMiddle(): boolean {
            return this.x > 640 / 2;
        }

        public isOnLeftBorder(): boolean {
            return this.x <= this.halfWidth;
        }
    }




    
}