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
            this.fireRate = 60;
            this.Start();
        }
        Start() {
            let deltaMeasurer = new core.TimeDeltaMeasurer();
            deltaMeasurer.maxDelta = 40;
            deltaMeasurer.start();
            this.active == true;
            this.x = 530;
            this.y = 460 - this.halfHeight;
            console.log(this.active);
            this.health = 7;
        }
        Update() {
            if (this.active == true) {
                if (this.isCollidingBullet == true) {
                    if (this.invframes != true) {
                        this.health--;
                        this.invframes = true;
                        this.invtimer = 0;
                    }
                }
                this.invtimer++;
                this.firetimer++;
                if (this.invtimer >= 10) {
                    this.invframes = false;
                }
                this.alpha = 1;
                //run any AI here
                this.AIRoutine();
            }
            if (this.health <= 0) {
                console.log("enemy deactivated!");
                this.active = false;
                this.isColliding = false;
                this.alpha = 0;
            }
        }
        AIRoutine() {
            switch (this.etype) {
                case 0:
                    {
                        //stand still and fire shots
                        if (this.firetimer >= this.fireRate) {
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
        ShootBang() {
            console.log("shootbang");
            for (var b in this.myScene.enemybulletobjectpool) {
                // console.log ("checking bullet object pool ", + b);
                //console.log (this.myScene.bulletobjectpool[b].active);
                if (this.myScene.enemybulletobjectpool[b].active == false) {
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
    objects.ShootingEnemy = ShootingEnemy;
})(objects || (objects = {}));
//# sourceMappingURL=shootingenemy.js.map