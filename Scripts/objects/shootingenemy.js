var objects;
(function (objects) {
    class ShootingEnemy extends objects.GameObject {
        constructor(assetManager) {
            super(assetManager, "shootingenemy");
            this.active = true;
            this.timer = 0;
            this.etype = 0;
            this.health = 7;
            this.invframes = false;
            this.invtimer = 0;
            this.firetimer = 0;
            this.fireRate = 90;
            this.Start();
        }
        Start() {
            let deltaMeasurer = new core.TimeDeltaMeasurer();
            this._physics = new core.GamePhysics();
            this.Physics = this._physics;
            deltaMeasurer.maxDelta = 40;
            deltaMeasurer.start();
            this.active == true;
            this.x = 530;
            this.y = 460 - this.halfHeight;
            console.log(this.active);
            this.health = 3;
            //this.Physics.blankjump(this, 270 + 0.005);
        }
        DirectionChecker() {
            //face and shoot in direction of the player
            if (this.myScene.player.x > this.x) {
                this.scaleX = -1;
            }
            else {
                this.scaleX = 1;
            }
        }
        DistanceChecker() {
            //only run AI routines when the player is close by
            if (this.myScene.player.x > this.x) {
                if (this.myScene.player.x - this.x <= 500) {
                    return true;
                }
                else
                    return false;
            }
            else {
                if (this.x - this.myScene.player.x <= 500) {
                    return true;
                }
                else
                    return false;
            }
        }
        Update() {
            if (this.active == true) {
                if (this.isColliding == true) {
                    if (this.invframes != true) {
                        this.health--;
                        this.invframes = true;
                        this.invtimer = 0;
                        this.isColliding = false;
                    }
                }
                this.invtimer++;
                this.firetimer++;
                if (this.invtimer >= 5) {
                    this.invframes = false;
                }
                this.alpha = 1;
                //run any AI here
                if (this.DistanceChecker()) {
                    this.AIRoutine();
                }
            }
            if (this.health <= 0) {
                if(this.active == true)
                {
                 createjs.Sound.play("enemydead");
                }
                //console.log ("enemy deactivated!");
                this.active = false;
                this.isColliding = false;
                this.alpha = 0;
                this.x = -100000;
                this.y = -100000;
            }
        }
        AIRoutine() {
            this.DirectionChecker();
            switch (this.etype) {
                case 0:
                    {
                        //stand still and fire shots
                        if (this.firetimer >= this.fireRate) {
                            this.firetimer = 0;
                            this.ShootBang();
                            break;
                        }
                        else {
                            if (this.firetimer >= 25) {
                                this.MoveEnemy();
                            }
                        }
                        break;
                    }
                default:
                    break;
            }
        }
        MoveEnemy() {
            //this.Physics.stopJumping();
            //console.log (this.currentplatform);
            //console.log (this.currentplatform.blockAbove);
            //console.log (this.currentplatform.blockLeft);
            //console.log (this.currentplatform.blockRight);
            if (this.scaleX < 0 && this.currentplatform.blockRight == true) {
                //console.log("move right");
                this.x = this.x + 1;
            }
            else if (this.scaleX > 0 && this.currentplatform.blockLeft == true) {
                //console.log("move left");
                this.x = this.x - 1;
            }
        }
        ShootBang() {
            console.log("shootbang");
            createjs.Sound.play("enemyshot");
            for (var b in this.myScene.enemybulletobjectpool) {
                // console.log ("checking bullet object pool ", + b);
                //console.log (this.myScene.bulletobjectpool[b].active);
                if (this.myScene.enemybulletobjectpool[b].active == false) {
                    console.log("activating ebullet!");
                    this.myScene.enemybulletobjectpool[b].bullettype = 0;
                    this.myScene.enemybulletobjectpool[b].bulletDirection = this.scaleX;
                    this.myScene.enemybulletobjectpool[b].x = this.x;
                    this.myScene.enemybulletobjectpool[b].y = this.y;
                    this.myScene.enemybulletobjectpool[b].active = true;
                    //console.log (this.myScene.bulletobjectpool[b].active);
                    break;
                }
            }
        }
    }
    objects.ShootingEnemy = ShootingEnemy;
})(objects || (objects = {}));
//# sourceMappingURL=shootingenemy.js.map
