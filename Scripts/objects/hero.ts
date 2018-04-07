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
        public timer: number = 0;
        public weapontype: number = 0;
        public switchdelay: number = 15
        public switchtimer: number = 0
        public lives: number = 3;

        constructor(assetManager: createjs.LoadQueue, weightN: number) {
            super(assetManager, "sonicHero");
            this._physics = new core.GamePhysics();
            this._weightN = weightN;
            this._previousX = this.x;
            this._previousY = this.y;
            this.ROF = 30;
            this.Start();
        }

        public Start(): void {
            this.y = 480 - this.halfHeight;
            let deltaMeasurer = new core.TimeDeltaMeasurer();
            deltaMeasurer.maxDelta = 40;
            deltaMeasurer.start();
        }

        public Update():void {
            this.setWeaponROF();
            this.Move();
            this.CheckBounds();
            this._dx = this.x - this._previousX;
            this._dy = this.y - this._previousY;
            this._previousX = this.x;
            this._previousY = this.y;
            this.timer ++;
            this.switchtimer ++;
            //console.log (this.x, this.y);
        }

        public Move():void {
            if(objects.Game.keyboardManager.moveLeft) {
                this.x -= 5;
            }

            if(objects.Game.keyboardManager.moveRight) {
                //if (!this.isOnMiddle()) {
                    this.x += 5;
               // }
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
            switch(this.weapontype)
            {
                case this.weapontype = 0:
                {
                    this.ROF = 30;
                    break;
                }
                case this.weapontype = 1:
                {
                    this.ROF = 60;
                    break;
                }
                case this.weapontype = 2:
                {
                    this.ROF = 12;
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
                    case this.weapontype = 0:
                    {
                        for (b in this.myScene.bulletobjectpool)
                        {
                           // console.log ("checking bullet object pool ", + b);
                            //console.log (this.myScene.bulletobjectpool[b].active);
                            if (this.myScene.bulletobjectpool[b].active == false)
                            {
                               // console.log ("activating bullet!");
                                this.myScene.bulletobjectpool[b].bullettype = 0;
                                this.myScene.bulletobjectpool[b].x = this.x;
                                this.myScene.bulletobjectpool[b].y = this.y;
                                this.myScene.bulletobjectpool[b].active = true;
                            //console.log (this.myScene.bulletobjectpool[b].active);
                            break;
                            }
                         }
                         break;
                    }

                    case this.weapontype = 2:
                    {
                        for (b in this.myScene.bulletobjectpool)
                        {
                           // console.log ("checking bullet object pool ", + b);
                            //console.log (this.myScene.bulletobjectpool[b].active);
                            if (this.myScene.bulletobjectpool[b].active == false)
                            {
                               // console.log ("activating bullet!");
                                this.myScene.bulletobjectpool[b].bullettype = 0;
                                this.myScene.bulletobjectpool[b].x = this.x;
                                this.myScene.bulletobjectpool[b].y = this.y;
                                this.myScene.bulletobjectpool[b].active = true;
                            //console.log (this.myScene.bulletobjectpool[b].active);
                            break;
                            }
                         }
                        break;
                    }

                    case this.weapontype = 1:
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
                                this.myScene.bulletobjectpool[b].x = this.x;
                                this.myScene.bulletobjectpool[b].y = this.y;
                                this.myScene.bulletobjectpool[b].active = true;
                            //console.log (this.myScene.bulletobjectpool[b].active);
                            break;
                            }
                         }
                        }
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

        public CheckBounds():void {
            // right boundary
            if(this.x >= 640 - this.halfWidth) {
                this.x = 640 - this.halfWidth;
            }

            // left boundary
            if(this.x <= this.halfWidth) {
                this.x = this.halfWidth;
            }
        }

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