var objects;
(function (objects) {
    class Hero extends objects.GameObject {
        constructor(assetManager, weightN) {
            super(assetManager, "player");
            this._forceN = 1;
            this.baseROF = 30;
            this.timer = 0;
            this.weapontype = 0;
            this.switchdelay = 15;
            this.switchtimer = 0;
            this.lives = 5;
            this.invframes = false;
            this.invtimer = 0;
            this.shield = false;
            this.rapidfire = false;
            this._physics = new core.GamePhysics();
            this._weightN = weightN;
            this._previousX = this.x;
            this._previousY = this.y;
            this.baseROF = 30;
            this.ROF = 30;
            this.Start();
        }
        Start() {
            //this.y = 480 - this.halfHeight;
            let deltaMeasurer = new core.TimeDeltaMeasurer();
            deltaMeasurer.maxDelta = 40;
            deltaMeasurer.start();
        }
        Update() {
            if (this.lives <= 0) {
                //eventually play some kind of death animation here
                objects.Game.currentScene = config.Scene.OVER;
            }
            this.setWeaponROF();
            this.Move();
            this._dx = this.x - this._previousX;
            this._dy = this.y - this._previousY;
            this._previousX = this.x;
            this._previousY = this.y;
            this.timer++;
            this.switchtimer++;
            //console.log (this.x, this.y);
            this.invtimer++;
            if (this.isColliding == true) {
                if (this.invtimer <= 20) {
                    //don't get hit, you're still in invincible frames
                    this.isColliding = false;
                }
                else {
                    //do get hit, lose life, flash the player (TODO add flash effect);
                    this.lives--;
                    this.isColliding = false;
                    this.invtimer = 0;
                }
            }
        }
        Move() {
            if (objects.Game.keyboardManager.moveLeft) {
                this.x -= 5;
                if (this.scaleX > 0) {
                    this.scaleX = -1;
                }
            }
            if (objects.Game.keyboardManager.moveRight) {
                //if (!this.isOnMiddle()) {
                this.x += 5;
                if (this.scaleX < 0) {
                    this.scaleX = 1;
                }
                // }
            }
            if (objects.Game.keyboardManager.moveForward) {
                // this.y += 5;
            }
            if (objects.Game.keyboardManager.moveBackward) {
                //this.y -= 5;
            }
            if (objects.Game.keyboardManager.jumpForward) {
                this._physics.jump(this, 270 + 0.005);
            }
            if (objects.Game.keyboardManager.Fire) {
                this.fireBullet();
            }
            if (objects.Game.keyboardManager.SwitchWeapon) {
                if (this.switchtimer > this.switchdelay) {
                    this.switchtimer = 0;
                    if (this.weapontype < 2) {
                        this.weapontype = this.weapontype + 1;
                    }
                    else if (this.weapontype >= 2) {
                        this.weapontype = 0;
                    }
                }
            }
        }
        setWeaponROF() {
            if (this.rapidfire == true) {
                this.baseROF = 15;
            }
            else {
                this.baseROF = 30;
            }
            switch (this.weapontype) {
                case this.weapontype = 0://pistol
                    {
                        this.ROF = this.baseROF;
                        break;
                    }
                case this.weapontype = 1://shotgun
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
        fireBullet() {
            // console.log ("fire key pressed!");
            // console.log (this.myScene.bulletobjectpool);
            var b;
            if (this.timer >= this.ROF) {
                this.timer = 0;
                switch (this.weapontype) {
                    case this.weapontype = 0://pistol
                        {
                            for (b in this.myScene.bulletobjectpool) {
                                // console.log ("checking bullet object pool ", + b);
                                //console.log (this.myScene.bulletobjectpool[b].active);
                                if (this.myScene.bulletobjectpool[b].active == false) {
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
                    case this.weapontype = 2://machine gun
                        {
                            for (b in this.myScene.bulletobjectpool) {
                                // console.log ("checking bullet object pool ", + b);
                                //console.log (this.myScene.bulletobjectpool[b].active);
                                if (this.myScene.bulletobjectpool[b].active == false) {
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
                    case this.weapontype = 1://shotgun
                        {
                            for (let i = 0; i < 5; i++) {
                                for (b in this.myScene.bulletobjectpool) {
                                    // console.log ("checking bullet object pool ", + b);
                                    //console.log (this.myScene.bulletobjectpool[b].active);
                                    if (this.myScene.bulletobjectpool[b].active == false) {
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
                            break;
                        }
                }
            }
        }
        jumpDown() {
            if (this._dx > 0) {
                this._physics.jump(this, 270 - 19, 5);
            }
            else {
                this._physics.jump(this, 270 + 30, 5);
            }
        }
        isOnGround() {
            return !(this._physics.checkX(this) && this._physics.checkY(this));
        }
        stopHero() {
            this._physics.stopJumping();
        }
        isFalling() {
            return this._dy > 0;
        }
        isMovingForward() {
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
        get movingDirection() {
            return this._movingDirection;
        }
        set movingDirection(value) {
            this._movingDirection = value;
        }
        get forceN() {
            return this._forceN;
        }
        set forceN(value) {
            this._forceN = value;
        }
        get dx() {
            return this._dx;
        }
        isOnMiddle() {
            return this.x > 640 / 2;
        }
        isOnLeftBorder() {
            return this.x <= this.halfWidth;
        }
    }
    objects.Hero = Hero;
})(objects || (objects = {}));
//# sourceMappingURL=hero.js.map