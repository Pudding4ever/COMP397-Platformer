var objects;
(function (objects) {
    class FlyingEnemy extends objects.GameObject {
        constructor(assetManager) {
            super(assetManager, "flyingenemy");
            this.active = true;
            this.timer = 0;
            this.etype = 0;
            this.health = 7;
            this.invframes = false;
            this.invtimer = 0;
            this.firetimer = 0;
            this.fireRate = 50;
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
            this.health = 5;
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
        DistanceChecker(distance) {
            //only run AI routines when the player is close by
            if (this.myScene.player.x > this.x) {
                if (this.myScene.player.x - this.x <= distance) {
                    return true;
                }
                else
                    return false;
            }
            else {
                if (this.x - this.myScene.player.x <= distance) {
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
                if (this.DistanceChecker(800)) {
                    this.AIRoutine();
                }
            }
            if (this.health <= 0) {
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
                        if (this.firetimer >= this.fireRate && this.DistanceChecker(20)) {
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
            if (this.y > this.myScene.player.y - 120) {
                this.y = this.y - 0.2;
            }
            if (this.y < this.myScene.player.y - 120) {
                this.y = this.y + 0.2;
            }
            if (this.scaleX < 0 && this.myScene.player.x != this.x) {
                //console.log("move right");
                this.x = this.x + 1.5;
            }
            else if (this.scaleX > 0 && this.myScene.player.x != this.x) {
                //console.log("move left");
                this.x = this.x - 1.5;
            }
        }
        ShootBang() {
            console.log("shootbang");
            for (var b in this.myScene.enemybulletobjectpool) {
                // console.log ("checking bullet object pool ", + b);
                //console.log (this.myScene.bulletobjectpool[b].active);
                if (this.myScene.enemybulletobjectpool[b].active == false) {
                    console.log("activating ebullet!");
                    this.myScene.enemybulletobjectpool[b].bullettype = 5;
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
    objects.FlyingEnemy = FlyingEnemy;
})(objects || (objects = {}));
//# sourceMappingURL=flyingenemy.js.map